"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react"

export default function ForexRates() {
  const [isLoading, setIsLoading] = useState(false)

  const forexRates = [
    { pair: "USD/KRW", rate: 1324.5, change: 2.3, changePercent: 0.17, icon: "🇺🇸" },
    { pair: "EUR/KRW", rate: 1435.2, change: -1.8, changePercent: -0.13, icon: "🇪🇺" },
    { pair: "JPY/KRW", rate: 8.76, change: 0.05, changePercent: 0.57, icon: "🇯🇵" },
    { pair: "CNY/KRW", rate: 183.45, change: -0.35, changePercent: -0.19, icon: "🇨🇳" },
    { pair: "GBP/KRW", rate: 1678.9, change: 3.2, changePercent: 0.19, icon: "🇬🇧" },
    { pair: "AUD/KRW", rate: 872.3, change: 1.1, changePercent: 0.13, icon: "🇦🇺" },
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
        <h2 className="text-xl font-bold">외환 시세</h2>
        <button onClick={refreshData} className="flex items-center text-sm text-blue-500" disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          새로고침
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">통화쌍</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">환율</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">변동</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                변동률
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {forexRates.map((rate) => (
              <tr key={rate.pair} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                  <span className="mr-2 text-lg">{rate.icon}</span> {rate.pair}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{rate.rate.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span className={rate.change > 0 ? "text-red-500" : "text-blue-500"}>
                    {rate.change > 0 ? "+" : ""}
                    {rate.change.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end">
                    {rate.changePercent > 0 ? (
                      <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 text-blue-500 mr-1" />
                    )}
                    <span className={rate.changePercent > 0 ? "text-red-500" : "text-blue-500"}>
                      {Math.abs(rate.changePercent).toFixed(2)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
