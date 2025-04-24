"use client"

import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useAppStore } from "@/lib/store"
import { getAssetsByType } from "@/lib/data-service"
import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react"

export default function Sidebar() {
  const { activeTab, setActiveTab, currentAsset, setCurrentAsset, watchlist } = useAppStore()
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [filter, setFilter] = useState("all")

  const stocks = getAssetsByType("stock")
  const cryptos = getAssetsByType("crypto")
  const assets = activeTab === "stock" ? stocks : cryptos

  const filterOptions =
    activeTab === "stock"
      ? [
          { id: "all", name: "전체" },
          { id: "전자", name: "전자" },
          { id: "반도체", name: "반도체" },
          { id: "서비스", name: "서비스" },
        ]
      : [
          { id: "all", name: "전체" },
          { id: "gainers", name: "상승" },
          { id: "losers", name: "하락" },
        ]

  const filteredAssets =
    filter === "all"
      ? assets
      : activeTab === "crypto"
        ? filter === "gainers"
          ? assets.filter((asset) => asset.change > 0)
          : filter === "losers"
            ? assets.filter((asset) => asset.change < 0)
            : assets
        : assets.filter((asset) => asset.sector === filter)

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("ko-KR").format(value)
  }

  const formatChange = (value: number): string => {
    return Math.abs(value).toFixed(2)
  }

  if (isMobile && !currentAsset) {
    return null
  }

  return (
    <div className={`${isMobile ? "fixed inset-0 z-50 bg-white" : "w-56 border-r border-gray-200"} flex flex-col`}>
      {isMobile && (
        <div className="p-3 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-medium">종목 목록</h2>
          <button onClick={() => setCurrentAsset(null)} className="p-1 rounded-full hover:bg-gray-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="p-3 border-b border-gray-200">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("stock")}
            className={`px-3 py-1.5 text-sm font-medium rounded ${activeTab === "stock" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            주식
          </button>
          <button
            onClick={() => setActiveTab("crypto")}
            className={`px-3 py-1.5 text-sm font-medium rounded ${activeTab === "crypto" ? "bg-blue-500 text-white" : "bg-gray-100"}`}
          >
            암호화폐
          </button>
        </div>
      </div>

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

      <div className="overflow-y-auto flex-1">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            onClick={() => setCurrentAsset(asset)}
            className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
              currentAsset?.id === asset.id ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-base mr-2">
                  {asset.logo}
                </div>
                <div>
                  <div className="font-medium text-sm">{asset.name}</div>
                  <div className="text-xs text-gray-500">{asset.code}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-sm">{formatNumber(asset.price)}</div>
                <div
                  className={`text-xs flex items-center justify-end ${
                    asset.change < 0 ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {asset.change < 0 ? <ArrowDown className="h-3 w-3 mr-0.5" /> : <ArrowUp className="h-3 w-3 mr-0.5" />}
                  {formatChange(asset.change)}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => {
            // Open unified game modal
            document.getElementById("game-modal-trigger")?.click()
          }}
          className="w-full bg-blue-500 text-white rounded py-2 text-sm font-medium"
        >
          투자 & 클릭 게임
        </button>
      </div>
    </div>
  )
}
