import { imageAssetUrl } from "./site-images";

// Page headings and the copy directly below them also drive server-rendered metadata.
export type HeroCopy = { lead: string; subtitle: string; description: string; metaTitle?: string };

export const homeCopy: HeroCopy = {
  lead: "강남 유흥 가이드,",
  subtitle: "하이퍼블릭부터 쩜오까지 한눈에.",
  description: "다양한 강남 유흥 업종, 어떤 게 있을까요? 하이퍼블릭, 쩜오, 셔츠룸, 가라오케 등 각 업종을 비교하고, 업종별 주대·TC·RT 용어를 안내합니다. 원하는 업종과 방문 일정을 정한 후 전화 한 번으로 예약 상담을 받아보세요.",
};

export const blogIndexCopy = {
  title: "강남 유흥 예약 전 꼭 알아둘 실전 정보",
  description: "강남 유흥 첫 방문 체크리스트부터 주대·TC·RT 뜻, 업종 비교와 단체 모임 준비까지 주제별로 안내합니다. 예약 문의 순서와 음주·결제 에티켓을 확인하고, 내 일정과 인원에 맞는 정보를 찾아보세요.",
};

export const categoryCopy: Record<string, HeroCopy & { cardDescription: string }> = {
  하이퍼블릭: {
    lead: "강남 하이퍼블릭", subtitle: "2026 최신 주대·예약 이용 정보",
    metaTitle: "강남 하이퍼블릭 2026 최신 주대·예약 이용 정보",
    description: "2026년 강남 하이퍼블릭의 다양한 업체 정보와 주대, 이용 방법을 한눈에 확인해 보세요. 업체별 특징과 분위기를 비교하고, 주대·TC·RT 등 기본 요금 구성부터 방문 인원과 시간에 따른 이용 조건까지 안내합니다. 처음 방문하시는 분들을 위한 예약 방법과 방문 전 알아두면 좋은 팁도 정리했으며, 궁금한 사항은 전화로 문의하실 수 있습니다.",
    cardDescription: "강남 하이퍼블릭 업체별 분위기와 룸 구성을 살펴보고, 주대와 예약 조건을 비교해 보세요.",
  },
  셔츠룸: {
    lead: "강남 셔츠룸", subtitle: "2026 최신 주대·예약 이용 정보",
    description: "2026년 강남 셔츠룸의 업체 정보와 주대, 이용 방법을 한눈에 확인해 보세요. 룸 구성과 운영 방식, 주대·TC·RT 등 기본 요금 안내부터 예약 방법, 이용 시간과 주의사항까지 처음 방문하시는 분들도 이해하기 쉽게 정리했습니다. 궁금한 사항은 전화 상담으로 확인해 보세요.",
    cardDescription: "셔츠룸의 운영 방식과 룸 이용 조건을 알아보고, 첫 방문에 필요한 예약 정보를 확인하세요.",
  },
  쩜오: {
    lead: "강남 쩜오", subtitle: "2026 최신 주대·예약 이용 정보",
    description: "2026년 강남 쩜오의 업체 정보와 주대, 이용 방법을 한눈에 확인해 보세요. 업체별 특징과 운영 방식, 주대·TC·RT 등 기본 요금 구성부터 룸 선택 기준까지 안내합니다. 예약 순서와 방문 전 알아두면 좋은 팁을 정리했으니, 원하는 분위기와 일정에 맞는 조건을 전화로 확인해 보세요.",
    cardDescription: "쩜오 업체별 룸과 운영 방식을 비교하고, 주대·시간·인원에 맞는 선택 기준을 살펴보세요.",
  },
  가라오케: {
    lead: "강남 가라오케", subtitle: "2026 최신 주대·예약 이용 정보",
    description: "2026년 강남 가라오케의 업체 정보와 주대, 이용 방법을 한눈에 확인해 보세요. 업체별 분위기와 룸 구성, 주대·TC·RT 등 기본 요금부터 예약 방법과 이용 시간까지 안내합니다. 노래와 대화를 함께 즐길 모임이라면 방문 인원, 음향과 추가 비용을 미리 확인해 보세요.",
    cardDescription: "노래와 대화를 함께 즐길 가라오케를 찾는다면 룸 크기, 음향과 이용 시간을 비교해 보세요.",
  },
  텐카페: {
    lead: "강남 텐카페", subtitle: "2026 최신 주대·예약 이용 정보",
    description: "2026년 강남 텐카페의 업체 정보와 주대, 이용 방법을 한눈에 확인해 보세요. 업체별 분위기와 운영 방식, 주대·TC·RT 등 기본 요금부터 예약 방법과 이용 시간까지 정리했습니다. 첫 방문에 필요한 준비사항과 드레스코드, 룸 선택 기준을 살펴보고 전화로 이용 조건을 문의하세요.",
    cardDescription: "텐카페의 분위기와 업체별 이용 방식을 살펴보고, 주대와 첫 방문 준비사항을 확인하세요.",
  },
  텐프로: {
    lead: "강남 텐프로", subtitle: "2026 최신 주대·예약 이용 정보",
    description: "강남 텐프로는 룸 환경과 접객 운영 방식을 살펴보고 선택하는 업종입니다. 업체마다 룸 구성, 매니저 스타일, 주류 선택, 이용 시간과 주대가 다르므로 방문 목적에 맞는 조건을 비교하는 것이 중요합니다. 업체 정보와 주대 안내, 예약 방법부터 방문 전 확인하면 좋은 팁까지 정리했습니다.",
    cardDescription: "텐프로의 룸 환경과 주류 구성, 접객 운영 방식을 살펴보고 방문 목적에 맞게 비교하세요.",
  },
  일프로: {
    lead: "강남 일프로", subtitle: "2026 최신 주대·예약 이용 정보",
    description: "강남 일프로의 분위기와 룸 구성, 접객 운영 방식을 비교해 보세요. 업체별로 매니저 스타일, 주류 선택, 이용 시간과 주대가 다르므로 방문 목적과 취향에 맞는 조건을 확인하는 것이 중요합니다. 예약 방법과 요금 구성, 방문 전 준비사항까지 이용에 필요한 내용을 정리했습니다.",
    cardDescription: "일프로의 룸과 운영 조건을 살펴보고, 방문 일정과 예산에 맞는 예약 기준을 확인하세요.",
  },
};

export const venueCopy: Record<string, HeroCopy & { filename: string }> = {
  달토: { lead: "강남 달토", subtitle: "주대 안내·예약 및 방문 정보", filename: "dalto",
    description: "강남 달토는 하이퍼블릭을 찾는 분들을 위한 업체입니다. 달토의 룸 구성, 주대와 추가 비용, 이용 시간, 예약 방법과 방문 전 확인사항을 한눈에 정리했습니다. 처음 방문하신다면 인원에 맞는 룸과 기본 이용 시간을 먼저 살펴보고, 주류 구성과 연장 기준까지 전화로 확인해 보세요." },
  퍼펙트: { lead: "강남 퍼펙트", subtitle: "주대 안내·예약 및 방문 정보", filename: "perfect",
    description: "강남 퍼펙트 하이퍼블릭의 룸 구성과 주대 안내, 추가 비용, 이용 시간과 예약 방법을 확인하세요. 첫 문의에 날짜와 인원, 원하는 분위기를 함께 전달하면 가능한 구성을 비교하기 편합니다. 방문 전 알아두면 좋은 변경 조건과 결제 확인사항도 정리했습니다." },
  엘리트: { lead: "강남 엘리트", subtitle: "하이퍼블릭 예약·이용 정보", filename: "elite",
    description: "강남 엘리트 하이퍼블릭의 공간 선택과 이용 조건을 안내합니다. 모임 인원에 맞는 룸 구성, 주대와 추가 비용, 이용 시간과 예약 방법을 살펴보세요. 대화 중심인지 회식 중심인지에 따라 확인할 분위기와 동선이 달라지므로, 방문 목적을 정한 뒤 전화로 세부 조건을 문의하시면 편리합니다." },
  유앤미: { lead: "강남 유앤미", subtitle: "하이퍼블릭 예약·이용 정보", filename: "you-and-me",
    description: "강남 유앤미 하이퍼블릭의 룸 구성과 주대 안내, 이용 시간과 예약 절차를 정리했습니다. 일행의 합류 시간이 다르거나 소규모 모임을 계획한다면 인원 산정과 기본 시간 기준을 함께 확인하세요. 처음 방문할 때 필요한 준비사항과 추가 주문, 결제 방법까지 차례로 살펴볼 수 있습니다." },
  도파민: { lead: "강남 도파민", subtitle: "하이퍼블릭 예약·이용 정보", filename: "dopamine",
    description: "강남 도파민 하이퍼블릭의 운영 방식과 예약 전 확인할 내용을 안내합니다. 희망 시간대의 입실 가능 여부부터 룸 구성, 주대와 추가 비용, 예약 변경 기준까지 정리했습니다. 주말이나 늦은 시간에 방문할 계획이라면 대기 여부와 연장 조건을 전화로 먼저 확인해 보세요." },
  씨엔엔: { lead: "강남 씨엔엔", subtitle: "셔츠룸 예약·이용 정보", filename: "cnn",
    description: "강남 씨엔엔 셔츠룸의 운영 방식과 룸 구성, 주대 안내와 이용 시간을 확인하세요. 처음 방문하는 분들이 문의하기 쉽도록 예약 순서와 기본 이용 조건을 정리했습니다. 포함 서비스와 별도 비용, 사업장 이용 규정을 함께 살펴보고 방문 전에 전화로 필요한 내용을 확인해 보세요." },
  하이킥: { lead: "강남 하이킥", subtitle: "셔츠룸 예약·이용 정보", filename: "highkick",
    description: "강남 하이킥 셔츠룸을 알아보는 분들을 위해 룸 구성, 주대와 추가 비용, 예약 방법을 안내합니다. 이용 시간과 연장 단위, 일정이 바뀔 때의 기준을 미리 확인하면 방문 준비가 수월합니다. 첫 방문에 필요한 운영 규정과 비용 확인 순서를 함께 정리했습니다." },
  구구단: { lead: "강남 구구단", subtitle: "쩜오 예약·이용 정보", filename: "gugudan",
    description: "강남 구구단 쩜오의 룸 구성과 주대, 이용 시간, 예약 방법을 살펴보세요. 원하는 날짜와 인원을 기준으로 기본 구성에 포함되는 항목과 별도 비용을 나눠 확인할 수 있도록 정리했습니다. 첫 방문 전 알아두면 좋은 룸 선택 기준과 예약 확정 절차도 함께 안내합니다." },
  어나더: { lead: "강남 어나더", subtitle: "쩜오 예약·이용 정보", filename: "another",
    description: "강남 어나더 쩜오의 분위기와 룸 이용 조건, 주대 안내와 예약 방법을 확인하세요. 방문 목적에 맞는 공간을 고르기 위해 좌석과 이용 시간, 주류 구성과 추가 비용을 비교하는 순서를 정리했습니다. 처음 이용하신다면 입실 가능 시간과 변경 조건을 전화로 확인해 보세요." },
  인트로: { lead: "강남 인트로", subtitle: "쩜오 예약·이용 정보", filename: "intro",
    description: "강남 인트로 쩜오의 룸 구성, 주대와 이용 시간, 예약에 필요한 정보를 안내합니다. 모임 목적과 예산에 맞는 조건을 살펴볼 수 있도록 포함 항목과 선택 항목, 방문 전 질문을 구분했습니다. 도착 시각과 인원이 정해졌다면 전화로 가능한 룸과 예상 비용을 문의해 보세요." },
  세이렌: { lead: "강남 세이렌", subtitle: "쩜오 예약·이용 정보", filename: "siren",
    description: "강남 세이렌 쩜오의 공간과 운영 조건을 비교하고 주대, 예약 방법과 이용 시간을 확인하세요. 대화와 모임 분위기 중 무엇을 우선할지 정한 뒤 룸과 시간별 요금 구성을 살펴보면 선택이 쉬워집니다. 방문 전 알아둘 준비사항과 예약 내용 확인 순서를 함께 정리했습니다." },
  타이밍: { lead: "강남 타이밍", subtitle: "쩜오 예약·이용 정보", filename: "timing",
    description: "강남 타이밍 쩜오의 룸 구성과 주대, 이용 시간, 예약 방법을 한눈에 살펴보세요. 도착 시간에 맞는 입실 조건과 기본 이용 시간, 연장 시 적용되는 비용을 확인할 수 있도록 정리했습니다. 일정이나 인원이 달라질 가능성이 있다면 변경 기준까지 전화로 문의해 보세요." },
  유니크: { lead: "강남 유니크", subtitle: "텐카페 예약·이용 정보", filename: "unique",
    description: "강남 유니크 텐카페의 분위기와 운영 방식, 주대 안내와 이용 시간을 정리했습니다. 첫 방문에 필요한 예약 방법, 준비사항과 드레스코드, 주차 확인 항목을 살펴보세요. 방문 날짜와 인원에 따라 이용 조건이 달라질 수 있으니 전화로 룸 구성과 예상 비용을 미리 확인하세요." },
  베이직: { lead: "강남 베이직", subtitle: "텐카페 예약·이용 정보", filename: "basic",
    description: "강남 베이직 텐카페의 기본 이용 절차와 주대, 예약 방법을 안내합니다. 처음 방문할 때 궁금한 이용 시간과 드레스코드, 룸 선택 기준과 시설 확인사항을 한눈에 정리했습니다. 부담 없이 방문을 준비할 수 있도록 기본 구성과 추가 비용을 나눠 확인하는 방법도 살펴보세요." },
  화이트: { lead: "강남 화이트", subtitle: "텐카페 예약·이용 정보", filename: "white",
    description: "강남 화이트 텐카페의 분위기와 룸 구성, 주대와 예약 방법을 확인하세요. 차분한 모임을 계획하는 분들을 위해 시간대별 이용 조건과 방문 전 준비사항, 드레스코드 확인 항목을 정리했습니다. 첫 방문이라면 원하는 인원과 시간을 전달하고 입실 및 추가 비용 기준을 전화로 문의해 보세요." },
};

export const imageDescriptions: Record<string, string> = {
  "dalto": "아이보리·블루·라일락 드레스 차림의 성인 여성 모델 세 명",
  "perfect": "코럴색 원숄더 드레스를 입고 앉아 있는 성인 여성 모델",
  "elite": "서로 다른 파스텔 드레스를 입은 성인 여성 모델 네 명",
  "you-and-me": "아이보리 재킷을 입은 긴 머리의 성인 여성 모델",
  "dopamine": "분홍색 재킷과 하늘색 드레스 차림의 성인 여성 모델 두 명",
  "cnn": "샴페인색 원숄더 드레스를 입은 단발머리 성인 여성 모델",
  "highkick": "루비색과 남색 드레스를 입은 성인 여성 모델 두 명",
  "gugudan": "버건디색 긴소매 드레스를 입은 성인 여성 모델",
  "another": "검은색 시퀸 드레스를 입은 긴 머리의 성인 여성 모델",
  "intro": "하늘색 긴소매 드레스를 입고 앉아 있는 성인 여성 모델",
  "siren": "에메랄드색 드레스와 샴페인색 정장 차림의 성인 여성 모델 두 명",
  "timing": "파란색 원숄더 드레스와 올림머리의 성인 여성 모델",
  "unique": "장밋빛 드레스를 입은 긴 검은 머리의 성인 여성 모델",
  "basic": "라일락 드레스를 입은 중간 길이 머리의 성인 여성 모델",
  "white": "아이보리 정장을 입고 앉아 있는 성인 여성 모델",
};

export function venueImage(slug: string) {
  return imageAssetUrl(`/assets/gangnam-${venueCopy[slug].filename}-hero.webp`);
}

const legacyImageDescriptions: Record<string, string> = {
  "/assets/idol-hero-bright.webp": imageDescriptions.dalto,
  "/assets/idol-group-luminous.webp": imageDescriptions.elite,
  "/assets/idol-ivory-suit.webp": imageDescriptions["you-and-me"],
  "/assets/idol-coral-lounge.webp": imageDescriptions.perfect,
  "/assets/idol-duo-pastel.webp": imageDescriptions.dopamine,
  "/assets/idol-lilac-dress.webp": imageDescriptions.basic,
};

export function imageAlt(image: string, context: string) {
  const imagePath = image.split("?", 1)[0];
  const match = Object.values(venueCopy).find((copy) => imagePath === `/assets/gangnam-${copy.filename}-hero.webp`);
  const content = match ? imageDescriptions[match.filename] : legacyImageDescriptions[imagePath];
  return `${context} 콘셉트 이미지: ${content ?? "이브닝드레스 차림의 성인 여성 모델"}`;
}
