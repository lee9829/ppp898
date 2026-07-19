"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPost } from "./site-data";

const categoryLabels: Record<string, string> = {
  "FIRST VISIT": "첫 방문",
  "PRICE GUIDE": "가격 용어",
  MANNERS: "안전·에티켓",
  RESERVATION: "예약 실전",
  COMPARISON: "업종 비교",
  "GROUP GUIDE": "단체 모임",
};

export default function BlogExplorer({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const categories = useMemo(() => Array.from(new Set(posts.map((post) => post.category))), [posts]);
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "ALL" || post.category === activeCategory;
    const haystack = `${post.title} ${post.excerpt} ${post.category}`.toLocaleLowerCase("ko-KR");
    return matchesCategory && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  return (
    <div className="blog-explorer">
      <div className="blog-explorer-toolbar">
        <div className="blog-filter-row" role="group" aria-label="블로그 카테고리 필터">
          <button type="button" className={activeCategory === "ALL" ? "is-active" : ""} onClick={() => setActiveCategory("ALL")}>전체 글</button>
          {categories.map((category) => (
            <button type="button" className={activeCategory === category ? "is-active" : ""} onClick={() => setActiveCategory(category)} key={category}>
              {categoryLabels[category] ?? category}
            </button>
          ))}
        </div>
        <label className="blog-search">
          <span className="sr-only">블로그 글 검색</span>
          <i className="ph ph-magnifying-glass" aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="제목과 주제로 검색" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="검색어 지우기"><i className="ph ph-x" aria-hidden="true" /></button>}
        </label>
      </div>

      <div className="blog-result-meta" aria-live="polite">
        <strong>{filteredPosts.length}개의 글</strong>
        <span>예약 전 필요한 정보만 골라 읽어보세요.</span>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="blog-index-grid">
          {filteredPosts.map((post, index) => (
            <article className={index === 0 ? "blog-feature-card" : "blog-list-card"} key={post.slug}>
              <Link href={`/블로그/${post.slug}`}>
                <img src={post.image} alt={`${post.title} 안내 이미지의 20대 성인 여성 모델`} width="1600" height="1000" />
                <span className="people-venue-overlay" aria-hidden="true" />
              </Link>
              <div>
                <p>{categoryLabels[post.category] ?? post.category} · {post.date} · {post.readTime}</p>
                <h2><Link href={`/블로그/${post.slug}`}>{post.title}</Link></h2>
                <span>{post.excerpt}</span>
                <Link className="card-detail-link" href={`/블로그/${post.slug}`}>5,000자 전체 가이드 읽기 <i className="ph ph-arrow-right" aria-hidden="true" /></Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="blog-empty-state">
          <i className="ph ph-magnifying-glass" aria-hidden="true" />
          <h2>검색 결과가 없습니다.</h2>
          <p>다른 검색어를 입력하거나 전체 글을 선택해 주세요.</p>
          <button type="button" onClick={() => { setQuery(""); setActiveCategory("ALL"); }}>전체 글 보기</button>
        </div>
      )}
    </div>
  );
}
