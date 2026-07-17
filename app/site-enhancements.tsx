"use client";

import { useEffect } from "react";

export default function SiteEnhancements() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const form = document.querySelector<HTMLFormElement>(".quick-search");
    const input = document.querySelector<HTMLInputElement>("#site-search");
    const cards = [
      ...document.querySelectorAll<HTMLElement>(".category-image-card"),
      ...document.querySelectorAll<HTMLElement>(".people-venue-card"),
    ];

    if (form && input && cards.length) {
      const status = document.createElement("p");
      status.className = "search-status";
      status.setAttribute("role", "status");
      status.setAttribute("aria-live", "polite");
      form.insertAdjacentElement("afterend", status);

      const handleSubmit = (event: SubmitEvent) => {
        event.preventDefault();
        const query = input.value.trim().toLocaleLowerCase("ko-KR");
        let matches = 0;

        cards.forEach((card) => {
          const matched = !query || card.textContent.toLocaleLowerCase("ko-KR").includes(query);
          card.hidden = !matched;
          if (matched) matches += 1;
        });

        status.textContent = query
          ? `‘${input.value.trim()}’ 검색 결과 ${matches}개`
          : "전체 업종과 업소를 표시합니다.";
        document.querySelector("#category-pages")?.scrollIntoView({ behavior: "smooth" });
      };

      form.addEventListener("submit", handleSubmit);
      cleanups.push(() => {
        form.removeEventListener("submit", handleSubmit);
        status.remove();
      });
    }

    document.querySelectorAll<HTMLDetailsElement>(".faq-list details").forEach((item) => {
      const handleToggle = () => {
        if (!item.open) return;
        document.querySelectorAll<HTMLDetailsElement>(".faq-list details").forEach((other) => {
          if (other !== item) other.open = false;
        });
      };
      item.addEventListener("toggle", handleToggle);
      cleanups.push(() => item.removeEventListener("toggle", handleToggle));
    });

    const mobileMenu = document.querySelector<HTMLDetailsElement>(".mobile-menu");
    mobileMenu?.querySelectorAll("a").forEach((link) => {
      const closeMenu = () => mobileMenu.removeAttribute("open");
      link.addEventListener("click", closeMenu);
      cleanups.push(() => link.removeEventListener("click", closeMenu));
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
