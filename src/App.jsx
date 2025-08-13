import React, { useMemo, useState } from "react";

// Tailwind 기반 반응형 카테고리 → 콘텐츠 목록 앱
// 변경점: mockData.categories에 "SW미래채움" 카테고리 추가

const mockData = {
  categories: [
    {
      id: "digital-seed",
      name: "디지털새싹",
      description: "초·중등 SW/AI 융합 체험 및 프로젝트",
      image:
        "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?q=80&w=1200&auto=format&fit=crop",
      contents: [
        {
          id: "ds-01",
          title: "마이크로비트 자율주행 입문",
          summary: "센서 데이터 읽기·의사결정·라인트레이싱",
          tags: ["마이크로비트", "자율주행", "센서"],
          thumb:
            "https://images.unsplash.com/photo-1555617117-08d3b25420ae?q=80&w=1200&auto=format&fit=crop",
          link: "#"
        },
        {
          id: "ds-02",
          title: "AI와 데이터 기초",
          summary: "기초통계·시각화·간단한 예측 실습",
          tags: ["데이터", "AI리터러시"],
          thumb:
            "img/a.jpg",
          link: "#"
        },
        {
          id: "ds-03",
          title: "AI 데이터랩",
          summary: "빅데이터·AI",
          tags: ["데이터", "AI리터러시"],
          thumb:
            "https://images.unsplash.com/photo-1534759846116-5791c9f3d458?q=80&w=1200&auto=format&fit=crop",
          link: "#"
        }
        
      ]
    },
    {
      id: "ai-literacy",
      name: "AI 리터러시",
      description: "프롬프트·윤리·비판적 사고 중심의 생성형 AI 수업",
      image:
        "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?q=80&w=1200&auto=format&fit=crop",
      contents: [
        {
          id: "ai-01",
          title: "프롬프트 리터러시 101",
          summary: "질문 설계·리라이팅·평가 루프",
          tags: ["프롬프트", "생성형AI"],
          thumb:
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop",
          link: "#"
        },
        {
          id: "ai-02",
          title: "AI 윤리 토론 키트",
          summary: "편향·저작권·책임성 활동 시나리오",
          tags: ["윤리", "토론"],
          thumb:
            "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1200&auto=format&fit=crop",
          link: "#"
        }
      ]
    },
    {
      id: "data-literacy",
      name: "데이터 리터러시",
      description: "수집→전처리→분석→시각화 체험",
      image:
        "https://images.unsplash.com/photo-1529078155058-5d716f45d604?q=80&w=1200&auto=format&fit=crop",
      contents: [
        {
          id: "dl-01",
          title: "환경 데이터로 문제 해결",
          summary: "밝기·온습도 센서 데이터로 의사결정",
          tags: ["센서", "시각화"],
          thumb:
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop",
          link: "#"
        }
      ]
    },
    {
      id: "teacher-training",
      name: "교사 연수",
      description: "커리큘럼 설계·평가·수업 운영 노하우",
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200&auto=format&fit=crop",
      contents: [
        {
          id: "tt-01",
          title: "생성형 AI 수업 디자인 워크숍",
          summary: "학습목표 정렬·활동 설계·피드백 자동화",
          tags: ["워크숍", "수업설계"],
          thumb:
            "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
          link: "#"
        }
      ]
    },
    // 👉 새로 추가된 카테고리: SW미래채움
    {
      id: "sw-future-up",
      name: "SW미래채움",
      description: "지역 기반 SW·AI 체험, 진로탐색, 메이킹 프로젝트",
      image:
        "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1200&auto=format&fit=crop",
      contents: [
        {
          id: "sw-01",
          title: "블록코딩으로 만드는 스마트 시티",
          summary: "엔트리/스크래치로 교통·환경 시뮬레이션",
          tags: ["블록코딩", "시뮬레이션", "스마트시티"],
          thumb:
            "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1200&auto=format&fit=crop",
          link: "#"
        },
        {
          id: "sw-02",
          title: "아두이노 메이킹: 환경 모니터",
          summary: "온습도·조도 센서로 데이터 수집·표시",
          tags: ["아두이노", "메이킹", "센서"],
          thumb:
            "https://images.unsplash.com/photo-1553406830-ef2513450d83?q=80&w=1200&auto=format&fit=crop",
          link: "#"
        }
      ]
    }
  ]
};

function useFiltered(data, q) {
  return useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return data;
    return data.map((c) => ({
      ...c,
      contents: c.contents.filter(
        (it) =>
          it.title.toLowerCase().includes(query) ||
          it.summary.toLowerCase().includes(query) ||
          it.tags.join(" ").toLowerCase().includes(query)
      )
    }));
  }, [data, q]);
}

export default function App() {
  const [route, setRoute] = useState({ name: "home", categoryId: null });
  const [search, setSearch] = useState("");
  const data = mockData.categories;
  const filtered = useFiltered(data, search);

  const selectedCategory = useMemo(
    () => data.find((c) => c.id === route.categoryId) || null,
    [route, data]
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Topbar */}
      <header className="sticky top-0 z-30 backdrop-blur bg-white/80 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            className="shrink-0 rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50"
            onClick={() => setRoute({ name: "home", categoryId: null })}
            aria-label="홈으로"
          >
            Learn‑X 콘텐츠
          </button>

          {/* Breadcrumb */}
          <nav className="ml-1 text-sm text-gray-500">
            {route.name === "home" ? (
              <span>사업 보기</span>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  className="hover:underline"
                  onClick={() => setRoute({ name: "home", categoryId: null })}
                >
                  사업
                </button>
                <span className="mx-1">/</span>
                <span className="font-medium text-gray-800">
                  {selectedCategory?.name}
                </span>
              </div>
            )}
          </nav>

          {/* Search */}
          <div className="ml-auto w-full sm:w-72">
            <label className="relative block">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="검색: 제목·요약·태그"
                className="w-full rounded-xl border bg-white px-4 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span className="pointer-events-none absolute right-3 top-2.5">🔎</span>
            </label>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-sky-50 border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {route.name === "home"
              ? "사업별 대표 콘텐츠를 한눈에"
              : selectedCategory?.name}
          </h1>
          <p className="mt-2 text-gray-600 max-w-3xl">
            {route.name === "home"
              ? "대표 이미지를 클릭하면 해당 사업의 콘텐츠 목록으로 이동합니다. 상단 검색창으로 빠르게 찾을 수 있어요."
              : selectedCategory?.description}
          </p>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {route.name === "home" ? (
          <CategoryGrid
            categories={filtered.map((c) => ({ ...c, count: c.contents.length }))}
            onOpen={(id) => setRoute({ name: "category", categoryId: id })}
          />
        ) : (
          <CategoryDetail
            category={selectedCategory}
            filteredContents={
              filtered.find((c) => c.id === selectedCategory?.id)?.contents || []
            }
            onBack={() => setRoute({ name: "home", categoryId: null })}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-gray-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Learn‑X. All rights reserved.</p>
          <p className="opacity-80">Tailwind 기반 · 반응형 · 단일 파일 데모</p>
        </div>
      </footer>
    </div>
  );
}

function CategoryGrid({ categories, onOpen }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          className="group text-left rounded-2xl overflow-hidden border bg-white hover:shadow-lg transition-shadow"
          onClick={() => onOpen(cat.id)}
          aria-label={`${cat.name} 열기`}
        >
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={cat.image}
              alt={cat.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold">{cat.name}</h3>
              <span className="text-xs rounded-full bg-indigo-50 text-indigo-600 px-2 py-1 border border-indigo-100">
                {cat.count}개 콘텐츠
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{cat.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}

function CategoryDetail({ category, filteredContents, onBack }) {
  if (!category) return null;
  const hasFilter = filteredContents.length !== category.contents.length;
  const items = filteredContents;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            src={category.image}
            alt="대표 이미지"
            className="h-12 w-20 rounded-lg object-cover border"
          />
          <div>
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="text-sm text-gray-600">{category.description}</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
        >
          ← 사업 목록
        </button>
      </div>

      {hasFilter && (
        <p className="text-sm text-gray-500">필터 결과: {items.length}개</p>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
          해당 검색어와 일치하는 콘텐츠가 없습니다.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <article key={it.id} className="rounded-2xl overflow-hidden border bg-white">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={it.thumb}
                  alt={it.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold line-clamp-2">{it.title}</h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{it.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {it.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full bg-gray-50 text-gray-600 px-2 py-1 border"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <a
                    href={it.link}
                    className="text-sm font-medium text-indigo-600 hover:underline"
                  >
                    자세히 보기
                  </a>
                  <button
                    className="text-sm rounded-xl border px-3 py-1.5 hover:bg-gray-50"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                    title="페이지 주소 복사"
                  >
                    링크 복사
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
