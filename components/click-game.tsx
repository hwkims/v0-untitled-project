"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useAppStore } from "@/lib/store"
import dynamic from "next/dynamic"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function ClickGame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { clickGameState, addCoins, buyUpgrade, resetClickGame, updateClickGameState } = useAppStore()
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; value: number; id: number }[]>([])
  const [nextEffectId, setNextEffectId] = useState(0)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Auto-click effect
  useEffect(() => {
    if (!isOpen) return

    if (clickGameState.autoClickRate <= 0) return

    const interval = setInterval(() => {
      addCoins(clickGameState.autoClickRate)
    }, 1000)

    return () => clearInterval(interval)
  }, [isOpen, clickGameState.autoClickRate, addCoins])

  // Auto-save effect
  useEffect(() => {
    if (!isOpen) return

    const interval = setInterval(() => {
      setLastSaved(new Date())
    }, 10000) // Save every 10 seconds

    return () => clearInterval(interval)
  }, [isOpen])

  // Click effect animation
  useEffect(() => {
    if (clickEffect.length === 0) return

    const timeout = setTimeout(() => {
      setClickEffect((prev) => prev.filter((effect) => effect.id !== prev[0].id))
    }, 1000)

    return () => clearTimeout(timeout)
  }, [clickEffect])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addCoins(clickGameState.clickPower)

    // Add click effect
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setClickEffect((prev) => [...prev, { x, y, value: clickGameState.clickPower, id: nextEffectId }])
      setNextEffectId((prev) => prev + 1)
    }
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B"
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    } else {
      return num.toString()
    }
  }

  if (!isOpen) return null

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
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6">클릭 수익 게임</h2>

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
                클릭!
                {/* Click effects */}
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

              <div className="mt-8 text-sm text-gray-500">
                {lastSaved && `마지막 저장: ${lastSaved.toLocaleTimeString()}`}
              </div>

              <div className="mt-8 w-full">
                <Chart options={progressChartOptions} series={progressChartSeries} type="bar" height={250} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">업그레이드</h3>

            <div className="bg-gray-50 p-4 rounded-lg space-y-3 max-h-[500px] overflow-y-auto">
              {clickGameState.upgrades.map((upgrade) => {
                const cost = Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level))

                return (
                  <div key={upgrade.id} className="border-b pb-3 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{upgrade.name}</div>
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

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setLastSaved(new Date())}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                저장
              </button>
              <button
                onClick={() => {
                  if (window.confirm("정말로 게임을 초기화하시겠습니까?")) {
                    resetClickGame()
                  }
                }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                초기화
              </button>
            </div>

            <div className="mt-6">
              <h4 className="font-medium mb-2">통계</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-500">총 클릭 파워</div>
                    <div className="font-medium">{formatNumber(clickGameState.clickPower)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">초당 수익</div>
                    <div className="font-medium">{formatNumber(clickGameState.autoClickRate)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">총 업그레이드</div>
                    <div className="font-medium">
                      {clickGameState.upgrades.reduce((sum, upgrade) => sum + upgrade.level, 0)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">다음 목표</div>
                    <div className="font-medium">
                      {formatNumber(
                        Math.min(...clickGameState.upgrades.map((u) => Math.floor(u.cost * Math.pow(1.5, u.level)))),
                      )}{" "}
                      코인
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
