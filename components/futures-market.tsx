"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown, RefreshCw } from "lucide-react"

export default function FuturesMarket() {
  const [isLoading, setIsLoading] = useState(false)

  const futuresData = [
    { name: "KOSPI 200 선물", price: 345.25, change: 2.75, changePercent: 0.8, volume: 125430, icon: "📊" },
    { name: "미니 KOSPI 200 선물", price: 345.3, change: 2.8, changePercent: 0.82, volume: 34520, icon: "📈" },
    { name: "KOSDAQ 150 선물", price: 1245.5, change: -5.25, changePercent: -0.42, volume: 78650, icon: "📉" },
    { name: "KTB 3년 선물", price: 104.85, change: 0.15, changePercent: 0.14, volume: 45230, icon: "📝" },
    { name: "KTB 10년 선물", price: 125.35, change: -0.25, changePercent: -0.2, volume: 32450, icon: "📜" },
    { name: "USD 선물", price: 1325.5, change: 3.25, changePercent: 0.25, volume: 56780, icon: "💵" },
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
        <h2 className="text-xl font-bold">선물 시장</h2>
        <button onClick={refreshData} className="flex items-center text-sm text-blue-500" disabled={isLoading}>
          <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`} />
          새로고침
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종목</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">가격</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">변동</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                변동률
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                거래량
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {futuresData.map((future) => (
              <tr key={future.name} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                  <span className="mr-2 text-lg">{future.icon}</span> {future.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{future.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span
                    className={
                      future.change > 0 ? "text-red-500" : future.change < 0 ? "text-blue-500" : "text-gray-500"
                    }
                  >
                    {future.change > 0 ? "+" : ""}
                    {future.change.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end">
                    {future.changePercent > 0 ? (
                      <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                    ) : future.changePercent < 0 ? (
                      <ArrowDown className="h-3 w-3 text-blue-500 mr-1" />
                    ) : null}
                    <span
                      className={
                        future.changePercent > 0
                          ? "text-red-500"
                          : future.changePercent < 0
                            ? "text-blue-500"
                            : "text-gray-500"
                      }
                    >
                      {Math.abs(future.changePercent).toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{future.volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
