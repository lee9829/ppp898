/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogExplorer from "../blog-explorer";
import {
  BottomContact,
  Breadcrumb,
  FaqBlock,
  MobileBottomCta,
  PriceTable,
  SeoLongform,
  SiteFooter,
  SiteHeader,
  VenueCard,
} from "../site-components";
import {
  buildBlogArticleSeoChapters,
  buildBlogIndexSeoChapters,
  buildCategorySeoChapters,
  buildVenueSeoChapters,
  countSeoWords,
} from "../seo-content";
import { siteUrl } from "../site-config";
import {
  blogPosts,
  categories,
  hostessImagePool,
  imageSet,
  legalPages,
  venueDirectory,
  type BlogPost,
  type Category,
  type FaqItem,
  type LegalPage as LegalPageData,
  type Venue,
} from "../site-data";

type PageParams = { slug: string[] };

function normalizeSegment(segment: string) {
  try {
    return decodeURIComponent(segment).normalize("NFC");
  } catch {
    return segment.normalize("NFC");
  }
}

function resolvePage(rawSlug: string[]) {
  const slug = rawSlug.map(normalizeSegment);
  const [first, second] = slug;
  const category = categories.find((item) => item.slug === first);
  const venue = category?.venues.find((item) => item.slug === second);
  const post = first === "블로그" ? blogPosts.find((item) => item.slug === second) : undefined;
  const legal = legalPages[first];
  return { slug, first, category, venue, post, legal };
}

export function generateStaticParams(): PageParams[] {
  return [
    ...categories.map((category) => ({ slug: [category.slug] })),
    ...categories.flatMap((category) =>
      category.venues.map((venue) => ({ slug: [category.slug, venue.slug] })),
    ),
    { slug: ["블로그"] },
    ...blogPosts.map((post) => ({ slug: ["블로그", post.slug] })),
    ...Object.keys(legalPages).map((pageKey) => ({ slug: [pageKey] })),
  ];
}

function faqSchema(faqs: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export async function generateMetadata({ params }: { params: Promise<PageParams> }): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const { slug, first, category, venue, post, legal } = resolvePage(rawSlug);

  if (slug.length === 2 && venue && category) {
    const title = `강남 ${venue.name} ${category.shortName} | 예약·비용 확인`;
    return {
      title,
      description: venue.metaDescription,
      keywords: [`강남 ${venue.name}`, `${venue.name} ${category.shortName}`, `${venue.name} 예약`, `${venue.name} 비용`],
      alternates: { canonical: `/${category.slug}/${venue.slug}` },
      openGraph: { title, description: venue.metaDescription, url: `/${category.slug}/${venue.slug}`, images: [venue.image] },
    };
  }
  if (slug.length === 1 && category) {
    const title = `${category.name} 뜻·가격·예약 가이드`;
    return {
      title,
      description: category.longDescription,
      keywords: [category.name, `${category.shortName} 뜻`, `${category.shortName} 가격`, `${category.shortName} 예약`],
      alternates: { canonical: `/${category.slug}` },
      openGraph: { title, description: category.longDescription, url: `/${category.slug}`, images: [category.image] },
    };
  }
  if (slug.length === 2 && post) {
    return {
      title: post.title,
      description: post.excerpt,
      keywords: [post.title, post.category, "강남 밤문화", "강남 룸 예약"],
      authors: [{ name: "강남의 밤 편집팀" }],
      category: post.category,
      alternates: { canonical: `/블로그/${post.slug}` },
      openGraph: { type: "article", title: post.title, description: post.excerpt, url: `/블로그/${post.slug}`, images: [post.image], publishedTime: post.isoDate },
    };
  }
  if (slug.length === 1 && first === "블로그") {
    const title = "강남 밤문화 블로그 | 예약·가격 용어·에티켓";
    const description = "강남 하이퍼블릭 첫 방문 체크리스트, 주대·TC·RT 뜻, 안전한 예약과 결제 에티켓을 검색 질문별로 안내합니다.";
    return { title, description, keywords: ["강남 밤문화 블로그", "강남 룸 예약", "주대 TC RT", "강남 밤문화 에티켓"], alternates: { canonical: "/블로그" }, openGraph: { title, description, url: "/블로그", images: [imageSet.group] } };
  }
  if (slug.length === 1 && legal) {
    return { title: legal.title, description: legal.description, alternates: { canonical: `/${first}` } };
  }
  return { title: "페이지를 찾을 수 없습니다", robots: { index: false, follow: false } };
}

function CategoryPage({ category }: { category: Category }) {
  const categoryIndex = categories.findIndex((item) => item.slug === category.slug);
  const introImage = hostessImagePool[(categoryIndex + 2) % hostessImagePool.length];
  const guideImage = hostessImagePool[(categoryIndex + 5) % hostessImagePool.length];
  const seoChapters = buildCategorySeoChapters(category);
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${category.name} 뜻·가격·예약 가이드`,
    description: category.longDescription,
    url: `${siteUrl}/${category.slug}`,
    inLanguage: "ko-KR",
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="inner-visual-hero category-visual-hero">
          <img src={category.image} alt={`${category.name} 가이드의 아이돌풍 드레스를 입은 20대 성인 여성 모델`} width="1600" height="1000" />
          <span className="inner-hero-shade" aria-hidden="true" />
          <span className="inner-hero-grid" aria-hidden="true" />
          <div className="shell inner-hero-content">
            <Breadcrumb items={[{ label: category.shortName }]} />
            <p className="eyebrow"><span>ADULT GUIDE</span>{category.eyebrow}</p>
            <h1>{category.name}<br /><em>뜻·가격 용어·예약 체크</em></h1>
            <p>{category.longDescription}</p>
            <div className="inner-hero-actions">
              <a className="primary-button large-button" href="#about">업종 특징 알아보기 <i className="ph ph-arrow-down" aria-hidden="true" /></a>
              <a className="ghost-button" href="#price">비용 용어 확인 <i className="ph ph-arrow-right" aria-hidden="true" /></a>
            </div>
            <ul className="hero-highlight-list">{category.highlights.map((item) => <li key={item}><i className="ph ph-check-circle" aria-hidden="true" />{item}</li>)}</ul>
          </div>
          <div className="inner-image-caption"><span>{category.eyebrow}</span><strong>GANGNAM NIGHT CATEGORY</strong></div>
        </section>

        <section className="category-intro-strip">
          <div className="shell">
            <div><span>01</span><strong>업종 뜻</strong><p>통칭과 실제 운영 조건을 구분합니다.</p></div>
            <div><span>02</span><strong>룸·인원</strong><p>모임 목적에 맞는 공간을 비교합니다.</p></div>
            <div><span>03</span><strong>비용·예약</strong><p>포함 항목과 변경 조건을 확인합니다.</p></div>
          </div>
        </section>

        <section className="section category-explain-section" id="about">
          <div className="shell category-explain-grid">
            <div>
              <p className="section-kicker">ABOUT THE CATEGORY</p>
              <h2>{category.name}은 어떤 업종인가요?</h2>
              <p>{category.definition}</p>
              <p>{category.audience}</p>
              <p>{category.comparisonTip}</p>
              <div className="info-chip-row">{category.highlights.map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <figure className="portrait-side-card">
              <img src={introImage} alt={`${category.name} 분위기를 보여주는 글래머러스한 20대 성인 여성 모델`} width="1600" height="1000" loading="lazy" />
              <figcaption><span>CHECK THE DETAILS</span><strong>이름보다 실제 조건을 비교하세요</strong></figcaption>
            </figure>
          </div>
        </section>

        <section className="section category-venues-section" id="venues">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">VENUE GUIDE</p><h2>많이 찾는 {category.shortName}<br />업소별 확인사항</h2></div>
              <p>{category.venues.length ? `${category.shortName} 관련 검색이 많은 ${category.venues.length}개 업소를 첫 방문, 룸 선택, 시간과 비용처럼 서로 다른 확인 주제로 정리했습니다.` : `${category.shortName}은 이름만으로 서비스나 등급을 판단하기 어렵습니다. 대표 업소를 고르기 전에 업종의 의미와 예약 질문부터 확인하세요.`}</p>
            </div>
            {category.venues.length ? (
              <div className="people-venue-grid">{category.venues.map((venue, index) => <VenueCard venue={venue} category={category} index={index} key={venue.slug} />)}</div>
            ) : (
              <div className="empty-venue-editorial">
                <img src={guideImage} alt={`${category.name} 안내의 아이돌풍 드레스를 입은 20대 성인 여성 모델`} width="1600" height="1000" loading="lazy" />
                <span className="people-venue-overlay" aria-hidden="true" />
                <div><p>BEFORE YOU BOOK</p><h3>{category.name}, 먼저 네 가지를 정하세요.</h3><span>모임 목적 · 성인 인원 · 이용 시간 · 예산 범위</span></div>
              </div>
            )}
          </div>
        </section>

        <section className="section category-system-section" id="system">
          <div className="shell">
            <div className="section-heading"><p className="section-kicker">RESERVATION FLOW</p><h2>{category.shortName} 예약 전 확인 순서</h2></div>
            <div className="system-card-grid">
              <article><span>01</span><i className="ph ph-users-three" aria-hidden="true" /><h3>목적과 인원 정리</h3><p>대화·회식·노래 중 우선순위와 실제 성인 인원을 정합니다.</p></article>
              <article><span>02</span><i className="ph ph-identification-card" aria-hidden="true" /><h3>상호·위치 확인</h3><p>공식 안내 채널인지, 상호와 방문 위치가 일치하는지 확인합니다.</p></article>
              <article><span>03</span><i className="ph ph-list-checks" aria-hidden="true" /><h3>비용 기준 질문</h3><p>룸, 시간, 주류, 인원별 비용과 별도 항목을 나눠 묻습니다.</p></article>
              <article><span>04</span><i className="ph ph-receipt" aria-hidden="true" /><h3>기록과 결제 확인</h3><p>예약 내용을 남기고 이용한 항목과 최종 내역을 비교합니다.</p></article>
            </div>
          </div>
        </section>

        <section className="section price-section category-price-section" id="price">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">PRICE TERMINOLOGY</p><h2>{category.shortName} 비용 용어와<br />확인 질문</h2></div>
              <p>금액만 묻기보다 각 항목이 무엇을 뜻하고 어떤 단위로 계산되는지 확인하세요. 날짜·시간·인원을 알려주면 예상 총액을 비교하기 쉽습니다.</p>
            </div>
            <PriceTable categoryName={category.name} />
          </div>
        </section>
        <SeoLongform
          title={`${category.name} 완전 가이드`}
          description={`${category.name}의 뜻과 공간, 비용, 예약, 방문 당일 확인사항을 검색 의도에 맞춰 H2·H3 구조로 정리했습니다.`}
          chapters={seoChapters}
          id="category-complete-guide"
        />
        <FaqBlock title={`${category.shortName} 자주 묻는 질문`} faqs={category.faqs} />
        <BottomContact />
      </main>
      <SiteFooter /><MobileBottomCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(category.faqs)) }} />
    </>
  );
}

function VenuePage({ category, venue }: { category: Category; venue: Venue }) {
  const related = category.venues.filter((item) => item.slug !== venue.slug).slice(0, 3);
  const venueIndex = venueDirectory.findIndex((item) => item.category.slug === category.slug && item.slug === venue.slug);
  const introImage = hostessImagePool[(venueIndex + 2) % hostessImagePool.length];
  const reservationImage = hostessImagePool[(venueIndex + 5) % hostessImagePool.length];
  const seoChapters = buildVenueSeoChapters(category, venue);
  const venueSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `강남 ${venue.name} ${category.shortName} 예약·이용 정보`,
    description: venue.metaDescription,
    url: `${siteUrl}/${category.slug}/${venue.slug}`,
    isPartOf: { "@type": "WebSite", name: "강남의 밤", url: `${siteUrl}/` },
    inLanguage: "ko-KR",
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="venue-detail-hero">
          <div className="venue-detail-image"><img src={venue.image} alt={`강남 ${venue.name} 가이드의 글래머러스한 20대 성인 여성 모델`} width="1600" height="1000" /><span className="venue-detail-shade" aria-hidden="true" /></div>
          <div className="shell venue-detail-hero-content">
            <Breadcrumb items={[{ label: category.shortName, href: `/${category.slug}` }, { label: venue.name }]} />
            <p className="eyebrow"><span>VENUE CHECK</span>{venue.mood}</p>
            <h1>강남 {venue.name}<br /><em>{category.shortName} 예약·이용 정보</em></h1>
            <p>{venue.summary}. 운영 여부와 실제 조건은 방문 전에 공식 안내 채널에서 다시 확인하세요.</p>
            <div className="venue-detail-actions"><a className="primary-button large-button" href="#intro">핵심 정보 보기 <i className="ph ph-arrow-down" aria-hidden="true" /></a><a className="ghost-button" href="#price">비용 용어 확인 <i className="ph ph-arrow-right" aria-hidden="true" /></a></div>
          </div>
          <div className="detail-page-mark"><span>CHECK FIRST</span><strong>ROOM · TIME · COST</strong></div>
        </section>

        <nav className="venue-anchor-nav" aria-label="상세 정보 바로가기">
          <div className="shell"><a href="#intro">소개</a><a href="#features">확인사항</a><a href="#system">이용 순서</a><a href="#price">비용 용어</a><a href="#reservation">예약 체크</a><a href="#location">방문 동선</a><a href="#faq">FAQ</a></div>
        </nav>

        <section className="section venue-intro-section" id="intro">
          <div className="shell venue-intro-grid">
            <div className="venue-intro-copy">
              <p className="section-kicker">INTRODUCTION</p>
              <h2>강남 {venue.name}<br />방문 전 알아둘 내용</h2>
              <p>{venue.intro}</p>
              <p>{venue.decisionTip}</p>
              <div className="info-chip-row"><span>룸·인원 확인</span><span>시간·비용 확인</span><span>예약 기록 보관</span></div>
            </div>
            <figure className="venue-intro-image"><img src={introImage} alt={`${venue.name} 정보와 함께 보는 아이돌풍 드레스의 20대 성인 여성 모델`} width="1600" height="1000" loading="lazy" /><figcaption><span>CHOOSE BY PURPOSE</span><strong>방문 목적에 맞는 조건을 확인하세요</strong></figcaption></figure>
          </div>
        </section>

        <section className="section venue-feature-section" id="features">
          <div className="shell">
            <div className="section-heading"><p className="section-kicker">KEY QUESTIONS</p><h2>{venue.name} 예약 전에 확인할 3가지</h2></div>
            <div className="feature-number-grid">{venue.features.map((feature, index) => <article key={feature.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</div>
          </div>
        </section>

        <section className="section venue-system-detail" id="system">
          <div className="shell venue-system-layout">
            <div className="system-sticky-copy"><p className="section-kicker">VISIT FLOW</p><h2>{venue.name}<br />문의부터 결제까지</h2><p>처음 안내받은 조건이 현장에서도 같은지 단계마다 확인하세요.</p></div>
            <ol className="detail-timeline">
              <li><span>01</span><div><h3>일정과 인원 전달</h3><p>방문 날짜, 도착 시간, 성인 인원과 모임 목적을 한 번에 전달합니다.</p></div></li>
              <li><span>02</span><div><h3>룸과 이용 시간 확인</h3><p>인원에 맞는 룸, 기본 시간, 대기와 연장 적용 기준을 확인합니다.</p></div></li>
              <li><span>03</span><div><h3>포함·별도 비용 구분</h3><p>주대, TC, RT, 봉사료와 추가 주문을 나눠 예상 총액을 요청합니다.</p></div></li>
              <li><span>04</span><div><h3>현장 재확인과 결제</h3><p>이용 시작 전 예약 내용을 확인하고, 종료 전 실제 이용 내역과 결제 금액을 비교합니다.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="section price-section venue-price-detail" id="price">
          <div className="shell">
            <div className="section-heading split-heading"><div><p className="section-kicker">PRICE TERMS</p><h2>{venue.name} 예약에서<br />확인할 비용 용어</h2></div><p>검증되지 않은 시작 금액보다 내 날짜·시간·인원에 적용되는 기준을 확인해야 합니다. 필수 비용과 선택 항목을 나눠 설명해 달라고 요청하세요.</p></div>
            <PriceTable categoryName={`강남 ${venue.name}`} />
          </div>
        </section>

        <section className="section reservation-section" id="reservation">
          <div className="shell reservation-panel">
            <div className="reservation-image"><img src={reservationImage} alt={`${venue.name} 예약 체크리스트 옆 글래머러스한 20대 성인 여성 모델`} width="1600" height="1000" loading="lazy" /><span className="people-venue-overlay" aria-hidden="true" /></div>
            <div className="reservation-copy"><p className="section-kicker">RESERVATION CHECK</p><h2>예약 메시지에<br />네 가지를 남기세요.</h2><ul>{venue.reservationQuestions.map((item) => <li key={item}><i className="ph ph-check-circle" aria-hidden="true" />{item}</li>)}</ul><Link className="primary-button" href="/블로그/주대-tc-rt-용어">주대·TC·RT 뜻 보기 <i className="ph ph-arrow-up-right" aria-hidden="true" /></Link></div>
          </div>
        </section>

        <section className="section location-section" id="location">
          <div className="shell location-grid">
            <div>
              <p className="section-kicker">BEFORE DEPARTURE</p>
              <h2>{venue.name} 방문 전<br />위치와 귀가 동선 확인</h2>
              <p>동일하거나 비슷한 상호가 검색될 수 있습니다. 예약을 확정한 채널에서 정확한 상호, 주소, 건물명과 출입구를 받아 지도와 일치하는지 확인하세요.</p>
              <dl>
                <div><dt>주소</dt><dd>상호·건물명·출입구까지 확인</dd></div>
                <div><dt>대중교통</dt><dd>도보 경로와 막차 시간 확인</dd></div>
                <div><dt>차량</dt><dd>주차와 대리운전 승차 위치 확인</dd></div>
              </dl>
            </div>
            <div className="map-placeholder"><span className="map-grid" aria-hidden="true" /><i className="ph ph-map-trifold" aria-hidden="true" /><strong>출발 전에 다시 확인</strong><p>주소 · 건물명 · 출입구 · 귀가 교통</p></div>
          </div>
        </section>

        <SeoLongform
          title={`강남 ${venue.name} ${category.shortName} 완전 가이드`}
          description={`${venue.name}을 검색한 성인 이용자가 룸, 시간, 비용, 예약과 안전한 이용 기준을 한 페이지에서 확인할 수 있도록 정리했습니다.`}
          chapters={seoChapters}
          id="venue-complete-guide"
        />

        {related.length > 0 && <section className="section related-venues-section"><div className="shell"><div className="section-heading split-heading"><div><p className="section-kicker">COMPARE MORE</p><h2>함께 비교할 {category.shortName}</h2></div><Link className="text-link" href={`/${category.slug}`}>{category.shortName} 전체 보기 <i className="ph ph-arrow-right" aria-hidden="true" /></Link></div><div className="people-venue-grid related-grid">{related.map((item, index) => <VenueCard venue={item} category={category} index={index} key={item.slug} />)}</div></div></section>}
        <FaqBlock title={`${venue.name} 자주 묻는 질문`} faqs={venue.faqs} />
        <BottomContact />
      </main>
      <SiteFooter /><MobileBottomCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(venueSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(venue.faqs)) }} />
    </>
  );
}

function BlogIndex() {
  const seoChapters = buildBlogIndexSeoChapters();
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "강남 밤문화 블로그",
    description: "강남 밤문화 예약, 비용 용어와 안전한 이용 정보를 다루는 실전 가이드 모음",
    url: `${siteUrl}/블로그`,
    inLanguage: "ko-KR",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: blogPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/블로그/${post.slug}`,
        name: post.title,
      })),
    },
  };
  return (
    <><SiteHeader /><main id="main-content">
      <section className="blog-index-hero"><img src={imageSet.group} alt="글래머러스한 드레스를 입은 20대 성인 한국 여성 모델 네 명" width="1600" height="1000" /><span className="inner-hero-shade" aria-hidden="true" /><div className="shell"><Breadcrumb items={[{ label: "블로그" }]} /><p className="eyebrow"><span>EDITORIAL</span>NIGHT GUIDE JOURNAL</p><h1>강남 밤문화 예약 전<br /><em>꼭 알아둘 실전 정보</em></h1><p>첫 방문 체크리스트부터 주대·TC·RT 뜻, 안전한 음주와 결제 에티켓까지 검색 질문별로 깊이 있게 안내합니다.</p></div></section>
      <section className="section blog-index-content"><div className="shell"><div className="section-heading split-heading"><div><p className="section-kicker">SEARCH THE JOURNAL</p><h2>상황에 맞는 가이드를<br />빠르게 찾아보세요.</h2></div><p>카테고리를 선택하거나 제목·주제로 검색할 수 있습니다. 모든 글은 5,000자 이상의 장문 원고와 단계별 목차를 제공합니다.</p></div><BlogExplorer posts={blogPosts} /></div></section>
      <SeoLongform
        title="강남 밤문화 블로그 활용 가이드"
        description="첫 방문, 가격, 업종 비교, 단체 모임과 안전 원칙까지 블로그를 검색 의도에 맞게 활용하는 방법입니다."
        chapters={seoChapters}
        id="blog-complete-guide"
      />
      <BottomContact />
    </main><SiteFooter /><MobileBottomCta /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} /></>
  );
}

function BlogArticle({ post }: { post: BlogPost }) {
  const seoChapters = buildBlogArticleSeoChapters(post);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    author: { "@type": "Organization", name: "강남의 밤" },
    publisher: { "@type": "Organization", name: "강남의 밤" },
    image: `${siteUrl}${post.image}`,
    mainEntityOfPage: `${siteUrl}/블로그/${post.slug}`,
    inLanguage: "ko-KR",
    wordCount: countSeoWords(seoChapters),
    articleSection: post.category,
  };
  return (
    <><SiteHeader /><main id="main-content"><article>
      <header className="article-detail-hero"><div className="shell"><Breadcrumb items={[{ label: "블로그", href: "/블로그" }, { label: post.title }]} /><p className="eyebrow"><span>{post.category}</span>NIGHT GUIDE JOURNAL</p><h1>{post.title}</h1><p>{post.excerpt}</p><div className="article-meta"><span>강남의 밤 편집</span><span>{post.date}</span><span>읽는 시간 {post.readTime}</span></div></div></header>
      <figure className="article-lead-image"><img src={post.image} alt={`${post.title} 글과 함께 보는 글래머러스한 20대 성인 여성 모델`} width="1600" height="1000" /><span className="people-venue-overlay" aria-hidden="true" /></figure>
      <div className="shell article-body-layout">
        <aside><strong>CONTENTS</strong>{post.sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}<a href="#article-complete-guide">5,000자 심층 가이드</a></aside>
        <div className="article-prose">
          <p className="article-lead">{post.lead}</p>
          {post.sections.map((section) => <section id={section.id} key={section.id}><span>{section.label}</span><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.checklist && <><h3>확인 체크리스트</h3><ul className="article-checklist">{section.checklist.map((item) => <li key={item}><i className="ph ph-check-circle" aria-hidden="true" />{item}</li>)}</ul></>}{section.quote && <div className="article-quote">“{section.quote}”</div>}</section>)}
          <div className="article-notice"><i className="ph ph-info" aria-hidden="true" /><p>운영시간과 비용은 날짜, 인원과 선택 조건에 따라 달라질 수 있습니다. 방문 전에 해당 사업자의 공식 안내를 확인하세요.</p></div>
        </div>
      </div>
      <SeoLongform
        title={`${post.title} 심층 가이드`}
        description={`${post.excerpt} 실제 확인 순서와 질문 예시를 포함한 5,000자 이상의 확장 원고입니다.`}
        chapters={seoChapters}
        id="article-complete-guide"
      />
    </article>
    <section className="section article-related"><div className="shell"><div className="section-heading"><p className="section-kicker">MORE STORIES</p><h2>함께 읽으면 좋은 글</h2></div><div className="editorial-post-grid">{blogPosts.filter((item) => item.slug !== post.slug).slice(0, 3).map((item, index) => <article className="editorial-post-card" key={item.slug}><Link className="editorial-post-image" href={`/블로그/${item.slug}`}><img src={item.image} alt={`${item.title} 글의 아이돌풍 드레스를 입은 20대 성인 여성 모델`} width="1600" height="1000" loading="lazy" /><span className="people-venue-overlay" aria-hidden="true" /><strong>0{index + 1}</strong></Link><div><p>{item.category} · {item.readTime}</p><h3><Link href={`/블로그/${item.slug}`}>{item.title}</Link></h3><span>{item.excerpt}</span></div></article>)}</div></div></section>
    </main><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} /></>
  );
}

function LegalPage({ pageKey, page }: { pageKey: string; page: LegalPageData }) {
  return (
    <><SiteHeader /><main id="main-content">
      <header className="legal-hero"><div className="shell"><Breadcrumb items={[{ label: page.title }]} /><p className="section-kicker">POLICY & INFORMATION</p><h1>{page.title}</h1><p>{page.description}</p><span>최종 업데이트 2026.07.16</span></div></header>
      <div className="shell legal-layout">
        <aside><strong>CONTENTS</strong>{page.sections.map((section, index) => <a href={`#legal-${index + 1}`} key={section.title}>{section.title}</a>)}</aside>
        <article className="legal-content"><p className="legal-lead">{page.lead}</p>{page.sections.map((section, index) => <section id={`legal-${index + 1}`} key={section.title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}</article>
      </div>
    </main><SiteFooter />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: page.title, description: page.description, url: `${siteUrl}/${pageKey}`, inLanguage: "ko-KR" }) }} />
    </>
  );
}

export default async function DynamicPage({ params }: { params: Promise<PageParams> }) {
  const { slug: rawSlug } = await params;
  const { slug, first, category, venue, post, legal } = resolvePage(rawSlug);
  if (slug.length === 2 && category && venue) return <VenuePage category={category} venue={venue} />;
  if (slug.length === 1 && category) return <CategoryPage category={category} />;
  if (slug.length === 2 && first === "블로그" && post) return <BlogArticle post={post} />;
  if (slug.length === 1 && first === "블로그") return <BlogIndex />;
  if (slug.length === 1 && legal) return <LegalPage pageKey={first} page={legal} />;
  notFound();
}
