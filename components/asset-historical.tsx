"use client"

import { useAppStore } from "@/lib/store"
import { getHistoricalData, formatNumber } from "@/lib/data-service"
import { ArrowUp, ArrowDown } from "lucide-react"

export default function AssetHistorical() {
  const { currentAsset } = useAppStore()

  if (!currentAsset) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="text-gray-500">자산을 선택해주세요</div>
      </div>
    )
  }

  const historicalData = getHistoricalData(currentAsset.id)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">시가</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">고가</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">저가</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">종가</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">변동률</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">거래량</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {historicalData.map((data, index) => {
            const prevClose = index < historicalData.length - 1 ? historicalData[index + 1].close : data.open
            const changePercent = ((data.close - prevClose) / prevClose) * 100
            const isPositive = changePercent >= 0

            return (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{formatNumber(data.open)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{formatNumber(data.high)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{formatNumber(data.low)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                  {formatNumber(data.close)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm text-right ${isPositive ? "text-red-500" : "text-blue-500"}`}
                >
                  <div className="flex items-center justify-end">
                    {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                    {Math.abs(changePercent).toFixed(2)}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">{formatNumber(data.volume)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
