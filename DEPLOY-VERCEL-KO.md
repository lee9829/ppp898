# Vercel 배포 안내

이 폴더는 Cloudflare 전용 설정을 제거한 표준 Next.js 16 프로젝트입니다.

## 권장 배포 방식: GitHub 연결

1. 이 폴더의 내용 전체를 GitHub 저장소의 최상위 경로에 올립니다.
2. Vercel 대시보드에서 `Add New > Project`를 선택합니다.
3. GitHub 저장소를 Import 합니다.
4. Framework Preset은 `Next.js`, Root Directory는 `./`로 지정합니다.
5. Build Command와 Output Directory는 기본값을 그대로 사용합니다.
6. Deploy를 누릅니다.

Vercel은 다음 명령을 자동으로 실행합니다.

```bash
npm install
npm run build
```

## CLI로 바로 배포

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

## 도메인 연결 전 확인

현재 SEO 기준 도메인은 `https://www.gangnamnight.com`으로 설정되어 있습니다.
다른 도메인을 사용할 경우 아래 파일의 주소를 실제 도메인으로 변경하세요.

- `app/layout.tsx`
- `public/sitemap.xml`
- `public/robots.txt`
- `app/site-data.ts` 내부 구조화 데이터 주소

## 로컬 확인

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.
