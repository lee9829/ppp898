import Link from "next/link";
import { SiteFooter, SiteHeader } from "./site-components";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="not-found-page">
        <div>
          <span>404</span>
          <h1>페이지를 찾을 수 없습니다.</h1>
          <p>주소가 올바른지 확인하거나 메인에서 원하는 업종과 이용 정보를 다시 찾아보세요.</p>
          <Link className="primary-button" href="/">
            메인으로 돌아가기
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
