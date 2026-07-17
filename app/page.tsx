/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  BottomContact,
  CategoryImageCard,
  FaqBlock,
  MobileBottomCta,
  PriceTable,
  SiteFooter,
  SiteHeader,
  VenueCard,
} from "./site-components";
import { blogPosts, categories, imageSet, sharedFaqs, venueDirectory } from "./site-data";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "강남의 밤",
  url: "https://www.gangnamnight.com/",
  description: "강남 밤문화 업종 차이, 비용 용어와 예약 전 확인사항을 성인 이용자 관점에서 정리한 정보 가이드",
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
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="people-hero" id="top">
          <img className="people-hero-image" src={imageSet.hero} alt="밝은 럭셔리 라운지에서 아이보리·블루·라일락 드레스를 입은 20대 성인 한국 여성 모델 세 명" width="1600" height="1000" />
          <div className="people-hero-shade" aria-hidden="true" />
          <div className="people-hero-grid" aria-hidden="true" />
          <div className="shell people-hero-inner">
            <div className="people-hero-copy">
              <p className="eyebrow"><span>ADULT INFORMATION</span>강남 밤문화 정보 가이드</p>
              <h1>강남 밤문화,<br /><em>업종 비교</em>부터 예약 전 확인까지.</h1>
              <p>하이퍼블릭, 셔츠룸, 쩜오, 텐카페처럼 익숙하지 않은 업종의 차이와 주대·TC·RT 용어, 예약할 때 물어볼 내용을 한눈에 살펴보세요.</p>
              <div className="people-hero-actions">
                <Link className="primary-button large-button" href="/하이퍼블릭">업종별 차이 보기 <i className="ph ph-arrow-up-right" aria-hidden="true" /></Link>
                <Link className="ghost-button" href="/블로그/강남-하이퍼블릭-이용팁">첫 방문 체크 <i className="ph ph-arrow-right" aria-hidden="true" /></Link>
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
              <div><p className="section-kicker">CATEGORY GUIDE</p><h2>강남 밤문화 업종,<br />이름보다 조건을 비교하세요.</h2></div>
              <p>시장에 통용되는 명칭은 공식 등급이나 품질 보증이 아닐 수 있습니다. 룸과 인원, 이용 시간, 비용 산정 방식과 예약 조건을 기준으로 차이를 살펴보세요.</p>
            </div>
            <div className="category-image-grid">
              {categories.map((category, index) => <CategoryImageCard category={category} index={index} key={category.slug} />)}
            </div>
          </div>
        </section>

        <section className="section page-venue-section">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">VENUE CHECKLIST</p><h2>많이 찾는 업소도<br />같은 기준으로 확인하세요.</h2></div>
              <p>업소 이름마다 검색 목적이 다릅니다. 첫 방문 순서, 룸 선택, 시간대와 추가 비용처럼 각 상황에서 놓치기 쉬운 질문을 구분해 정리했습니다.</p>
            </div>
            <div className="people-venue-grid home-venue-grid">
              {venueDirectory.slice(0, 6).map((venue, index) => <VenueCard venue={venue} category={venue.category} index={index} key={`${venue.category.slug}-${venue.slug}`} />)}
            </div>
            <div className="center-link"><Link className="outline-button" href="/하이퍼블릭">하이퍼블릭 업소 정보 보기 <i className="ph ph-arrow-right" aria-hidden="true" /></Link></div>
          </div>
        </section>

        <section className="section page-system-section">
          <div className="shell page-system-grid">
            <div className="system-editorial-image">
              <img src={imageSet.group} alt="글래머러스한 드레스를 입은 20대 성인 한국 여성 모델 네 명" width="1600" height="1000" loading="lazy" />
              <span className="people-venue-overlay" aria-hidden="true" />
              <div><span>HOW TO USE</span><strong>찾고 · 비교하고 · 확인하기</strong></div>
            </div>
            <div className="system-editorial-content">
              <p className="section-kicker">INFORMATION FLOW</p>
              <h2>내 모임에 맞는 곳을<br />세 단계로 좁혀보세요.</h2>
              <ol className="numbered-flow">
                <li><span>01</span><div><h3>모임 목적 정하기</h3><p>대화, 회식, 노래 중 무엇이 중요한지와 인원을 먼저 정합니다.</p></div></li>
                <li><span>02</span><div><h3>같은 조건으로 비교</h3><p>룸, 기본 시간, 포함 항목과 추가 비용을 같은 순서로 확인합니다.</p></div></li>
                <li><span>03</span><div><h3>예약 내용을 기록</h3><p>상호·시간·인원·예상 총액과 변경 조건을 다시 볼 수 있게 남깁니다.</p></div></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="section price-section page-price-section">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">PRICE GUIDE</p><h2>주대·TC·RT,<br />금액보다 기준을 확인하세요.</h2></div>
              <p>같은 약어라도 사업장마다 포함 범위와 계산 단위가 다를 수 있습니다. 용어의 일반적인 의미와 예약할 때 바로 사용할 질문을 함께 정리했습니다.</p>
            </div>
            <PriceTable />
          </div>
        </section>

        <section className="section home-blog-section">
          <div className="shell">
            <div className="section-heading split-heading">
              <div><p className="section-kicker">NIGHT GUIDE JOURNAL</p><h2>방문 전 궁금증을 푸는<br />실전 이용 가이드</h2></div>
              <Link className="text-link" href="/블로그">블로그 전체 보기 <i className="ph ph-arrow-right" aria-hidden="true" /></Link>
            </div>
            <div className="editorial-post-grid">
              {blogPosts.map((post, index) => (
                <article className="editorial-post-card" key={post.slug}>
                  <Link className="editorial-post-image" href={`/블로그/${post.slug}`}>
                    <img src={post.image} alt={`${post.title} 글과 함께 보는 아이돌풍 드레스의 20대 성인 여성 모델`} width="1600" height="1000" loading="lazy" />
                    <span className="people-venue-overlay" aria-hidden="true" />
                    <strong>0{index + 1}</strong>
                  </Link>
                  <div><p>{post.category} · {post.readTime}</p><h3><Link href={`/블로그/${post.slug}`}>{post.title}</Link></h3><span>{post.excerpt}</span><Link href={`/블로그/${post.slug}`}>글 읽기 <i className="ph ph-arrow-up-right" aria-hidden="true" /></Link></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <FaqBlock />
        <BottomContact />
      </main>
      <SiteFooter />
      <MobileBottomCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema) }} />
    </>
  );
}
