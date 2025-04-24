"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useAppStore } from "@/lib/store"
import { getChartData, type ChartData } from "@/lib/data-service"
import { Clock, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function AssetChart() {
  const { currentAsset, timeFrame, setTimeFrame } = useAppStore()
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (!currentAsset) return

    setIsLoading(true)
    const data = getChartData(currentAsset.id, timeFrame)
    setChartData(data)
    setIsLoading(false)
  }, [currentAsset, timeFrame])

  const refreshData = () => {
    if (!currentAsset) return

    setIsRefreshing(true)
    const data = getChartData(currentAsset.id, timeFrame)
    setChartData(data)

    // Simulate network delay
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const currentTime = new Date().toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  if (!currentAsset) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-gray-500">자산을 선택해주세요</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Prepare data for ApexCharts
  const series = [
    {
      name: currentAsset.name,
      data: chartData.map((point) => [point.timestamp, point.value]),
    },
  ]

  const options = {
    chart: {
      type: "area" as const,
      height: 350,
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: true,
        tools: {
          download: false,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
        },
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth" as const,
      width: 2,
      colors: [currentAsset.change >= 0 ? "#ef4444" : "#3b82f6"],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 100],
        colorStops: [
          {
            offset: 0,
            color: currentAsset.change >= 0 ? "rgba(239, 68, 68, 0.4)" : "rgba(59, 130, 246, 0.4)",
            opacity: 1,
          },
          {
            offset: 100,
            color: currentAsset.change >= 0 ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)",
            opacity: 1,
          },
        ],
      },
    },
    xaxis: {
      type: "datetime" as const,
      labels: {
        formatter: (val: number) => {
          const date = new Date(val)
          if (timeFrame === "1D") {
            return format(date, "HH:mm", { locale: ko })
          } else if (timeFrame === "1W" || timeFrame === "1M") {
            return format(date, "MM/dd", { locale: ko })
          } else {
            return format(date, "yy/MM/dd", { locale: ko })
          }
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => new Intl.NumberFormat("ko-KR").format(val),
      },
      tickAmount: 5,
      forceNiceScale: true,
    },
    tooltip: {
      x: {
        format: timeFrame === "1D" ? "HH:mm" : "yyyy-MM-dd",
      },
      y: {
        formatter: (val: number) => new Intl.NumberFormat("ko-KR").format(val) + "원",
      },
      theme: "light",
      style: {
        fontSize: "12px",
        fontFamily: "Inter, sans-serif",
      },
    },
    grid: {
      borderColor: "#f3f4f6",
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    markers: {
      size: 0,
      strokeWidth: 0,
      hover: {
        size: 5,
        sizeOffset: 3,
      },
    },
    theme: {
      mode: "light",
    },
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="p-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex space-x-1 overflow-x-auto">
          {["1D", "1W", "1M", "3M", "1Y", "5Y"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeFrame(tf)}
              className={`px-3 py-1 rounded text-sm ${
                timeFrame === tf ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={refreshData} className="p-1.5 rounded hover:bg-gray-100" disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 text-gray-500 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 inline mr-1" />
            {currentTime} 기준
          </div>
        </div>
      </div>

      <div className="p-4 h-[400px]">
        <Chart options={options} series={series} type="area" height="100%" />
      </div>
    </div>
  )
}
