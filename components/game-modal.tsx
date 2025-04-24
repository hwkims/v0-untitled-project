"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/lib/store"
import { getAssetsByType, formatNumber } from "@/lib/data-service"
import dynamic from "next/dynamic"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function GameModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { gameState, updateGameState, buyAsset, sellAsset } = useAppStore()
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [quantity, setQuantity] = useState(0)
  const [assetType, setAssetType] = useState<"stock" | "crypto">("stock")

  const stocks = getAssetsByType("stock")
  const cryptos = getAssetsByType("crypto")

  useEffect(() => {
    if (!isOpen) return

    if (!gameState.isGameRunning) return

    const interval = setInterval(() => {
      updateGameState({ gameTime: gameState.gameTime + 1 })

      // Update asset prices every 5 seconds
      if (gameState.gameTime % 5 === 0) {
        // Update portfolio asset values
        const updatedAssets = gameState.assets.map((asset) => {
          const volatility = asset.type === "crypto" ? 0.02 : 0.01
          const randomChange = (Math.random() * 2 - 1) * asset.price * volatility
          const newPrice = asset.price + randomChange

          return {
            ...asset,
            price: newPrice,
            totalValue: newPrice * asset.quantity,
          }
        })

        updateGameState({ assets: updatedAssets })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, gameState.isGameRunning, gameState.gameTime, updateGameState])

  const handleBuy = () => {
    if (!selectedAsset || quantity <= 0) return

    buyAsset(selectedAsset, quantity)
    setQuantity(0)
  }

  const handleSell = (assetId: string, maxQuantity: number) => {
    const sellQuantity = prompt(`판매할 수량을 입력하세요 (최대: ${maxQuantity})`)
    if (!sellQuantity) return

    const quantity = Number.parseFloat(sellQuantity)
    if (isNaN(quantity) || quantity <= 0 || quantity > maxQuantity) {
      alert("유효하지 않은 수량입니다.")
      return
    }

    sellAsset(assetId, quantity)
  }

  const totalPortfolioValue = gameState.cash + gameState.assets.reduce((sum, asset) => sum + asset.totalValue, 0)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (!isOpen) return null

  // Prepare data for portfolio chart
  const portfolioChartOptions = {
    chart: {
      type: "pie" as const,
      height: 350,
    },
    labels: ["현금", ...gameState.assets.map((asset) => asset.name)],
    colors: ["#10b981", ...gameState.assets.map((_, index) => `hsl(${index * 30}, 70%, 60%)`)],
    legend: {
      position: "bottom" as const,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom" as const,
          },
        },
      },
    ],
  }

  const portfolioChartSeries = [gameState.cash, ...gameState.assets.map((asset) => asset.totalValue)]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">모의투자 게임</h2>

        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-sm text-gray-500">게임 시간</div>
            <div className="text-xl font-bold">{formatTime(gameState.gameTime)}</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">총 자산</div>
            <div className="text-xl font-bold">{formatNumber(totalPortfolioValue)}원</div>
          </div>

          <div>
            <div className="text-sm text-gray-500">현금</div>
            <div className="text-xl font-bold">{formatNumber(gameState.cash)}원</div>
          </div>

          <button
            onClick={() => updateGameState({ isGameRunning: !gameState.isGameRunning })}
            className={`px-4 py-2 rounded font-medium ${
              gameState.isGameRunning ? "bg-red-500 text-white" : "bg-blue-500 text-white"
            }`}
          >
            {gameState.isGameRunning ? "일시정지" : "게임 시작"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4">자산 매수</h3>

            <Tabs defaultValue="stock" onValueChange={(value) => setAssetType(value as "stock" | "crypto")}>
              <TabsList className="mb-4">
                <TabsTrigger value="stock">주식</TabsTrigger>
                <TabsTrigger value="crypto">암호화폐</TabsTrigger>
              </TabsList>

              <TabsContent value="stock">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">종목 선택</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={selectedAsset?.id || ""}
                      onChange={(e) => {
                        const selected = stocks.find((s) => s.id === e.target.value)
                        setSelectedAsset(selected || null)
                      }}
                    >
                      <option value="">종목을 선택하세요</option>
                      {stocks.map((stock) => (
                        <option key={stock.id} value={stock.id}>
                          {stock.name} - {formatNumber(stock.price)}원
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedAsset && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">수량</label>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 0)}
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-500">총 금액</div>
                        <div className="text-lg font-bold">{formatNumber(selectedAsset.price * quantity)}원</div>
                      </div>

                      <button
                        onClick={handleBuy}
                        disabled={
                          !gameState.isGameRunning || quantity <= 0 || selectedAsset.price * quantity > gameState.cash
                        }
                        className="w-full bg-blue-500 text-white py-2 rounded font-medium disabled:bg-gray-300"
                      >
                        매수
                      </button>
                    </>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="crypto">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">암호화폐 선택</label>
                    <select
                      className="w-full p-2 border rounded"
                      value={selectedAsset?.id || ""}
                      onChange={(e) => {
                        const selected = cryptos.find((s) => s.id === e.target.value)
                        setSelectedAsset(selected || null)
                      }}
                    >
                      <option value="">암호화폐를 선택하세요</option>
                      {cryptos.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                          {crypto.name} - {formatNumber(crypto.price)}원
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedAsset && (
                    <>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">수량</label>
                        <input
                          type="number"
                          min="0.0001"
                          step="0.0001"
                          value={quantity}
                          onChange={(e) => setQuantity(Number.parseFloat(e.target.value) || 0)}
                          className="w-full p-2 border rounded"
                        />
                      </div>

                      <div className="mb-4">
                        <div className="text-sm text-gray-500">총 금액</div>
                        <div className="text-lg font-bold">{formatNumber(selectedAsset.price * quantity)}원</div>
                      </div>

                      <button
                        onClick={handleBuy}
                        disabled={
                          !gameState.isGameRunning || quantity <= 0 || selectedAsset.price * quantity > gameState.cash
                        }
                        className="w-full bg-blue-500 text-white py-2 rounded font-medium disabled:bg-gray-300"
                      >
                        매수
                      </button>
                    </>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">보유 자산</h3>

            {gameState.assets.length === 0 ? (
              <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">보유 중인 자산이 없습니다.</div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-500 border-b">
                      <th className="pb-2">종목</th>
                      <th className="pb-2">수량</th>
                      <th className="pb-2">현재가</th>
                      <th className="pb-2">평가금액</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {gameState.assets.map((asset) => (
                      <tr key={asset.assetId} className="border-b last:border-0">
                        <td className="py-3">{asset.name}</td>
                        <td className="py-3">{asset.quantity}</td>
                        <td className="py-3">{formatNumber(asset.price)}원</td>
                        <td className="py-3">{formatNumber(asset.totalValue)}원</td>
                        <td className="py-3">
                          <button
                            onClick={() => handleSell(asset.assetId, asset.quantity)}
                            disabled={!gameState.isGameRunning}
                            className="px-2 py-1 bg-red-500 text-white text-xs rounded disabled:bg-gray-300"
                          >
                            매도
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6">
              <h4 className="font-medium mb-2">자산 분포</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                {gameState.assets.length > 0 ? (
                  <Chart options={portfolioChartOptions} series={portfolioChartSeries} type="pie" height={250} />
                ) : (
                  <div className="h-[250px] flex items-center justify-center text-gray-500">자산 데이터가 없습니다</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
