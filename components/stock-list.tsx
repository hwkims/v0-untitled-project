"use client"

import { useState } from "react"
import { ArrowUp, ArrowDown } from "lucide-react"
import { formatNumber, formatChange } from "@/lib/utils"

interface StockListProps {
  stocks: any[]
  onSelect: (stock: any) => void
  currentStock: any
  isCrypto?: boolean
}

export default function StockList({ stocks, onSelect, currentStock, isCrypto = false }: StockListProps) {
  const [filter, setFilter] = useState("all")

  // If no stocks data yet, use mock data
  const stocksToDisplay =
    stocks.length > 0
      ? stocks
      : isCrypto
        ? [
            {
              code: "BTC/KRW",
              name: "비트코인",
              price: 45000000,
              change: 2.1,
              marketCap: 850000000000000,
              volume: 25000000000000,
              symbol: "BTC",
            },
            {
              code: "ETH/KRW",
              name: "이더리움",
              price: 2500000,
              change: 1.8,
              marketCap: 300000000000000,
              volume: 15000000000000,
              symbol: "ETH",
            },
            {
              code: "XRP/KRW",
              name: "리플",
              price: 700,
              change: -0.5,
              marketCap: 35000000000000,
              volume: 2000000000000,
              symbol: "XRP",
            },
            {
              code: "SOL/KRW",
              name: "솔라나",
              price: 120000,
              change: 3.2,
              marketCap: 50000000000000,
              volume: 5000000000000,
              symbol: "SOL",
            },
            {
              code: "ADA/KRW",
              name: "에이다",
              price: 550,
              change: 0.7,
              marketCap: 20000000000000,
              volume: 1500000000000,
              symbol: "ADA",
            },
            {
              code: "DOGE/KRW",
              name: "도지코인",
              price: 120,
              change: -1.2,
              marketCap: 15000000000000,
              volume: 1000000000000,
              symbol: "DOGE",
            },
            {
              code: "DOT/KRW",
              name: "폴카닷",
              price: 8500,
              change: 1.5,
              marketCap: 10000000000000,
              volume: 800000000000,
              symbol: "DOT",
            },
            {
              code: "SHIB/KRW",
              name: "시바이누",
              price: 0.0035,
              change: -0.8,
              marketCap: 2000000000000,
              volume: 500000000000,
              symbol: "SHIB",
            },
            {
              code: "MATIC/KRW",
              name: "폴리곤",
              price: 950,
              change: 2.3,
              marketCap: 9000000000000,
              volume: 700000000000,
              symbol: "MATIC",
            },
            {
              code: "AVAX/KRW",
              name: "아발란체",
              price: 35000,
              change: 1.1,
              marketCap: 12000000000000,
              volume: 900000000000,
              symbol: "AVAX",
            },
          ]
        : [
            { code: "005930", name: "삼성전자", price: 55500, change: -0.36, sector: "전자" },
            { code: "000660", name: "SK하이닉스", price: 134000, change: 1.52, sector: "반도체" },
            { code: "035420", name: "NAVER", price: 186500, change: 0.81, sector: "서비스" },
            { code: "035720", name: "카카오", price: 49800, change: -0.4, sector: "서비스" },
            { code: "005380", name: "현대차", price: 175500, change: -1.13, sector: "자동차" },
            { code: "051910", name: "LG화학", price: 388000, change: -0.26, sector: "화학" },
            { code: "207940", name: "삼성바이오로직스", price: 788000, change: 0.51, sector: "제약" },
            { code: "006400", name: "삼성SDI", price: 426500, change: 1.67, sector: "전자" },
            { code: "035720", name: "두산에너빌리티", price: 16050, change: -0.62, sector: "중공업" },
            { code: "373220", name: "LG에너지솔루션", price: 388000, change: 0.78, sector: "전자" },
          ]

  const filterOptions = isCrypto
    ? [
        { id: "all", name: "전체" },
        { id: "top", name: "시가총액 상위" },
        { id: "gainers", name: "상승" },
        { id: "losers", name: "하락" },
      ]
    : [
        { id: "all", name: "전체" },
        { id: "전자", name: "전자" },
        { id: "반도체", name: "반도체" },
        { id: "서비스", name: "서비스" },
      ]

  const filteredStocks =
    filter === "all"
      ? stocksToDisplay
      : isCrypto
        ? filter === "gainers"
          ? stocksToDisplay.filter((stock) => stock.change > 0)
          : filter === "losers"
            ? stocksToDisplay.filter((stock) => stock.change < 0)
            : stocksToDisplay
        : stocksToDisplay.filter((stock) => stock.sector === filter)

  return (
    <div>
      <div className="p-2 border-b border-gray-200">
        <div className="flex space-x-1 overflow-x-auto pb-2 text-xs">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setFilter(option.id)}
              className={`px-2 py-1 rounded whitespace-nowrap ${
                filter === option.id ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
              }`}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        {filteredStocks.map((stock) => (
          <div
            key={stock.code}
            onClick={() => onSelect(stock)}
            className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              currentStock.code === stock.code ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{stock.name}</div>
                <div className="text-xs text-gray-500">{stock.code}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatNumber(stock.price)}</div>
                <div
                  className={`text-xs flex items-center justify-end ${
                    stock.change < 0 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {stock.change < 0 ? <ArrowDown className="h-3 w-3 mr-0.5" /> : <ArrowUp className="h-3 w-3 mr-0.5" />}
                  {formatChange(stock.change)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
