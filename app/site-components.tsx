/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { categories, priceRows, sharedFaqs, type Category, type FaqItem, type Venue } from "./site-data";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">본문으로 바로가기</a>
      <div className="top-note">
        <div className="shell top-note-inner">
          <p><i className="ph ph-shield-check" aria-hidden="true" />성인 대상 정보 가이드 · 불법 행위를 안내하거나 중개하지 않습니다</p>
          <span>19+</span>
        </div>
      </div>
      <header className="site-header multi-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="강남의 밤 홈">
            <span className="brand-mark" aria-hidden="true"><span>GN</span></span>
            <span className="brand-copy"><strong>강남의 밤</strong><small>GANGNAM NIGHT GUIDE</small></span>
          </Link>

          <nav className="desktop-nav category-nav" aria-label="카테고리 메뉴">
            {categories.slice(0, 5).map((category) => (
              <Link href={`/${category.slug}`} key={category.slug}>{category.shortName}</Link>
            ))}
            <details className="nav-more">
              <summary>더보기 <i className="ph ph-caret-down" aria-hidden="true" /></summary>
              <div>
                {categories.slice(5).map((category) => (
                  <Link href={`/${category.slug}`} key={category.slug}>{category.name}</Link>
                ))}
                <Link href="/블로그">블로그</Link>
              </div>
            </details>
          </nav>

          <div className="header-actions">
            <Link className="icon-button" href="/#quick-search" aria-label="정보 검색">
              <i className="ph ph-magnifying-glass" aria-hidden="true" />
            </Link>
            <Link className="header-cta" href="/블로그/강남-하이퍼블릭-이용팁">첫 방문 가이드 <i className="ph ph-arrow-up-right" aria-hidden="true" /></Link>
          </div>

          <details className="mobile-menu">
            <summary aria-label="모바일 메뉴 열기"><i className="ph ph-list" aria-hidden="true" /></summary>
            <nav aria-label="모바일 메뉴">
              <Link href="/">메인 홈</Link>
              {categories.map((category) => <Link href={`/${category.slug}`} key={category.slug}>{category.name}</Link>)}
              <Link href="/블로그">블로그</Link>
              <Link className="mobile-contact" href="/블로그/강남-하이퍼블릭-이용팁">첫 방문 가이드</Link>
            </nav>
          </details>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" id="legal">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Link className="brand" href="/" aria-label="강남의 밤 홈">
            <span className="brand-mark" aria-hidden="true"><span>GN</span></span>
            <span className="brand-copy"><strong>강남의 밤</strong><small>GANGNAM NIGHT GUIDE</small></span>
          </Link>
          <p>성인 대상 강남 밤문화 용어와 예약 전 확인사항을 과장 없이 정리하는 정보 가이드.</p>
        </div>
        <div className="footer-links">
          <div><strong>CATEGORY</strong><Link href="/하이퍼블릭">하이퍼블릭</Link><Link href="/셔츠룸">셔츠룸</Link><Link href="/쩜오">쩜오</Link><Link href="/가라오케">가라오케</Link></div>
          <div><strong>EXPLORE</strong><Link href="/텐카페">텐카페</Link><Link href="/텐프로">텐프로</Link><Link href="/일프로">일프로</Link><Link href="/블로그">블로그</Link></div>
          <div><strong>LEGAL</strong><Link href="/회사소개">회사소개</Link><Link href="/개인정보처리방침">개인정보처리방침</Link><Link href="/이용약관">이용약관</Link><Link href="/법적고지사항">법적고지</Link></div>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© 2026 GANGNAM NIGHT GUIDE. ALL RIGHTS RESERVED.</p>
        <p>운영시간과 비용은 변동될 수 있으므로 방문 전 해당 사업자의 최신 안내를 확인하세요.</p>
      </div>
    </footer>
  );
}

export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="breadcrumb" aria-label="현재 위치">
      <Link href="/">홈</Link>
      {items.map((item) => (
        <span key={`${item.label}-${item.href ?? "current"}`}>
          <i className="ph ph-caret-right" aria-hidden="true" />
          {item.href ? <Link href={item.href}>{item.label}</Link> : <strong>{item.label}</strong>}
        </span>
      ))}
    </nav>
  );
}

export function CategoryImageCard({ category, index }: { category: Category; index: number }) {
  return (
    <Link className="category-image-card" href={`/${category.slug}`}>
      <img src={category.image} alt={`${category.name} 안내 카드의 아이돌풍 드레스를 입은 20대 성인 여성 모델`} width="1600" height="1000" loading={index < 2 ? "eager" : "lazy"} />
      <span className="category-image-overlay" aria-hidden="true" />
      <span className="category-card-number">0{index + 1}</span>
      <div className="category-image-content">
        <p>{category.eyebrow}</p>
        <h3>{category.name}</h3>
        <span>{category.description}</span>
        <strong>업종 정보 보기 <i className="ph ph-arrow-up-right" aria-hidden="true" /></strong>
      </div>
    </Link>
  );
}

export function VenueCard({ venue, category, index }: { venue: Venue; category: Category; index: number }) {
  return (
    <article className="people-venue-card">
      <Link className="people-venue-media" href={`/${category.slug}/${venue.slug}`}>
        <img src={venue.image} alt={`${venue.name} 안내 카드의 글래머러스한 20대 성인 여성 모델`} width="1600" height="1000" loading={index < 2 ? "eager" : "lazy"} />
        <span className="people-venue-overlay" aria-hidden="true" />
        <span className="people-venue-mood">{venue.mood}</span>
        <span className="people-venue-number">0{index + 1}</span>
      </Link>
      <div className="people-venue-body">
        <p>{category.shortName}</p>
        <h3><Link href={`/${category.slug}/${venue.slug}`}>강남 {venue.name}</Link></h3>
        <span>{venue.summary}</span>
        <Link className="card-detail-link" href={`/${category.slug}/${venue.slug}`}>확인사항 보기 <i className="ph ph-arrow-right" aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

export function PriceTable({ categoryName }: { categoryName?: string }) {
  return (
    <div className="price-panel inner-price-panel">
      <div className="table-scroll">
        <table>
          <caption>{categoryName ? `${categoryName} 예약 전 비용 용어 확인표` : "강남 룸 예약 전 비용 용어 확인표"}</caption>
          <thead><tr><th scope="col">용어</th><th scope="col">일반적인 의미</th><th scope="col">확인 기준</th><th scope="col">문의 문장</th></tr></thead>
          <tbody>
            {priceRows.map((row) => (
              <tr key={row.term}>
                <th scope="row">{row.term}</th>
                <td><strong>{row.meaning}</strong></td>
                <td>{row.check}</td>
                <td>{row.question}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <aside className="price-note">
        <div className="note-icon"><i className="ph ph-warning-circle" aria-hidden="true" /></div>
        <div><strong>약어보다 산정 기준을 확인하세요.</strong><p>같은 용어도 사업장마다 포함 범위와 계산 단위가 다를 수 있습니다. 날짜·시간·인원을 전달하고 필수 항목을 포함한 예상 총액을 요청하세요.</p></div>
      </aside>
    </div>
  );
}

export function FaqBlock({ title = "자주 묻는 질문", faqs = sharedFaqs }: { title?: string; faqs?: readonly FaqItem[] }) {
  return (
    <section className="inner-faq section" id="faq">
      <div className="shell inner-faq-grid">
        <div className="faq-heading">
          <p className="section-kicker">FREQUENTLY ASKED</p>
          <h2>{title}</h2>
          <p>검색과 예약 과정에서 자주 생기는 궁금증을 실제 확인 순서에 맞춰 정리했습니다.</p>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{String(index + 1).padStart(2, "0")}</span><strong>{question}</strong><i className="ph ph-plus" aria-hidden="true" /></summary>
              <div className="faq-answer"><p>{answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BottomContact() {
  return (
    <section className="section contact-section" id="contact">
      <div className="shell contact-panel page-contact-panel">
        <div className="contact-grid" aria-hidden="true" />
        <div><p className="section-kicker">BEFORE YOU VISIT</p><h2>예약 전에 확인하면<br />현장에서 더 편합니다.</h2></div>
        <div className="contact-copy"><p>날짜·시간·인원과 원하는 룸을 정한 뒤, 포함 항목과 추가 비용을 같은 문장으로 문의해 보세요. 첫 방문 체크리스트에서 순서대로 확인할 수 있습니다.</p><Link className="primary-button" href="/블로그/강남-하이퍼블릭-이용팁">첫 방문 체크리스트 <i className="ph ph-arrow-up-right" aria-hidden="true" /></Link></div>
      </div>
    </section>
  );
}

export function MobileBottomCta() {
  return <Link className="mobile-bottom-cta" href="/블로그/강남-하이퍼블릭-이용팁"><i className="ph ph-list-checks" aria-hidden="true" />첫 방문 체크</Link>;
}
