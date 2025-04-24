"use client"

import { useState } from "react"
import { Calendar, User, Tag, ExternalLink } from "lucide-react"

export default function NewsSection() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "전체", icon: "📰" },
    { id: "market", name: "시장", icon: "📊" },
    { id: "economy", name: "경제", icon: "💹" },
    { id: "company", name: "기업", icon: "🏢" },
    { id: "global", name: "국제", icon: "🌎" },
    { id: "crypto", name: "암호화폐", icon: "₿" },
  ]

  const news = [
    {
      id: 1,
      title: "미 연준, 기준금리 동결 결정... 인플레이션 우려 여전",
      summary:
        "미국 연방준비제도(Fed)는 최근 회의에서 기준금리를 현 수준에서 동결하기로 결정했습니다. 인플레이션 압력이 여전히 높다는 판단에 따른 것으로 보입니다.",
      date: "2024-02-15",
      author: "김경제",
      category: "economy",
      url: "#",
      icon: "💹",
    },
    {
      id: 2,
      title: "삼성전자, 신형 폴더블폰 출시 예정... 시장 반응 주목",
      summary:
        "삼성전자가 다음 달 신형 폴더블 스마트폰을 출시할 예정입니다. 업계에서는 이번 제품이 폴더블폰 시장의 판도를 바꿀 수 있을지 주목하고 있습니다.",
      date: "2024-02-14",
      author: "박테크",
      category: "company",
      url: "#",
      icon: "📱",
    },
    {
      id: 3,
      title: "비트코인, 6만 달러 돌파... 역대 최고가 경신",
      summary:
        "비트코인 가격이 6만 달러를 돌파하며 역대 최고가를 경신했습니다. 기관 투자자들의 참여 확대와 ETF 승인 기대감이 가격 상승을 이끈 것으로 분석됩니다.",
      date: "2024-02-13",
      author: "최암호",
      category: "crypto",
      url: "#",
      icon: "₿",
    },
    {
      id: 4,
      title: "코스피, 외국인 매수세에 2,700선 회복",
      summary:
        "코스피 지수가 외국인 투자자들의 매수세에 힘입어 2,700선을 회복했습니다. 특히 반도체와 2차전지 관련주가 강세를 보였습니다.",
      date: "2024-02-12",
      author: "이마켓",
      category: "market",
      url: "#",
      icon: "📊",
    },
    {
      id: 5,
      title: "중국 경제 성장률 둔화... 글로벌 시장 영향 우려",
      summary:
        "중국의 경제 성장률이 예상보다 둔화되면서 글로벌 시장에 미칠 영향에 대한 우려가 커지고 있습니다. 특히 원자재 시장과 관련 산업에 미칠 파급효과가 주목됩니다.",
      date: "2024-02-11",
      author: "정글로벌",
      category: "global",
      url: "#",
      icon: "🌎",
    },
  ]

  const filteredNews = activeCategory === "all" ? news : news.filter((item) => item.category === activeCategory)

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">최신 뉴스</h2>
      </div>

      <div className="mb-4 flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded whitespace-nowrap flex items-center ${
              activeCategory === category.id ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <span className="mr-1">{category.icon}</span> {category.name}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-bold mb-2 flex items-center">
              <span className="mr-2">{item.icon}</span> {item.title}
            </h3>
            <p className="text-gray-600 mb-3">{item.summary}</p>
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {item.date}
              </span>
              <span className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {item.author}
              </span>
              <span className="flex items-center">
                <Tag className="h-3 w-3 mr-1" />
                {categories.find((cat) => cat.id === item.category)?.name}
              </span>
              <a href={item.url} className="flex items-center text-blue-500 hover:underline ml-auto">
                <ExternalLink className="h-3 w-3 mr-1" />
                기사 원문
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
