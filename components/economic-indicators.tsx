"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Calendar, RefreshCw } from "lucide-react"

export default function EconomicIndicators() {
  const [isLoading, setIsLoading] = useState(false)

  const indicators = [
    { name: "GDP 성장률", value: "3.2%", change: 0.2, date: "2023-12-31", icon: "📈" },
    { name: "실업률", value: "3.5%", change: -0.1, date: "2024-01-15", icon: "👥" },
    { name: "소비자물가지수", value: "104.5", change: 0.3, date: "2024-01-31", icon: "🛒" },
    { name: "기준금리", value: "3.5%", change: 0, date: "2024-02-15", icon: "💰" },
    { name: "무역수지", value: "$5.2B", change: 1.2, date: "2024-01-31", icon: "🚢" },
    { name: "산업생산지수", value: "112.3", change: -0.5, date: "2024-01-20", icon: "🏭" },
  ]

  const refreshData = () => {
    setIsLoading(true)
    // 실제로는 API 호출을 통해 데이터를 가져옴
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">주요 경제지표</h2>
        <button onClick={refreshData} className="flex items-center text-sm text-blue-500" disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          새로고침
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {indicators.map((indicator) => (
          <div key={indicator.name} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm flex items-center">
                <span className="mr-1 text-lg">{indicator.icon}</span> {indicator.name}
              </span>
              <span className="text-xs text-gray-400 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {indicator.date}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{indicator.value}</span>
              <span
                className={`flex items-center text-sm ${indicator.change > 0 ? "text-red-500" : indicator.change < 0 ? "text-blue-500" : "text-gray-500"}`}
              >
                {indicator.change > 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : indicator.change < 0 ? (
                  <TrendingDown className="h-4 w-4 mr-1" />
                ) : null}
                {indicator.change > 0 ? "+" : ""}
                {indicator.change}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
