"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X, TrendingUp, DollarSign, BarChart2, RefreshCw, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppStore } from "@/lib/store"
import { getAssetsByType, formatNumber } from "@/lib/data-service"
import dynamic from "next/dynamic"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function UnifiedGame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const {
    gameState,
    updateGameState,
    buyAsset,
    sellAsset,
    clickGameState,
    addCoins,
    buyUpgrade,
    updateClickGameState,
  } = useAppStore()
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [quantity, setQuantity] = useState(0)
  const [assetType, setAssetType] = useState<"stock" | "crypto">("stock")
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; value: number; id: number }[]>([])
  const [nextEffectId, setNextEffectId] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [activeTab, setActiveTab] = useState("investment")

  const stocks = getAssetsByType("stock")
  const cryptos = getAssetsByType("crypto")

  // Auto-click effect
  useEffect(() => {
    if (!isOpen) return

    if (clickGameState.autoClickRate <= 0) return

    const interval = setInterval(() => {
      addCoins(clickGameState.autoClickRate)
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, clickGameState.autoClickRate, addCoins])

  // Game simulation
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

  // Click effect animation
  useEffect(() => {
    if (clickEffect.length === 0) return

    const timeout = setTimeout(() => {
      setClickEffect((prev) => prev.filter((effect) => effect.id !== prev[0].id))
    }, 1000)

    return () => clearTimeout(timeout)
  }, [clickEffect])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const earnedCoins = clickGameState.clickPower
    addCoins(earnedCoins)

    // Also add to investment cash
    updateGameState({ cash: gameState.cash + earnedCoins })

    // Add click effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setClickEffect((prev) => [...prev, { x, y, value: earnedCoins, id: nextEffectId }])
      setNextEffectId((prev) => prev + 1)
    }
  }

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

  // Prepare data for progress chart
  const progressChartOptions = {
    chart: {
      type: "bar" as const,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top" as const,
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
      formatter: (val: number) => val.toFixed(0) + "%",
    },
    xaxis: {
      categories: clickGameState.upgrades.map((u) => `${u.name} Lv.${u.level}`),
      max: 100,
    },
    colors: ["#3b82f6"],
  }

  const progressChartSeries = [
    {
      name: "진행도",
      data: clickGameState.upgrades.map((upgrade) => {
        const cost = Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level))
        return Math.min((clickGameState.coins / cost) * 100, 100)
      }),
    },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">투자 & 클릭 게임</h2>

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

          <div>
            <div className="text-sm text-gray-500">클릭 코인</div>
            <div className="text-xl font-bold">{formatNumber(clickGameState.coins)}코인</div>
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

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="investment" className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1" /> 모의투자
            </TabsTrigger>
            <TabsTrigger value="click" className="flex items-center">
              <span className="mr-1">👆</span> 클릭 수익
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-1" /> 포트폴리오
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" /> 통계
            </TabsTrigger>
          </TabsList>

          <TabsContent value="investment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                  자산 매수
                </h3>

                <Tabs defaultValue={assetType} onValueChange={(value) => setAssetType(value as "stock" | "crypto")}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="stock" className="flex items-center">
                      <span className="mr-1">📈</span> 주식
                    </TabsTrigger>
                    <TabsTrigger value="crypto" className="flex items-center">
                      <span className="mr-1">₿</span> 암호화폐
                    </TabsTrigger>
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
                              {stock.logo} {stock.name} - {formatNumber(stock.price)}원
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
                              !gameState.isGameRunning ||
                              quantity <= 0 ||
                              selectedAsset.price * quantity > gameState.cash
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
                              {crypto.logo} {crypto.name} - {formatNumber(crypto.price)}원
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
                              !gameState.isGameRunning ||
                              quantity <= 0 ||
                              selectedAsset.price * quantity > gameState.cash
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
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                  보유 자산
                </h3>

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
              </div>
            </div>
          </TabsContent>

          <TabsContent value="click">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <div className="bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center min-h-[400px] relative">
                  <div className="text-center mb-8">
                    <div className="text-4xl font-bold mb-2">{formatNumber(clickGameState.coins)} 코인</div>
                    <div className="text-gray-500">
                      클릭 파워: {formatNumber(clickGameState.clickPower)} | 초당 자동 수익:{" "}
                      {formatNumber(clickGameState.autoClickRate)}
                    </div>
                  </div>

                  <button
                    ref={buttonRef}
                    onClick={handleClick}
                    className="w-40 h-40 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg transform transition-transform active:scale-95 relative overflow-hidden"
                  >
                    👆{/* Click effects */}
                    {clickEffect.map((effect) => (
                      <div
                        key={effect.id}
                        className="absolute text-white font-bold animate-float-up pointer-events-none"
                        style={{
                          left: `${effect.x}px`,
                          top: `${effect.y}px`,
                          animation: "float-up 1s ease-out forwards",
                        }}
                      >
                        +{effect.value}
                      </div>
                    ))}
                  </button>

                  <div className="mt-4 text-sm text-gray-500">
                    클릭으로 번 코인은 자동으로 투자 현금으로 전환됩니다!
                  </div>

                  <div className="mt-8 w-full">
                    <Chart options={progressChartOptions} series={progressChartSeries} type="bar" height={250} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  업그레이드
                </h3>

                <div className="bg-gray-50 p-4 rounded-lg space-y-3 max-h-[500px] overflow-y-auto">
                  {clickGameState.upgrades.map((upgrade) => {
                    const cost = Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level))
                    const upgradeIcon = upgrade.id % 2 === 1 ? "👆" : "⏱️"

                    return (
                      <div key={upgrade.id} className="border-b pb-3 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium flex items-center">
                              <span className="mr-1">{upgradeIcon}</span> {upgrade.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              레벨 {upgrade.level} | +{upgrade.power} {upgrade.id % 2 === 1 ? "클릭 파워" : "자동 수익"}
                            </div>
                          </div>
                          <button
                            onClick={() => buyUpgrade(upgrade.id)}
                            disabled={clickGameState.coins < cost}
                            className={`px-3 py-1 text-white text-sm rounded ${
                              clickGameState.coins >= cost ? "bg-green-500 hover:bg-green-600" : "bg-gray-300"
                            }`}
                          >
                            {formatNumber(cost)} 코인
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                  자산 분포
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {gameState.assets.length > 0 ? (
                    <Chart options={portfolioChartOptions} series={portfolioChartSeries} type="pie" height={350} />
                  ) : (
                    <div className="h-[350px] flex items-center justify-center text-gray-500">
                      자산 데이터가 없습니다
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  자산 요약
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">총 자산 가치</span>
                      <span className="text-lg font-bold">{formatNumber(totalPortfolioValue)}원</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">현금</span>
                      <span>{formatNumber(gameState.cash)}원</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">투자 자산</span>
                      <span>{formatNumber(gameState.assets.reduce((sum, asset) => sum + asset.totalValue, 0))}원</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">보유 종목 수</span>
                      <span>{gameState.assets.length}개</span>
                    </div>

                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">클릭 코인</span>
                      <span>{formatNumber(clickGameState.coins)}코인</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">게임 시간</span>
                      <span>{formatTime(gameState.gameTime)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
                  투자 통계
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">초기 자본</span>
                      <span className="font-medium">10,000,000원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">현재 자산</span>
                      <span className="font-medium">{formatNumber(totalPortfolioValue)}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">수익률</span>
                      <span
                        className={
                          totalPortfolioValue > 10000000 ? "font-medium text-red-500" : "font-medium text-blue-500"
                        }
                      >
                        {((totalPortfolioValue / 10000000 - 1) * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">거래 횟수</span>
                      <span className="font-medium">{Math.floor(gameState.gameTime / 60)}회</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2 text-blue-500" />
                  클릭 통계
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">총 클릭 파워</span>
                      <span className="font-medium">{formatNumber(clickGameState.clickPower)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">초당 수익</span>
                      <span className="font-medium">{formatNumber(clickGameState.autoClickRate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">총 업그레이드</span>
                      <span className="font-medium">
                        {clickGameState.upgrades.reduce((sum, upgrade) => sum + upgrade.level, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">다음 목표</span>
                      <span className="font-medium">
                        {formatNumber(
                          Math.min(...clickGameState.upgrades.map((u) => Math.floor(u.cost * Math.pow(1.5, u.level)))),
                        )}{" "}
                        코인
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-blue-500" />
                  게임 정보
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">게임 시간</span>
                      <span className="font-medium">{formatTime(gameState.gameTime)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">게임 상태</span>
                      <span className="font-medium">
                        {gameState.isGameRunning ? (
                          <span className="text-green-500">실행 중</span>
                        ) : (
                          <span className="text-red-500">일시 정지</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">마지막 저장</span>
                      <span className="font-medium">{lastSaved ? lastSaved.toLocaleTimeString() : "저장 없음"}</span>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => setLastSaved(new Date())}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        게임 저장
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
