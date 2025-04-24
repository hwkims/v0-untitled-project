"use client"

import { useState, useEffect, useCallback } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/lib/store"
import { getAllAssets, updateAssetPrices } from "@/lib/data-service"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import AssetHeader from "@/components/asset-header"
import AssetChart from "@/components/asset-chart"
import AssetInfo from "@/components/asset-info"
import AssetNews from "@/components/asset-news"
import AssetHistorical from "@/components/asset-historical"
import UnifiedGame from "@/components/unified-game"
import EconomicIndicators from "@/components/economic-indicators"
import ForexRates from "@/components/forex-rates"
import NewsSection from "@/components/news-section"
import FuturesMarket from "@/components/futures-market"

export default function StockDashboard() {
  const { currentAsset, setCurrentAsset } = useAppStore()
  const [showGameModal, setShowGameModal] = useState(false)
  const isMobile = useMediaQuery({ maxWidth: 768 })
  const [activeSection, setActiveSection] = useState("stocks")

  // Initialize with first asset if none selected
  useEffect(() => {
    if (!currentAsset) {
      const assets = getAllAssets()
      if (assets.length > 0) {
        setCurrentAsset(assets[0])
      }
    }
  }, [currentAsset, setCurrentAsset])

  // Simulate real-time updates
  const updateCurrentAsset = useCallback(() => {
    const updatedAssets = updateAssetPrices()

    // Update current asset if it exists
    if (currentAsset) {
      const updatedCurrentAsset = updatedAssets.find((asset) => asset.id === currentAsset.id)
      if (updatedCurrentAsset) {
        setCurrentAsset(updatedCurrentAsset)
      }
    }
  }, [currentAsset, setCurrentAsset])

  useEffect(() => {
    const interval = setInterval(updateCurrentAsset, 5000)

    return () => clearInterval(interval)
  }, [updateCurrentAsset])

  // 네비게이션 항목 클릭 처리
  useEffect(() => {
    const handleNavClick = (e: CustomEvent) => {
      if (e.detail) {
        setActiveSection(e.detail)
      }
    }

    window.addEventListener("navClick" as any, handleNavClick as any)
    return () => {
      window.removeEventListener("navClick" as any, handleNavClick as any)
    }
  }, [])

  // 섹션에 따른 컨텐츠 렌더링
  const renderContent = () => {
    switch (activeSection) {
      case "stocks":
        return (
          <>
            {/* Asset Header */}
            <AssetHeader />

            {/* Chart Area */}
            <AssetChart />

            {/* Asset Info Tabs */}
            <div className="border-t border-gray-200">
              <Tabs defaultValue="overview">
                <TabsList className="border-b border-gray-200 px-4 overflow-x-auto">
                  <TabsTrigger value="overview">요약</TabsTrigger>
                  <TabsTrigger value="chart">차트</TabsTrigger>
                  <TabsTrigger value="financials">재무</TabsTrigger>
                  <TabsTrigger value="news">뉴스</TabsTrigger>
                  <TabsTrigger value="discussion">토론</TabsTrigger>
                  <TabsTrigger value="historical">과거 데이터</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4">
                  <AssetInfo />
                </TabsContent>
                <TabsContent value="chart" className="p-4">
                  <div className="text-center text-gray-500 py-8">고급 차트 기능은 프리미엄 서비스입니다.</div>
                </TabsContent>
                <TabsContent value="financials" className="p-4">
                  <div className="text-center text-gray-500 py-8">재무 정보는 프리미엄 서비스입니다.</div>
                </TabsContent>
                <TabsContent value="news" className="p-4">
                  <AssetNews />
                </TabsContent>
                <TabsContent value="discussion" className="p-4">
                  <div className="text-center text-gray-500 py-8">토론 기능은 로그인 후 이용 가능합니다.</div>
                </TabsContent>
                <TabsContent value="historical" className="p-4">
                  <AssetHistorical />
                </TabsContent>
              </Tabs>
            </div>
          </>
        )
      case "futures":
        return <FuturesMarket />
      case "forex":
        return <ForexRates />
      case "indicators":
        return <EconomicIndicators />
      case "news":
        return <NewsSection />
      case "game":
        // 게임 모달 열기
        useEffect(() => {
          document.getElementById("game-modal-trigger")?.click()
          return () => setShowGameModal(false)
        }, [])
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">투자 & 클릭 게임</h2>
              <p className="text-gray-500 mb-4">게임 모달이 열려 있습니다.</p>
              <button
                onClick={() => document.getElementById("game-modal-trigger")?.click()}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                게임 다시 열기
              </button>
            </div>
          </div>
        )
      default:
        return (
          <>
            {/* Asset Header */}
            <AssetHeader />

            {/* Chart Area */}
            <AssetChart />

            {/* Asset Info Tabs */}
            <div className="border-t border-gray-200">
              <Tabs defaultValue="overview">
                <TabsList className="border-b border-gray-200 px-4 overflow-x-auto">
                  <TabsTrigger value="overview">요약</TabsTrigger>
                  <TabsTrigger value="chart">차트</TabsTrigger>
                  <TabsTrigger value="financials">재무</TabsTrigger>
                  <TabsTrigger value="news">뉴스</TabsTrigger>
                  <TabsTrigger value="discussion">토론</TabsTrigger>
                  <TabsTrigger value="historical">과거 데이터</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="p-4">
                  <AssetInfo />
                </TabsContent>
                <TabsContent value="chart" className="p-4">
                  <div className="text-center text-gray-500 py-8">고급 차트 기능은 프리미엄 서비스입니다.</div>
                </TabsContent>
                <TabsContent value="financials" className="p-4">
                  <div className="text-center text-gray-500 py-8">재무 정보는 프리미엄 서비스입니다.</div>
                </TabsContent>
                <TabsContent value="news" className="p-4">
                  <AssetNews />
                </TabsContent>
                <TabsContent value="discussion" className="p-4">
                  <div className="text-center text-gray-500 py-8">토론 기능은 로그인 후 이용 가능합니다.</div>
                </TabsContent>
                <TabsContent value="historical" className="p-4">
                  <AssetHistorical />
                </TabsContent>
              </Tabs>
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        {(!isMobile || !currentAsset) && <Sidebar />}

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">{renderContent()}</div>
      </div>

      {/* Hidden button for modal trigger */}
      <button id="game-modal-trigger" className="hidden" onClick={() => setShowGameModal(true)} />

      {/* Unified Game Modal */}
      <UnifiedGame isOpen={showGameModal} onClose={() => setShowGameModal(false)} />
    </div>
  )
}
