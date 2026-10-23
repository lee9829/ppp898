/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import {
  BottomContact,
  CategoryImageCard,
  FaqBlock,
  MobileBottomCta,
  OtherVenues,
  PhoneReservationButton,
  PriceTable,
  SeoLongform,
  SiteFooter,
  SiteHeader,
  VenueCard,
} from "./site-components";
import { blogPosts, categories, imageSet, sharedFaqs, venueDirectory } from "./site-data";
import { buildHomeSeoChapters } from "./seo-content";
import { siteUrl } from "./site-config";
import { homeCopy, imageAlt } from "./site-copy";
import { pageMetadata } from "./page-metadata";

export const metadata: Metadata = pageMetadata({
  h1: `${homeCopy.lead} ${homeCopy.subtitle}`, description: homeCopy.description, path: "/", image: imageSet.hero,
});

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "강남의 밤",
  url: `${siteUrl}/`,
  description: "강남 유흥 업종 차이, 비용 용어와 예약 전 확인사항을 성인 이용자 관점에서 정리한 정보 가이드",
  inLanguage: "ko-KR",
};

const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sharedFaqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export default function Home() {
  const seoChapters = buildHomeSeoChapters();
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="people-hero" id="top">
          <img className="people-hero-image" src={imageSet.hero} alt={imageAlt(imageSet.hero, "강남 유흥 가이드 대표 화보")} fetchPriority="high" width="1600" height="1000" />
          <div className="people-hero-shade" aria-hidden="true" />
          <div className="people-hero-grid" aria-hidden="true" />
          <div className="shell people-hero-inner">
            <div className="people-hero-copy">
              <p className="eyebrow"><span>ADULT INFORMATION</span>강남 유흥 정보 가이드</p>
              <h1>강남 <em>유흥</em> 가이드,<br />{homeCopy.subtitle}</h1>
              <p>{homeCopy.description}</p>
              <div className="people-hero-actions">
                <PhoneReservationButton label="전화 예약 상담" className="large-button" />
                <a className="ghost-button" href="#category-pages">업종별 비교하기 <i className="ph ph-squares-four" aria-hidden="true" /></a>
              </div>
              <form className="quick-search compact-search" id="quick-search" action="/">
                <i className="ph ph-magnifying-glass" aria-hidden="true" />
                <label className="sr-only" htmlFor="site-search">업소 또는 카테고리 검색</label>
                <input id="site-search" name="q" type="search" placeholder="업소명 또는 카테고리를 검색하세요" />
                <button type="submit">검색</button>
              </form>
              <div className="hero-trust"><span><i className="ph ph-files" aria-hidden="true" />7개 업종 가이드</span><span><i className="ph ph-article" aria-hidden="true" />15개 업소별 체크</span><span><i className="ph ph-shield-check" aria-hidden="true" />성인 이용 원칙</span></div>
            </div>
            <div className="hero-model-caption">
              <span>GANGNAM NIGHT GUIDE</span>
              <strong>IVORY · BLUE · LILAC</strong>
            </div>
          </div>
          <a className="scroll-cue" href="#category-pages"><span>SCROLL TO EXPLORE</span><i className="ph ph-arrow-down" aria-hidden="true" /></a>
        </section>

        <section className="section page-category-section" id="category-pages">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">CATEGORY GUIDE</p><h2><em>강남 유흥 업종별 비교,</em><br />어떤 스타일이 나에게 맞을까요?</h2></div>
              <p>강남의 다양한 유흥 업종을 한눈에 비교해 보세요. 각 업종의 특징과 이용 방식, 분위기와 주대·TC·RT 등 기본 정보를 정리했습니다. 원하는 스타일을 선택하고 상세 가이드에서 필요한 내용을 확인하세요.</p>
            </div>
            <div className="category-image-grid">
              {categories.map((category, index) => <CategoryImageCard category={category} index={index} key={category.slug} />)}
            </div>
          </div>
        </section>

        <section className="section page-venue-section" id="popular-venues">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">VENUE CHECKLIST</p><h2><em>2026년 최신</em> 강남 인기 업체 BEST 6</h2></div>
              <p>강남에서 찾는 하이퍼블릭과 셔츠룸 6곳의 정보를 모았습니다. 업체별 특징과 분위기를 살펴보고, 원하는 스타일과 방문 조건에 맞춰 비교해 보세요. 예약과 이용 문의는 전화로 상담하실 수 있습니다.</p>
            </div>
            <div className="people-venue-grid home-venue-grid">
              {venueDirectory.slice(0, 6).map((venue, index) => <VenueCard venue={venue} category={venue.category} index={index} key={`${venue.category.slug}-${venue.slug}`} />)}
            </div>
            <div className="center-link"><PhoneReservationButton label="쉽고 빠른 전화 문의" /></div>
          </div>
        </section>

        <section className="section page-system-section" id="how-to-use">
          <div className="shell page-system-grid">
            <div className="system-editorial-image">
              <img src={imageSet.group} alt={imageAlt(imageSet.group, "강남 유흥 이용 가이드")} width="1600" height="1000" loading="lazy" />
              <span className="people-venue-overlay" aria-hidden="true" />
              <div><span>HOW TO USE</span><strong>업종 선택부터 예약 상담까지</strong></div>
            </div>
            <div className="system-editorial-content">
              <p className="section-kicker">INFORMATION FLOW</p>
              <h2>강남 유흥 이용 가이드,<br />예약까지 간편하게 <em>3단계!</em></h2>
              <ol className="numbered-flow">
                <li><span>01</span><div><h3>원하는 업종 선택하기</h3><p>하이퍼블릭, 쩜오, 셔츠룸, 가라오케 등 다양한 업종을 살펴보세요. 특징과 분위기, 이용 방식을 비교해 방문 목적과 취향에 맞는 곳을 선택합니다.</p></div></li>
                <li><span>02</span><div><h3>이용 조건 및 비용 확인하기</h3><p>방문 인원과 시간, 선택한 업종에 따라 이용 조건이 달라집니다. 주대·TC·RT와 추가 비용, 예약 가능 시간을 확인해 예상 비용을 파악해 보세요.</p></div></li>
                <li><span>03</span><div><h3>전화 상담 및 예약하기</h3><p>원하는 업종과 방문 일정이 정해졌다면 전화로 문의해 보세요. 인원과 희망 시간, 예산을 전달하고 이용 가능한 업체와 예약 조건을 확인합니다.</p></div></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="section price-section page-price-section" id="price">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">PRICE GUIDE</p><h2>주대·TC·RT,<br />금액보다 기준을 확인하세요.</h2></div>
              <p>같은 약어라도 사업장마다 포함 범위와 계산 단위가 다를 수 있습니다. 용어의 일반적인 의미와 예약할 때 바로 사용할 질문을 함께 정리했습니다.</p>
            </div>
            <PriceTable />
          </div>
        </section>

        <section className="section home-blog-section" id="blog">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">NIGHT GUIDE JOURNAL</p><h2><em>가격</em>부터 예약까지,<br />방문 전 꼭 알아둘 정보.</h2></div>
              <Link className="text-link" href="/블로그">블로그 전체 보기 <i className="ph ph-arrow-right" aria-hidden="true" /></Link>
            </div>
            <div className="editorial-post-grid">
              {blogPosts.map((post, index) => (
                <article className="editorial-post-card" key={post.slug}>
                  <Link className="editorial-post-image" href={`/블로그/${post.slug}`}>
                    <img src={post.image} alt={imageAlt(post.image, post.title)} width="1600" height="1000" loading="lazy" />
                    <span className="people-venue-overlay" aria-hidden="true" />
                    <strong>0{index + 1}</strong>
                  </Link>
                  <div><p>{post.category} · {post.readTime}</p><h3><Link href={`/블로그/${post.slug}`}>{post.title}</Link></h3><span>{post.excerpt}</span><Link href={`/블로그/${post.slug}`}>글 읽기 <i className="ph ph-arrow-up-right" aria-hidden="true" /></Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SeoLongform
          title="강남 유흥 업종 비교와 예약 전 확인 가이드"
          description="하이퍼블릭부터 텐프로·일프로까지 업종 통칭의 의미, 룸과 시간, 주대·TC·RT, 예약과 안전한 이용 원칙을 한 번에 정리했습니다."
          chapters={seoChapters}
          id="home-complete-guide"
        />

        <FaqBlock />
        <OtherVenues />
        <BottomContact />
      </main>
      <SiteFooter />
      <MobileBottomCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
    </>
  );
}
