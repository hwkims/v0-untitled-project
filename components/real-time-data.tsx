"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"

interface StockData {
  name: string
  price: number
  change: number
  changePercent: number
}

export default function RealTimeData() {
  const [stocks, setStocks] = useState<StockData[]>([
    { name: "삼성전자", price: 68700, change: 1200, changePercent: 1.78 },
    { name: "SK하이닉스", price: 137000, change: -3000, changePercent: -2.14 },
    { name: "현대차", price: 187500, change: 2500, changePercent: 1.35 },
    { name: "NAVER", price: 203000, change: 1000, changePercent: 0.49 },
    { name: "카카오", price: 47850, change: -650, changePercent: -1.34 },
  ])

  const [time, setTime] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())

      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          // Random price change between -1.5% and +1.5%
          const randomChange = Math.floor(stock.price * (Math.random() * 0.03 - 0.015))
          const newPrice = stock.price + randomChange
          const changePercent = (randomChange / stock.price) * 100

          return {
            ...stock,
            price: newPrice,
            change: randomChange,
            changePercent: Number.parseFloat(changePercent.toFixed(2)),
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">실시간 주식 시세</h1>
        <p className="text-gray-500">
          {time.toLocaleDateString("ko-KR")} {time.toLocaleTimeString("ko-KR")} 기준
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">종목명</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                현재가
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                전일대비
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                등락률
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stocks.map((stock, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium">
                  <span
                    className={stock.change > 0 ? "text-red-500" : stock.change < 0 ? "text-blue-500" : "text-gray-900"}
                  >
                    {stock.price.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <div className="flex items-center justify-end">
                    {stock.change > 0 ? (
                      <ArrowUp className="h-3 w-3 text-red-500 mr-1" />
                    ) : stock.change < 0 ? (
                      <ArrowDown className="h-3 w-3 text-blue-500 mr-1" />
                    ) : null}
                    <span
                      className={
                        stock.change > 0 ? "text-red-500" : stock.change < 0 ? "text-blue-500" : "text-gray-900"
                      }
                    >
                      {Math.abs(stock.change).toLocaleString()}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  <span
                    className={stock.change > 0 ? "text-red-500" : stock.change < 0 ? "text-blue-500" : "text-gray-900"}
                  >
                    {stock.change > 0 ? "+" : stock.change < 0 ? "-" : ""}
                    {Math.abs(stock.changePercent).toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
