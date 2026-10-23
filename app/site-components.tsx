/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { countSeoCharacters, type SeoChapter } from "./seo-content";
import { categories, imageSet, priceRows, sharedFaqs, venueDirectory, type Category, type FaqItem, type Venue } from "./site-data";
import { imageAlt } from "./site-copy";
import { phoneHref, phoneNumber } from "./site-config";

export function PhoneReservationButton({ label = "전화 예약 상담", className = "" }: { label?: string; className?: string }) {
  return <a className={`primary-button phone-cta ${className}`} href={phoneHref} aria-label={`${label} ${phoneNumber}`}>
    <svg className="phone-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" /></svg>
    <span>{label}</span><i className="ph ph-arrow-up-right" aria-hidden="true" />
  </a>;
}

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
            <PhoneReservationButton label="예약문의" className="header-cta" />
          </div>

          <details className="mobile-menu">
            <summary aria-label="모바일 메뉴 열기"><i className="ph ph-list" aria-hidden="true" /></summary>
            <nav aria-label="모바일 메뉴">
              <Link href="/">메인 홈</Link>
              {categories.map((category) => <Link href={`/${category.slug}`} key={category.slug}>{category.name}</Link>)}
              <Link href="/블로그">블로그</Link>
              <PhoneReservationButton label="예약문의" className="mobile-contact" />
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
          <p>강남 유흥 업종 비교부터 업체 정보, 이용 방법과 주대 안내, 전화 예약 상담까지 한곳에서 확인할 수 있는 강남 유흥 정보 가이드입니다.</p>
          <div className="footer-services"><span>업종 비교</span><a href={phoneHref}>전화 예약문의</a><span>친절한 안내</span></div>
        </div>
        <div className="footer-links">
          <div><strong>CATEGORY</strong>{categories.map((category) => <Link href={`/${category.slug}`} key={category.slug}>{category.name}</Link>)}</div>
          <div><strong>EXPLORE</strong><Link href="/#category-pages">업종별 비교</Link><Link href="/#popular-venues">업체 정보 BEST 6</Link><Link href="/#how-to-use">이용 방법</Link><Link href="/#price">가격·예약 정보</Link><Link href="/#faq">자주 묻는 질문</Link><Link href="/블로그">블로그</Link></div>
          <div><strong>LEGAL</strong><Link href="/회사소개">회사소개</Link><Link href="/이용약관">이용약관</Link><Link href="/개인정보처리방침">개인정보처리방침</Link><Link href="/#how-to-use">이용안내</Link><Link href="/법적고지사항">법적고지</Link></div>
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
      <img src={category.image} alt={imageAlt(category.image, `${category.name} 업종 비교`)} width="1600" height="1000" loading="lazy" />
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
        <img src={venue.image} alt={imageAlt(venue.image, `강남 ${venue.name} ${category.shortName} 업체 안내`)} width="1600" height="1000" loading="lazy" />
        <span className="people-venue-overlay" aria-hidden="true" />
        <span className="people-venue-mood">{venue.mood}</span>
        <span className="people-venue-number">0{index + 1}</span>
      </Link>
      <div className="people-venue-body">
        <p>{category.shortName}</p>
        <h3><Link href={`/${category.slug}/${venue.slug}`}>강남 {venue.name}</Link></h3>
        <span>{venue.summary}</span>
        <Link className="card-detail-link" href={`/${category.slug}/${venue.slug}`}>자세히 보기 <i className="ph ph-arrow-right" aria-hidden="true" /></Link>
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
          <p>강남 유흥 예약 과정에서 자주 궁금해하시는 내용을 모았습니다. 아래에서 원하는 내용을 확인해 보세요.</p>
          <div className="faq-help"><strong>더 궁금한 점이 있으신가요?</strong><p>아래 내용에 없는 문의사항은 전화로 편하게 상담해 주세요.</p><PhoneReservationButton label="전화로 문의하기" /></div>
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

export function OtherVenues({ categorySlug, venueSlug }: { categorySlug?: string; venueSlug?: string }) {
  const eligible = venueDirectory.filter((venue) => !(venue.category.slug === categorySlug && venue.slug === venueSlug));
  const selected: typeof venueDirectory = [];
  const add = (venue: (typeof venueDirectory)[number] | undefined) => {
    if (venue && !selected.some((item) => item.slug === venue.slug && item.category.slug === venue.category.slug)) selected.push(venue);
  };
  add(eligible.find((venue) => venue.category.slug === categorySlug));
  for (const category of categories.filter((item) => item.slug !== categorySlug)) add(eligible.find((venue) => venue.category.slug === category.slug));
  for (const venue of eligible) { if (selected.length >= 6) break; add(venue); }
  return <section className="section related-venues-section" id="browse-other-venues"><div className="shell">
    <div className="section-heading split-heading"><div><p className="section-kicker">EXPLORE MORE</p><h2>다른 업체도 둘러보세요</h2></div><p>원하는 조건에 맞춰 다른 업종과 업체도 둘러보고, 비교한 후 선택하세요.</p></div>
    <div className="people-venue-grid">{selected.map((venue, index) => <VenueCard venue={venue} category={venue.category} index={index} key={`${venue.category.slug}-${venue.slug}`} />)}</div>
  </div></section>;
}

export function BottomContact({ label = "쉽고 빠른 전화 문의" }: { label?: string }) {
  return (
    <section className="section contact-section" id="contact">
      <div className="shell contact-panel page-contact-panel">
        <div className="contact-grid" aria-hidden="true" />
        <img className="contact-editorial-image" src={imageSet.classicBlack} alt="" width="1600" height="1000" loading="lazy" />
        <div><p className="section-kicker">CONTACT US</p><h2>지금 바로<br /><em>전화 상담</em>하세요.</h2></div>
        <div className="contact-copy"><p>원하는 업종과 방문 일정, 인원과 예산을 말씀해 주세요. 업체별 이용 조건과 예약 가능 여부를 상담하고, 주대와 추가 비용도 함께 확인해 보세요.</p><PhoneReservationButton label={label} /><a className="contact-number" href={phoneHref}>{phoneNumber}</a></div>
      </div>
    </section>
  );
}

export function MobileBottomCta({ label = "전화 예약문의" }: { label?: string }) {
  return <PhoneReservationButton label={label} className="mobile-bottom-cta" />;
}

export function SeoLongform({
  title,
  description,
  chapters,
  id = "complete-guide",
}: {
  title: string;
  description: string;
  chapters: SeoChapter[];
  id?: string;
}) {
  const characterCount = countSeoCharacters(chapters);
  const readingMinutes = Math.max(10, Math.ceil(characterCount / 500));

  return (
    <section className="section seo-longform" id={id}>
      <div className="shell">
        <header className="seo-longform-heading">
          <div>
            <p className="section-kicker">COMPLETE GUIDE</p>
            <h2>{title}</h2>
          </div>
          <div className="seo-longform-summary">
            <p>{description}</p>
            <span><i className="ph ph-book-open-text" aria-hidden="true" /> 완전 가이드 · 약 {readingMinutes}분 읽기</span>
          </div>
        </header>

        <nav className="seo-toc" aria-label={`${title} 목차`}>
          <strong>이 페이지에서 확인할 내용</strong>
          <ol>
            {chapters.map((chapter, index) => (
              <li key={chapter.id}>
                <a href={`#${chapter.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{chapter.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="seo-chapter-list">
          {chapters.map((chapter) => (
            <article className="seo-chapter" id={chapter.id} key={chapter.id}>
              <header>
                <p>{chapter.kicker}</p>
                <h2>{chapter.title}</h2>
                <div className="seo-chapter-intro">{chapter.intro}</div>
              </header>
              <div className="seo-subsection-grid">
                {chapter.subsections.map((subsection) => (
                  <section className="seo-subsection" key={subsection.title}>
                    <h3>{subsection.title}</h3>
                    {subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    {subsection.bullets && (
                      <ul>
                        {subsection.bullets.map((bullet) => <li key={bullet}><i className="ph ph-check" aria-hidden="true" />{bullet}</li>)}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
