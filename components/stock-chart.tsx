"use client"

import { useEffect, useRef, useState } from "react"

interface StockChartProps {
  stockCode: string
  timeFrame: string
  isCrypto?: boolean
}

export default function StockChart({ stockCode, timeFrame, isCrypto = false }: StockChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const [chartData, setChartData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch chart data based on stock code and timeframe
    const fetchChartData = async () => {
      setIsLoading(true)

      try {
        // In a real app, this would be an API call
        // For now, we'll generate mock data
        const mockData = generateMockChartData(timeFrame, isCrypto)
        setChartData(mockData)
      } catch (error) {
        console.error("Failed to fetch chart data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchChartData()
  }, [stockCode, timeFrame, isCrypto])

  useEffect(() => {
    if (!chartContainerRef.current || chartData.length === 0) return

    // We'll use a simple canvas-based chart to avoid runtime errors
    const canvas = document.createElement("canvas")
    canvas.width = chartContainerRef.current.clientWidth
    canvas.height = 350
    chartContainerRef.current.innerHTML = ""
    chartContainerRef.current.appendChild(canvas)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Draw chart
    drawChart(ctx, canvas.width, canvas.height, chartData)

    const handleResize = () => {
      if (!chartContainerRef.current) return
      canvas.width = chartContainerRef.current.clientWidth
      canvas.height = 350
      drawChart(ctx, canvas.width, canvas.height, chartData)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [chartData])

  const drawChart = (ctx: CanvasRenderingContext2D, width: number, height: number, data: any[]) => {
    if (data.length === 0) return

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set padding
    const padding = { top: 20, right: 20, bottom: 30, left: 50 }
    const chartWidth = width - padding.left - padding.right
    const chartHeight = height - padding.top - padding.bottom

    // Find min and max values
    const values = data.map((d) => d.value)
    const minValue = Math.min(...values) * 0.99
    const maxValue = Math.max(...values) * 1.01

    // Draw grid
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 1

    // Horizontal grid lines
    for (let i = 0; i <= 5; i++) {
      const y = padding.top + (chartHeight / 5) * i
      ctx.beginPath()
      ctx.moveTo(padding.left, y)
      ctx.lineTo(width - padding.right, y)
      ctx.stroke()

      // Price labels
      const price = maxValue - ((maxValue - minValue) / 5) * i
      ctx.fillStyle = "#666"
      ctx.font = "10px Arial"
      ctx.textAlign = "right"
      ctx.fillText(price.toFixed(0), padding.left - 5, y + 3)
    }

    // Draw line
    ctx.strokeStyle = "rgba(33, 150, 243, 1)"
    ctx.lineWidth = 2
    ctx.beginPath()

    // Map data points to canvas coordinates
    data.forEach((d, i) => {
      const x = padding.left + (chartWidth / (data.length - 1)) * i
      const y = padding.top + chartHeight - ((d.value - minValue) / (maxValue - minValue)) * chartHeight

      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Fill area under the line
    ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
    ctx.lineTo(padding.left, padding.top + chartHeight)
    ctx.fillStyle = "rgba(33, 150, 243, 0.1)"
    ctx.fill()

    // Draw time labels
    ctx.fillStyle = "#666"
    ctx.font = "10px Arial"
    ctx.textAlign = "center"

    // Only show a few time labels to avoid crowding
    const labelCount = Math.min(6, data.length)
    for (let i = 0; i < labelCount; i++) {
      const index = Math.floor((data.length - 1) * (i / (labelCount - 1)))
      const x = padding.left + (chartWidth / (data.length - 1)) * index
      const time = new Date(data[index].time * 1000)

      let timeLabel
      if (timeFrame === "1D") {
        timeLabel = time.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })
      } else {
        timeLabel = time.toLocaleDateString("ko-KR", { month: "numeric", day: "numeric" })
      }

      ctx.fillText(timeLabel, x, height - 10)
    }
  }

  const generateMockChartData = (timeFrame: string, isCrypto: boolean) => {
    const data = []
    const now = new Date()
    let startDate: Date
    const baseValue = isCrypto ? 45000000 : 55500 // Bitcoin in KRW vs Samsung stock

    switch (timeFrame) {
      case "1D":
        startDate = new Date(now)
        startDate.setHours(9, 0, 0, 0)
        for (let i = 0; i <= 390; i += 10) {
          // 9:00 to 15:30 (6.5 hours = 390 minutes)
          const time = new Date(startDate)
          time.setMinutes(time.getMinutes() + i)
          if (time > now) break

          const volatility = isCrypto ? 0.02 : 0.01 // Crypto is more volatile
          const randomChange = Math.random() * baseValue * volatility - (baseValue * volatility) / 2
          data.push({
            time: time.getTime() / 1000,
            value: baseValue + randomChange,
          })
        }
        break

      case "1W":
        startDate = new Date(now)
        startDate.setDate(now.getDate() - 7)
        for (let i = 0; i <= 7; i++) {
          const time = new Date(startDate)
          time.setDate(time.getDate() + i)
          if (time > now) break

          const volatility = isCrypto ? 0.03 : 0.015
          const randomChange = Math.random() * baseValue * volatility - (baseValue * volatility) / 2
          data.push({
            time: time.getTime() / 1000,
            value: baseValue + randomChange,
          })
        }
        break

      case "1M":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 1)
        for (let i = 0; i <= 30; i++) {
          const time = new Date(startDate)
          time.setDate(time.getDate() + i)
          if (time > now) break

          const volatility = isCrypto ? 0.05 : 0.02
          const randomChange = Math.random() * baseValue * volatility - (baseValue * volatility) / 2
          data.push({
            time: time.getTime() / 1000,
            value: baseValue + randomChange,
          })
        }
        break

      case "3M":
        startDate = new Date(now)
        startDate.setMonth(now.getMonth() - 3)
        for (let i = 0; i <= 90; i += 3) {
          const time = new Date(startDate)
          time.setDate(time.getDate() + i)
          if (time > now) break

          const volatility = isCrypto ? 0.08 : 0.03
          const randomChange = Math.random() * baseValue * volatility - (baseValue * volatility) / 2
          data.push({
            time: time.getTime() / 1000,
            value: baseValue + randomChange,
          })
        }
        break

      case "1Y":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 1)
        for (let i = 0; i <= 365; i += 7) {
          const time = new Date(startDate)
          time.setDate(time.getDate() + i)
          if (time > now) break

          const volatility = isCrypto ? 0.15 : 0.06
          const randomChange = Math.random() * baseValue * volatility - (baseValue * volatility) / 2
          data.push({
            time: time.getTime() / 1000,
            value: baseValue + randomChange,
          })
        }
        break

      case "5Y":
        startDate = new Date(now)
        startDate.setFullYear(now.getFullYear() - 5)
        for (let i = 0; i <= 1825; i += 30) {
          const time = new Date(startDate)
          time.setDate(time.getDate() + i)
          if (time > now) break

          const volatility = isCrypto ? 0.3 : 0.12
          const randomChange = Math.random() * baseValue * volatility - (baseValue * volatility) / 2
          data.push({
            time: time.getTime() / 1000,
            value: baseValue + randomChange,
          })
        }
        break

      default:
        break
    }

    return data
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <div ref={chartContainerRef} className="h-full w-full" />
}
