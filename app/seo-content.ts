import type { BlogPost, Category, LegalPage, Venue } from "./site-data";

export type SeoSubsection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoChapter = {
  id: string;
  kicker: string;
  title: string;
  intro: string;
  subsections: SeoSubsection[];
};

type GuideContext = {
  subject: string;
  primaryKeyword: string;
  description: string;
  definition: string;
  audience: string;
  comparisonTip: string;
  focusItems: string[];
  questions: string[];
  pageKind: "home" | "category" | "venue" | "blog" | "legal";
};

const compact = (value: string) => value.replace(/\s+/g, " ").trim();

function itemAt(items: string[], index: number, fallback: string) {
  return items[index % Math.max(items.length, 1)] ?? fallback;
}

function buildGuideChapters(context: GuideContext): SeoChapter[] {
  const focusA = itemAt(context.focusItems, 0, "이용 목적");
  const focusB = itemAt(context.focusItems, 1, "시간과 인원");
  const focusC = itemAt(context.focusItems, 2, "비용과 예약 조건");
  const questionA = itemAt(context.questions, 0, "방문 조건을 어떻게 확인하나요?");
  const questionB = itemAt(context.questions, 1, "포함 항목과 별도 비용은 무엇인가요?");
  const questionC = itemAt(context.questions, 2, "변경이 생기면 어떤 기준이 적용되나요?");
  const editorialLabel = context.pageKind === "legal" ? "안내 범위" : "검색 의도";

  return [
    {
      id: "seo-intent",
      kicker: "01 · SEARCH INTENT",
      title: `${context.primaryKeyword}, 검색 전에 먼저 이해할 기준`,
      intro: `${context.subject} 정보를 찾을 때는 눈에 띄는 한 문장보다 검색 목적을 분명히 하는 것이 먼저입니다. 이 페이지는 ${context.description}이라는 질문을 실제 선택 순서에 맞춰 풀어냅니다.`,
      subsections: [
        {
          title: `${editorialLabel}와 핵심 용어를 구분하는 법`,
          paragraphs: [
            compact(`${context.definition} 따라서 ${context.primaryKeyword}를 검색했다고 해서 모든 장소나 안내가 같은 의미를 갖는 것은 아닙니다. 업종명, 상호, 홍보 문구는 탐색을 시작하는 표지에 가깝고, 실제 판단은 상호와 위치, 이용 시간, 제공 범위, 비용 산정 기준처럼 확인 가능한 항목을 중심으로 이뤄져야 합니다.`),
            compact(`${context.subject} 관련 결과를 읽을 때는 ‘무엇을 제공한다’는 표현과 ‘어떤 조건에서 이용할 수 있다’는 설명을 나눠 보세요. 전자는 분위기를 전달할 수 있지만 후자가 없으면 비교가 어렵습니다. 날짜, 성인 인원, 기본 시간, 포함 항목과 변경 기준이 구체적으로 적혀 있을수록 내 상황에 맞는 정보인지 판단하기 쉬워집니다.`),
          ],
        },
        {
          title: `${context.subject} 페이지를 효율적으로 읽는 순서`,
          paragraphs: [
            compact(`처음에는 정의와 대상 독자를 읽고, 다음으로 ${focusA}, ${focusB}, ${focusC} 순서로 조건을 좁히는 방식이 효율적입니다. 비용표부터 보면 저렴해 보이는 숫자에 시선이 고정될 수 있으므로, 먼저 필요한 공간과 이용 시간을 정한 뒤 같은 조건의 예상 총액을 비교하는 편이 더 정확합니다.`),
            compact(`이 페이지의 H2 제목은 큰 의사결정 단계를, H3 제목은 실제로 확인할 질문을 뜻합니다. 처음 방문한다면 위에서 아래로 읽고, 이미 일정이 정해졌다면 예약·비용·당일 확인 섹션을 우선 보세요. 필요한 문장은 메모해 두었다가 문의할 때 그대로 활용하면 누락을 줄일 수 있습니다.`),
          ],
          bullets: [focusA, focusB, focusC, "공식 안내와 최신 정보 재확인"],
        },
      ],
    },
    {
      id: "seo-fit",
      kicker: "02 · PURPOSE & FIT",
      title: `${context.subject}이 내 모임과 맞는지 판단하는 방법`,
      intro: `${context.audience} 다만 같은 업종이나 상호도 모임 목적과 인원에 따라 체감이 달라질 수 있어, 방문 이유를 한 문장으로 정리하는 과정이 필요합니다.`,
      subsections: [
        {
          title: "대화·회식·친목 중 우선순위 정하기",
          paragraphs: [
            compact(`대화가 중요한 자리라면 음향 크기와 좌석 간격, 룸의 독립성을 우선해야 합니다. 친목이나 회식 분위기가 중요하다면 이동 동선, 인원 수용 범위와 기본 이용 시간을 함께 보세요. ‘좋은 곳’이라는 추상적인 요청보다 ‘성인 네 명이 조용히 대화할 수 있는 룸’처럼 목적과 인원을 포함한 문장이 훨씬 유용합니다.`),
            compact(`${context.subject} 선택에서 자주 놓치는 부분은 참석자의 도착 시간이 다를 때 생기는 변화입니다. 일부가 늦게 합류하거나 먼저 귀가하면 입실 기준과 이용 시간, 인원 산정 방식이 달라질 수 있습니다. 예약 단계에서 합류 계획을 알리고 룸 변경 또는 추가 비용 가능성을 확인해 두면 당일 혼선을 줄일 수 있습니다.`),
          ],
        },
        {
          title: "첫 방문과 재방문의 확인 항목은 다르게",
          paragraphs: [
            compact(`첫 방문자는 상호와 주소, 공식 연락 채널, 영업 여부를 기초부터 확인해야 합니다. 재방문자라도 이전 방문의 가격과 운영 방식이 그대로 유지된다고 단정해서는 안 됩니다. 요일, 시간대, 인원, 선택한 주류와 룸에 따라 조건이 달라질 수 있으므로 방문 날짜를 기준으로 새 안내를 요청하는 것이 안전합니다.`),
            compact(`동행이 있다면 한 사람만 조건을 알고 있는 상황을 피하세요. 확정된 시간, 위치, 예약자명, 예상 비용 범위와 귀가 계획을 일행에게 공유하면 현장에서 서로 다른 기대가 생기는 일을 줄일 수 있습니다. 특히 예산 상한과 추가 주문 결정 방식은 이용 전 합의해 두는 것이 좋습니다.`),
          ],
          bullets: ["모임 목적 한 문장으로 정리", "실제 참석 성인 인원 확인", "합류·귀가 시간 공유", "일행과 예산 상한 합의"],
        },
      ],
    },
    {
      id: "seo-space",
      kicker: "03 · SPACE & TIME",
      title: `${context.subject} 공간과 이용 시간을 비교하는 기준`,
      intro: `사진은 분위기를 이해하는 참고 자료지만 실제 룸 크기와 좌석 배치, 소음, 이동 동선까지 보증하지는 않습니다. 공간과 시간은 반드시 내 인원과 일정에 맞춰 질문해야 합니다.`,
      subsections: [
        {
          title: `${focusA}에 맞는 룸을 묻는 구체적인 표현`,
          paragraphs: [
            compact(`룸을 문의할 때는 ‘큰 방이 있나요’보다 참석 인원, 대화 중심 여부, 필요한 좌석 여유를 함께 말하는 편이 좋습니다. 최소 이용 조건이나 특정 룸의 추가 비용이 있는지, 인원이 줄거나 늘면 배정이 바뀌는지도 물어보세요. 이미지 속 공간과 실제 배정 룸이 다를 수 있으므로 룸 이름이나 등급보다 적용 조건을 확인해야 합니다.`),
            compact(`조도와 음향은 분위기를 좌우하지만 사람마다 선호가 다릅니다. 조용한 대화가 가능한지, 노래나 음악 사용 시 다른 좌석의 대화에 영향을 주는지, 외부 소음이 얼마나 들리는지를 질문하면 목적에 맞는 선택이 쉬워집니다. 주차, 화장실, 출입구와 대기 공간도 단체 모임에서는 중요한 동선 요소입니다.`),
          ],
        },
        {
          title: `${focusB}와 기본 이용 시간 확인`,
          paragraphs: [
            compact(`기본 이용 시간은 단순히 ‘몇 시간’인지뿐 아니라 언제부터 계산되는지를 확인해야 합니다. 예약 시각, 실제 입실 시각, 일행이 모두 도착한 시각 중 어떤 기준을 쓰는지에 따라 체감이 달라집니다. 현장 대기가 발생했을 때 이용 시간이 차감되는지, 지각 시 룸 보유 시간이 어떻게 되는지도 미리 물어보세요.`),
            compact(`연장은 가능한 시간 단위와 요청 시점, 추가 금액을 함께 확인합니다. 종료 직전에 급하게 결정하면 비용 설명을 충분히 듣기 어려울 수 있으므로, 이용 중간에 남은 시간을 안내받을 수 있는지 묻는 것도 방법입니다. 다음 일정이나 막차, 대리운전 시간을 고려해 종료 목표 시각을 미리 정해두면 과음과 불필요한 연장을 줄일 수 있습니다.`),
          ],
          bullets: ["기본 시간의 시작 기준", "연장 단위와 요청 시점", "대기·지각 시 적용 방식", "주차·출입구·귀가 동선"],
        },
      ],
    },
    {
      id: "seo-price",
      kicker: "04 · PRICE TERMS",
      title: `${context.primaryKeyword} 비용을 예상 총액으로 확인하는 법`,
      intro: `온라인의 시작 금액이나 단일 숫자는 내 예약 조건과 다를 수 있습니다. 주대, TC, RT, 봉사료, 연장과 추가 주문처럼 항목별 기준을 나눈 뒤 다시 합치는 방식으로 확인하세요.`,
      subsections: [
        {
          title: "주대·TC·RT를 항목별로 질문하기",
          paragraphs: [
            compact(`주대는 일반적으로 주류와 기본 테이블 구성에 관한 비용을 뜻하지만 포함 브랜드, 수량, 안주와 음료 여부는 사업장마다 다를 수 있습니다. TC는 인원과 시간에 따른 서비스 비용으로, RT는 룸 이용과 관련된 비용으로 쓰이는 경우가 많습니다. 약어의 사전적 의미보다 내 예약에 몇 명·몇 분 단위로 적용되는지를 확인하는 것이 중요합니다.`),
            compact(`‘전부 포함’이라는 안내를 받더라도 무엇이 포함됐는지 항목으로 다시 적어 달라고 요청하세요. 세금이나 봉사료, 룸 변경, 시간 연장, 주류 업그레이드, 인원 추가가 별도인지 확인하면 결제 단계에서 예상하지 못한 차이를 줄일 수 있습니다. 선택 항목은 필수 항목과 분리해 안내받는 편이 비교에 유리합니다.`),
          ],
        },
        {
          title: `${questionB}`,
          paragraphs: [
            compact(`예상 총액을 물을 때는 ‘방문 날짜와 도착 시각, 성인 인원, 기본 이용 시간 기준으로 필수 비용을 모두 포함한 범위를 알려 달라’고 요청하세요. 특정 금액을 확정적으로 보장받기 어렵더라도 계산 기준과 변동 가능 항목을 알면 예산을 세울 수 있습니다. 두 곳 이상을 비교한다면 날짜·인원·시간·주류 조건을 동일하게 맞춰야 합니다.`),
            compact(`결제 전에는 처음 받은 안내와 실제 이용 내역을 나란히 확인합니다. 추가 주문이나 연장이 있었다면 누가 언제 요청했는지 일행과 함께 확인하고, 설명이 필요한 항목은 결제 전에 질문하세요. 가능한 결제 수단과 영수증 또는 거래 내역 제공 여부도 예약 단계에서 확인하면 정산이 한결 수월합니다.`),
          ],
          bullets: ["기본 주류 종류와 수량", "TC의 인원·시간 기준", "RT와 룸 변경 조건", "봉사료·세금·연장 포함 여부", "결제 수단과 증빙"],
        },
      ],
    },
    {
      id: "seo-reservation",
      kicker: "05 · RESERVATION",
      title: `${context.subject} 문의부터 예약 확정까지의 순서`,
      intro: `좋은 예약 메시지는 길기보다 빠짐이 없습니다. 날짜, 도착 시각, 성인 인원, 모임 목적과 확인하고 싶은 조건을 한 번에 전달하고 답변은 다시 볼 수 있는 형태로 남기세요.`,
      subsections: [
        {
          title: `${questionA}`,
          paragraphs: [
            compact(`검색 결과에 나온 연락처가 실제 사업장의 공식 안내 채널인지 확인하는 것이 첫 단계입니다. 안내받은 상호, 주소, 건물명과 연락처가 서로 일치하는지 보고, 비슷한 이름의 다른 장소와 혼동하지 않도록 출발 전에 지도 위치를 다시 확인하세요. 예약자명과 확정 시각, 룸 조건도 메시지로 받아두는 편이 좋습니다.`),
            compact(`문의 문장은 ‘○월 ○일 ○시, 성인 ○명, ${focusA} 중심 모임입니다. 가능한 룸, 기본 이용 시간, 포함 항목과 별도 비용, 변경 기준을 알려주세요’처럼 구성할 수 있습니다. 질문을 여러 번 나누기보다 핵심 조건을 한 메시지에 담으면 답변을 비교하기 쉽고 서로 다른 전제가 생기는 것을 줄일 수 있습니다.`),
          ],
        },
        {
          title: `${questionC}`,
          paragraphs: [
            compact(`일정이나 인원이 바뀌면 기존 예약이 자동으로 같은 조건을 유지한다고 생각하지 마세요. 변경 사실을 가능한 빨리 알리고 룸, 이용 시간, 예상 비용이 어떻게 달라지는지 다시 확인해야 합니다. 취소 가능 시점, 예약금 또는 선결제 여부, 환불 기준이 있다면 확정 전에 안내 문구를 읽어보세요.`),
            compact(`당일에는 출발 전에 예약 채널로 입실 가능 시각과 주소를 재확인합니다. 답변이 늦거나 조건이 처음과 크게 다르다면 이동을 서두르기보다 차이를 설명해 달라고 요청하세요. 불분명한 추가 송금이나 과도한 개인정보 제공을 요구받는 경우에는 공식 사업자 정보와 거래 조건을 다시 확인하는 것이 좋습니다.`),
          ],
          bullets: [questionA, questionB, questionC, "예약자명·주소·확정 시각 기록"],
        },
      ],
    },
    {
      id: "seo-visit",
      kicker: "06 · VISIT DAY",
      title: `${context.subject} 방문 당일 확인할 체크포인트`,
      intro: `예약이 끝났다고 확인이 모두 끝난 것은 아닙니다. 영업 상황과 교통, 인원 변동이 생길 수 있으므로 출발 전·입실 전·결제 전의 세 시점에 짧게 재확인하세요.`,
      subsections: [
        {
          title: "출발 전 주소와 귀가 계획 재확인",
          paragraphs: [
            compact(`강남권은 같은 건물 안에서도 출입구가 다르거나 비슷한 상호가 검색될 수 있습니다. 상호, 도로명 주소, 건물명, 층수와 출입구를 확인하고 일행에게 동일한 위치를 공유하세요. 차량을 이용한다면 주차 지원 범위와 만차 시 대안을, 대중교통을 이용한다면 막차 시간과 도보 경로를 미리 살펴보는 것이 좋습니다.`),
            compact(`음주가 예정돼 있다면 운전 계획을 세우지 말고 대중교통, 택시나 대리운전 등 귀가 방법을 먼저 정하세요. 일행과 종료 목표 시각을 공유하고 귀가할 때 서로의 상태를 확인하면 위험을 줄일 수 있습니다. 개인 소지품과 결제 카드는 한곳에 보관하고 낯선 장소에 두지 않는 기본 원칙도 중요합니다.`),
          ],
        },
        {
          title: "입실 전 조건과 결제 전 내역 확인",
          paragraphs: [
            compact(`입실 전에는 예약자명, 룸, 기본 시간, 주류 구성과 예상 비용을 짧게 확인합니다. 처음 안내와 다른 점이 있다면 이용을 시작하기 전에 이유와 적용 기준을 물어보세요. 구두 설명만으로 이해하기 어렵다면 항목을 나눠 다시 설명해 달라고 요청할 수 있습니다.`),
            compact(`이용 종료 전에는 남은 시간, 추가 주문, 연장과 룸 변경 내역을 확인하고 최종 금액을 비교합니다. 일행이 나눠 결제할 계획이면 분할 결제가 가능한지 미리 물어보세요. 결제 후에는 영수증이나 거래 내역을 보관하고, 문제가 생겼을 때는 감정적인 대응보다 확인 가능한 예약 메시지와 결제 자료를 기준으로 문의하는 편이 효과적입니다.`),
          ],
          bullets: ["출발 전 위치 재확인", "입실 전 예약 조건 대조", "이용 중 추가 주문 공유", "결제 전 항목별 내역 확인"],
        },
      ],
    },
    {
      id: "seo-safety",
      kicker: "07 · SAFETY & MANNERS",
      title: `${context.subject}을 안전하게 이용하기 위한 기본 원칙`,
      intro: `성인 대상 공간에서도 법과 사업장 규정, 모든 사람의 의사는 우선되어야 합니다. 서비스 이용은 상대방의 동의를 대신하지 않으며, 과음이나 강요는 누구에게도 정당화될 수 없습니다.`,
      subsections: [
        {
          title: "성인 확인과 상호 존중",
          paragraphs: [
            compact(`성인 출입 기준을 지키고 신분 확인 요청에 협조하세요. 타인의 신분증을 사용하거나 출입 규정을 우회해서는 안 됩니다. 종사자와 동행을 인격적으로 대하고 원하지 않는 신체 접촉, 음주, 사적인 연락을 요구하지 않아야 합니다. 거절 의사가 표현되면 이유를 따지기보다 즉시 존중하는 것이 기본입니다.`),
            compact(`사업장이 안내하는 안전 수칙과 금지 사항도 이용 전에 확인하세요. 불법 행위나 강압적인 요구를 제안받았을 때는 응하지 말고 자리를 벗어나는 것이 우선입니다. 급박한 위험이 있거나 범죄 피해가 의심되는 경우에는 현장의 신뢰할 수 있는 관리자 또는 관계 기관에 도움을 요청해야 합니다.`),
          ],
        },
        {
          title: "과음 예방과 분쟁을 줄이는 기록",
          paragraphs: [
            compact(`공복 음주를 피하고 물과 음식을 함께 섭취하며 자신의 주량을 넘기지 마세요. 술을 거절하는 사람에게 권하지 않고, 상태가 좋지 않은 일행은 혼자 두지 않는 것이 좋습니다. 의식이 흐려지거나 호흡에 문제가 있는 등 응급 상황이 의심되면 즉시 119에 도움을 요청해야 합니다.`),
            compact(`예약 조건, 변경 안내와 결제 내역을 기록으로 남기는 것은 서로의 기억이 다를 때 사실관계를 확인하는 데 도움이 됩니다. 다만 다른 사람을 동의 없이 촬영하거나 개인정보를 온라인에 공개해서는 안 됩니다. 문제를 제기할 때는 날짜, 시간, 안내 내용과 결제 자료처럼 필요한 정보만 정리해 공식 채널로 전달하세요.`),
          ],
          bullets: ["모든 사람의 거절 의사 존중", "음주 강요와 과음 피하기", "음주운전 금지", "개인정보·초상권 보호", "위험 시 즉시 도움 요청"],
        },
      ],
    },
    {
      id: "seo-compare",
      kicker: "08 · FINAL COMPARISON",
      title: `${context.primaryKeyword} 최종 비교표를 만드는 방법`,
      intro: `${context.comparisonTip} 마지막에는 여러 설명을 기억에 의존하지 말고 같은 열을 가진 간단한 표로 정리하면 선택 이유가 분명해집니다.`,
      subsections: [
        {
          title: "두 곳 이상을 같은 조건으로 비교하기",
          paragraphs: [
            compact(`비교표에는 상호와 위치, 날짜, 입실 가능 시각, 성인 인원, 룸 조건, 기본 시간, 주류 구성, TC·RT 기준, 별도 비용, 변경·취소 조건과 결제 수단을 적으세요. 한 곳은 평일 조건이고 다른 곳은 주말 조건이라면 금액만 비교할 수 없습니다. 모든 곳에 같은 일정과 인원을 전달해야 의미 있는 차이가 드러납니다.`),
            compact(`가장 낮은 예상 금액이 항상 가장 적합한 선택은 아닙니다. 답변이 구체적인지, 질문에 일관되게 답하는지, 상호와 위치가 명확한지, 변경 기준과 증빙을 안내하는지를 함께 보세요. 목적에 맞는 룸과 귀가 동선까지 고려하면 실제 만족도와 안전에 더 가까운 결정을 할 수 있습니다.`),
          ],
        },
        {
          title: `${context.subject} 선택 전 마지막 1분 점검`,
          paragraphs: [
            compact(`예약 버튼을 누르거나 이동하기 전에 ‘누가, 언제, 어디서, 몇 명이, 어떤 조건으로, 얼마의 범위를 예상하고 이용하는가’를 한 문장으로 설명할 수 있는지 확인하세요. 설명하기 어려운 항목은 아직 확인되지 않은 정보입니다. 해당 부분을 공식 안내 채널에 질문하고 답변을 받은 뒤 결정하는 편이 좋습니다.`),
            compact(`${context.primaryKeyword}에 대한 좋은 원고는 특정 선택을 재촉하기보다 독자가 스스로 비교할 기준을 제공해야 합니다. 이 페이지의 정보는 일반적인 안내이며 운영시간과 비용, 영업 여부는 달라질 수 있습니다. 실제 방문 전에는 해당 사업자의 최신 공지와 예약 내용을 다시 확인하고, 합법적인 성인 이용과 상호 존중 원칙을 지켜주세요.`),
          ],
          bullets: ["목적과 인원", "룸과 기본 시간", "포함·별도 비용", "변경·취소 기준", "주소와 귀가 계획"],
        },
      ],
    },
  ];
}

export function buildHomeSeoChapters(): SeoChapter[] {
  return buildGuideChapters({
    subject: "강남 밤문화",
    primaryKeyword: "강남 밤문화 업종 비교와 예약 가이드",
    description: "하이퍼블릭, 셔츠룸, 쩜오, 가라오케, 텐카페, 텐프로와 일프로의 통칭을 구분하고 합리적으로 비교하는 방법",
    definition: "강남 밤문화라는 표현은 서로 다른 룸형 업종과 모임 공간을 넓게 묶어 부르는 검색어입니다. 각 명칭은 공식 등급이나 품질 인증이 아닐 수 있으므로 이름만으로 서비스를 단정하면 안 됩니다.",
    audience: "처음 업종 차이를 알아보는 성인 이용자부터 단체 모임의 룸과 예산을 비교하려는 사람까지 활용할 수 있습니다.",
    comparisonTip: "업종 이름보다 모임 목적, 성인 인원, 공간, 이용 시간, 포함 항목과 변경 조건을 같은 순서로 비교하세요.",
    focusItems: ["업종별 차이", "룸과 성인 인원", "주대·TC·RT와 예상 총액"],
    questions: ["어떤 업종이 모임 목적에 맞나요?", "비용에는 어떤 항목이 포함되나요?", "예약과 방문 조건은 어떻게 확인하나요?"],
    pageKind: "home",
  });
}

export function buildCategorySeoChapters(category: Category): SeoChapter[] {
  return buildGuideChapters({
    subject: category.name,
    primaryKeyword: `${category.name} 뜻·가격·예약 가이드`,
    description: category.longDescription,
    definition: category.definition,
    audience: category.audience,
    comparisonTip: category.comparisonTip,
    focusItems: [...category.highlights],
    questions: category.faqs.map(([question]) => question),
    pageKind: "category",
  });
}

export function buildVenueSeoChapters(category: Category, venue: Venue): SeoChapter[] {
  return buildGuideChapters({
    subject: `강남 ${venue.name}`,
    primaryKeyword: `강남 ${venue.name} ${category.shortName} 예약·비용 정보`,
    description: venue.metaDescription,
    definition: `${venue.intro} ${category.definition}`,
    audience: `${venue.decisionTip} ${category.audience}`,
    comparisonTip: category.comparisonTip,
    focusItems: venue.features.map((feature) => `${feature.title}: ${feature.description}`),
    questions: [...venue.reservationQuestions, ...venue.faqs.map(([question]) => question)],
    pageKind: "venue",
  });
}

export function buildBlogIndexSeoChapters(): SeoChapter[] {
  return buildGuideChapters({
    subject: "강남 밤문화 블로그",
    primaryKeyword: "강남 밤문화 블로그와 실전 이용 정보",
    description: "첫 방문 준비, 업종 차이, 가격 용어, 예약 메시지, 안전과 결제 에티켓을 검색 질문별로 찾아보는 편집 가이드",
    definition: "강남의 밤 블로그는 특정 업소를 무조건 추천하는 목록이 아니라 성인 이용자가 예약 전에 스스로 조건을 확인할 수 있도록 질문과 비교 기준을 제공하는 정보형 아카이브입니다.",
    audience: "강남 룸 업종을 처음 알아보거나 비용 용어와 안전한 이용 원칙을 한 번에 정리하고 싶은 성인 독자에게 적합합니다.",
    comparisonTip: "글 제목의 검색 의도와 현재 내 상황이 맞는지 확인한 뒤, 체크리스트와 문의 문장을 실제 예약 조건에 맞게 바꿔 사용하세요.",
    focusItems: ["첫 방문 체크", "업종·공간 비교", "비용 용어와 안전한 이용"],
    questions: ["처음 방문할 때 무엇부터 확인하나요?", "주대·TC·RT는 어떻게 계산되나요?", "안전한 예약과 결제 원칙은 무엇인가요?"],
    pageKind: "blog",
  });
}

const articleProfiles: Record<string, { definition: string; audience: string; comparison: string; focus: string[]; questions: string[] }> = {
  "강남-하이퍼블릭-이용팁": {
    definition: "첫 방문 체크리스트의 목적은 유명세를 확인하는 것이 아니라 상호·주소·룸·시간·비용·변경 조건을 같은 순서로 점검하는 데 있습니다.",
    audience: "하이퍼블릭을 처음 알아보는 성인 이용자와 단체 모임의 예약 담당자에게 필요한 순서형 안내입니다.",
    comparison: "여러 안내를 볼 때 날짜와 인원을 고정하고 룸, 시간, 포함 비용과 예약 변경 기준을 표로 비교하세요.",
    focus: ["공식 예약 채널", "룸과 이용 시간", "주대·TC·RT와 결제 내역"],
    questions: ["첫 문의에는 어떤 정보를 보내나요?", "룸과 기본 시간은 어떻게 확인하나요?", "결제 전 무엇을 대조하나요?"],
  },
  "주대-tc-rt-용어": {
    definition: "주대·TC·RT는 강남 룸 예약에서 자주 보이는 약어지만 사업장마다 포함 범위와 계산 단위가 달라질 수 있습니다.",
    audience: "광고의 시작 금액과 실제 예상 총액의 차이를 이해하고 싶은 성인 이용자에게 적합한 비용 가이드입니다.",
    comparison: "약어의 이름보다 주류 수량, 인원, 시간, 룸, 봉사료와 연장 기준이 내 예약에 어떻게 적용되는지 확인하세요.",
    focus: ["주대의 포함 구성", "TC의 인원·시간 단위", "RT·봉사료·연장 비용"],
    questions: ["주대에는 무엇이 포함되나요?", "TC는 몇 명·몇 분 기준인가요?", "필수 비용을 포함한 예상 총액은 얼마인가요?"],
  },
  "안전한-밤문화-에티켓": {
    definition: "안전한 밤문화는 합법적인 사업장을 확인하고 모든 사람의 의사와 사업장 규정을 존중하는 태도에서 시작합니다.",
    audience: "예약부터 음주, 귀가와 결제까지 갈등과 위험을 줄이는 기본 원칙을 확인하려는 모든 성인 이용자를 위한 글입니다.",
    comparison: "분위기나 가격보다 공식 채널, 명확한 비용 고지, 성인 확인, 귀가 계획과 결제 증빙을 우선해 보세요.",
    focus: ["성인 확인과 상호 존중", "과음 예방과 귀가 계획", "예약 변경과 결제 증빙"],
    questions: ["상대방의 의사를 어떻게 존중해야 하나요?", "과음을 줄이려면 무엇을 준비하나요?", "결제 문제가 생기면 어떤 자료를 확인하나요?"],
  },
  "강남-룸-예약-메시지": {
    definition: "예약 메시지는 날짜, 시각, 성인 인원, 모임 목적, 룸과 비용 질문을 한 번에 전달해 서로 다른 전제를 줄이는 도구입니다.",
    audience: "전화 문의가 부담스럽거나 여러 곳의 답변을 같은 기준으로 비교하려는 성인 이용자에게 도움이 됩니다.",
    comparison: "복사한 문구를 그대로 보내기보다 실제 일정과 인원, 필요한 룸 조건, 예산 범위에 맞게 고쳐 사용하세요.",
    focus: ["첫 문의 문장", "포함·별도 비용 질문", "변경·취소 확인 메시지"],
    questions: ["첫 메시지에 무엇을 적나요?", "예상 총액은 어떻게 요청하나요?", "변경 내용은 어떻게 다시 확정하나요?"],
  },
  "강남-밤문화-업종-비교": {
    definition: "하이퍼블릭·쩜오·텐카페 같은 표현은 시장에서 사용하는 통칭이며 공식 등급이나 서비스 품질을 보증하는 인증이 아닙니다.",
    audience: "업종 이름이 낯설고 내 모임 목적에 어떤 공간이 맞는지 비교하고 싶은 성인 독자를 위한 글입니다.",
    comparison: "업종명을 서열처럼 보지 말고 룸, 대화 환경, 인원, 시간, 비용 고지와 이용 규정을 같은 항목으로 비교하세요.",
    focus: ["업종 통칭의 의미", "룸과 모임 목적", "가격·예약 조건의 차이"],
    questions: ["업종명은 공식 등급인가요?", "단체와 소규모 모임의 기준은 무엇인가요?", "같은 조건으로 어떻게 비교하나요?"],
  },
  "강남-단체모임-룸-선택": {
    definition: "단체 모임의 룸 선택은 좌석 수뿐 아니라 대화 동선, 합류 시간, 주차와 귀가, 예산 분담까지 함께 설계하는 과정입니다.",
    audience: "회식, 비즈니스 대화 또는 친목 모임을 준비하는 예약 담당자와 성인 이용자에게 적합합니다.",
    comparison: "참석 가능 인원과 실제 확정 인원을 나누고, 룸 최소 조건, 기본 시간, 변경 가능 범위와 분할 결제를 함께 확인하세요.",
    focus: ["인원과 좌석 배치", "합류·주차·귀가 동선", "예산 분담과 결제 방식"],
    questions: ["인원에 맞는 룸은 어떻게 고르나요?", "늦게 합류하면 시간은 어떻게 계산되나요?", "분할 결제와 영수증이 가능한가요?"],
  },
};

export function buildBlogArticleSeoChapters(post: BlogPost): SeoChapter[] {
  const profile = articleProfiles[post.slug] ?? {
    definition: post.lead,
    audience: "강남 밤문화 관련 정보를 실제 예약 조건에 맞춰 확인하려는 성인 독자를 위한 글입니다.",
    comparison: "날짜, 인원, 룸, 시간과 비용 조건을 같은 기준으로 비교하세요.",
    focus: post.sections.slice(0, 3).map((section) => section.title),
    questions: post.sections.slice(0, 3).map((section) => `${section.title}에서 무엇을 확인하나요?`),
  };

  return buildGuideChapters({
    subject: post.title,
    primaryKeyword: post.title,
    description: post.excerpt,
    definition: profile.definition,
    audience: profile.audience,
    comparisonTip: profile.comparison,
    focusItems: profile.focus,
    questions: profile.questions,
    pageKind: "blog",
  });
}

export function buildLegalSeoChapters(pageKey: string, page: LegalPage): SeoChapter[] {
  const focus = page.sections.slice(0, 3).map((section) => section.title);
  return buildGuideChapters({
    subject: page.title,
    primaryKeyword: `${page.title} 안내`,
    description: page.description,
    definition: page.lead,
    audience: `${page.title}의 적용 범위와 사이트 이용 기준을 정확히 확인하려는 방문자를 위한 안내입니다.`,
    comparisonTip: "요약 문구뿐 아니라 적용 범위, 예외, 외부 사업자와의 관계, 변경 기준을 함께 읽어주세요.",
    focusItems: focus.length ? focus : ["적용 범위", "이용 기준", "변경 안내"],
    questions: page.sections.slice(0, 3).map((section) => `${section.title}은 어떻게 적용되나요?`),
    pageKind: "legal",
  }).map((chapter) => ({ ...chapter, id: `${pageKey}-${chapter.id}` }));
}

export function countSeoCharacters(chapters: SeoChapter[]) {
  return chapters.reduce(
    (total, chapter) =>
      total +
      chapter.title.length +
      chapter.intro.length +
      chapter.subsections.reduce(
        (subTotal, subsection) =>
          subTotal +
          subsection.title.length +
          subsection.paragraphs.join("").length +
          (subsection.bullets?.join("").length ?? 0),
        0,
      ),
    0,
  );
}

export function countSeoWords(chapters: SeoChapter[]) {
  return chapters
    .flatMap((chapter) => [
      chapter.title,
      chapter.intro,
      ...chapter.subsections.flatMap((subsection) => [
        subsection.title,
        ...subsection.paragraphs,
        ...(subsection.bullets ?? []),
      ]),
    ])
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
