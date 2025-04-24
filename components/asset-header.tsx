"use client"

import { Star, MessageSquare, BarChart2, Share2, Bell } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { formatNumber, formatChange } from "@/lib/data-service"

export default function AssetHeader() {
  const { currentAsset, watchlist, addToWatchlist, removeFromWatchlist } = useAppStore()

  if (!currentAsset) {
    return (
      <div className="p-3 border-b border-gray-200 flex items-center justify-center">
        <div className="text-gray-500">자산을 선택해주세요</div>
      </div>
    )
  }

  const isInWatchlist = watchlist.includes(currentAsset.id)

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      removeFromWatchlist(currentAsset.id)
    } else {
      addToWatchlist(currentAsset.id)
    }
  }

  return (
    <div className="p-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl mr-3">
            {currentAsset.logo}
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-bold text-lg">{currentAsset.name}</span>
              <span className="text-gray-500 text-sm ml-2">{currentAsset.code}</span>
              <span className="text-xs ml-2 px-1.5 py-0.5 bg-gray-100 rounded">
                {currentAsset.type === "stock" ? "코스피" : "암호화폐"}
              </span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-bold">{formatNumber(currentAsset.price)}</span>
              <span
                className={`ml-2 px-1.5 py-0.5 rounded text-sm ${
                  currentAsset.change < 0 ? "text-blue-500 bg-blue-50" : "text-red-500 bg-red-50"
                }`}
              >
                {formatChange(currentAsset.change)}%
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={toggleWatchlist} className="p-1.5 hover:bg-gray-100 rounded">
            <Star className={`h-5 w-5 ${isInWatchlist ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Bell className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <MessageSquare className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <BarChart2 className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded">
            <Share2 className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-gray-500">시가총액</span>
          <div className="font-medium">{formatNumber(currentAsset.marketCap / 1000000000000)}조원</div>
        </div>
        <div>
          <span className="text-gray-500">거래량</span>
          <div className="font-medium">{formatNumber(currentAsset.volume / 1000000)}백만</div>
        </div>
        <div>
          <span className="text-gray-500">52주 최고</span>
          <div className="font-medium">{formatNumber(currentAsset.price * 1.3)}</div>
        </div>
        <div>
          <span className="text-gray-500">52주 최저</span>
          <div className="font-medium">{formatNumber(currentAsset.price * 0.7)}</div>
        </div>
      </div>
    </div>
  )
}
