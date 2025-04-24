import type { Asset, AssetType } from "./store"

// Stock data
const stockData: Asset[] = [
  {
    id: "samsung",
    code: "005930",
    name: "삼성전자",
    price: 55500,
    change: -0.36,
    changePercent: -0.36,
    volume: 7238000000,
    marketCap: 331000000000000,
    sector: "전자",
    type: "stock",
    logo: "💻",
  },
  {
    id: "sk-hynix",
    code: "000660",
    name: "SK하이닉스",
    price: 134000,
    change: 1.52,
    changePercent: 1.52,
    volume: 3500000000,
    marketCap: 97000000000000,
    sector: "반도체",
    type: "stock",
    logo: "🔌",
  },
  {
    id: "naver",
    code: "035420",
    name: "NAVER",
    price: 186500,
    change: 0.81,
    changePercent: 0.81,
    volume: 980000000,
    marketCap: 30600000000000,
    sector: "서비스",
    type: "stock",
    logo: "🔍",
  },
  {
    id: "kakao",
    code: "035720",
    name: "카카오",
    price: 49800,
    change: -0.4,
    changePercent: -0.4,
    volume: 1250000000,
    marketCap: 22100000000000,
    sector: "서비스",
    type: "stock",
    logo: "💬",
  },
  {
    id: "hyundai",
    code: "005380",
    name: "현대차",
    price: 175500,
    change: -1.13,
    changePercent: -1.13,
    volume: 850000000,
    marketCap: 37500000000000,
    sector: "자동차",
    type: "stock",
    logo: "🚗",
  },
  {
    id: "lg-chem",
    code: "051910",
    name: "LG화학",
    price: 388000,
    change: -0.26,
    changePercent: -0.26,
    volume: 320000000,
    marketCap: 27400000000000,
    sector: "화학",
    type: "stock",
    logo: "🧪",
  },
  {
    id: "samsung-biologics",
    code: "207940",
    name: "삼성바이오로직스",
    price: 788000,
    change: 0.51,
    changePercent: 0.51,
    volume: 110000000,
    marketCap: 52000000000000,
    sector: "제약",
    type: "stock",
    logo: "💊",
  },
  {
    id: "samsung-sdi",
    code: "006400",
    name: "삼성SDI",
    price: 426500,
    change: 1.67,
    changePercent: 1.67,
    volume: 430000000,
    marketCap: 29300000000000,
    sector: "전자",
    type: "stock",
    logo: "🔋",
  },
  {
    id: "doosan-enerbility",
    code: "042660",
    name: "두산에너빌리티",
    price: 16050,
    change: -0.62,
    changePercent: -0.62,
    volume: 2800000000,
    marketCap: 9700000000000,
    sector: "중공업",
    type: "stock",
    logo: "⚙️",
  },
  {
    id: "lg-energy",
    code: "373220",
    name: "LG에너지솔루션",
    price: 388000,
    change: 0.78,
    changePercent: 0.78,
    volume: 250000000,
    marketCap: 90700000000000,
    sector: "전자",
    type: "stock",
    logo: "🔋",
  },
]

// Crypto data
const cryptoData: Asset[] = [
  {
    id: "bitcoin",
    code: "BTC/KRW",
    name: "비트코인",
    price: 45000000,
    change: 2.1,
    changePercent: 2.1,
    marketCap: 850000000000000,
    volume: 25000000000000,
    symbol: "BTC",
    supply: 19000000,
    maxSupply: 21000000,
    type: "crypto",
    logo: "₿",
  },
  {
    id: "ethereum",
    code: "ETH/KRW",
    name: "이더리움",
    price: 2500000,
    change: 1.8,
    changePercent: 1.8,
    marketCap: 300000000000000,
    volume: 15000000000000,
    symbol: "ETH",
    supply: 120000000,
    maxSupply: null,
    type: "crypto",
    logo: "Ξ",
  },
  {
    id: "ripple",
    code: "XRP/KRW",
    name: "리플",
    price: 700,
    change: -0.5,
    changePercent: -0.5,
    marketCap: 35000000000000,
    volume: 2000000000000,
    symbol: "XRP",
    supply: 45000000000,
    maxSupply: 100000000000,
    type: "crypto",
    logo: "💧",
  },
  {
    id: "solana",
    code: "SOL/KRW",
    name: "솔라나",
    price: 120000,
    change: 3.2,
    changePercent: 3.2,
    marketCap: 50000000000000,
    volume: 5000000000000,
    symbol: "SOL",
    supply: 410000000,
    maxSupply: null,
    type: "crypto",
    logo: "☀️",
  },
  {
    id: "cardano",
    code: "ADA/KRW",
    name: "에이다",
    price: 550,
    change: 0.7,
    changePercent: 0.7,
    marketCap: 20000000000000,
    volume: 1500000000000,
    symbol: "ADA",
    supply: 35000000000,
    maxSupply: 45000000000,
    type: "crypto",
    logo: "🔷",
  },
  {
    id: "dogecoin",
    code: "DOGE/KRW",
    name: "도지코인",
    price: 120,
    change: -1.2,
    changePercent: -1.2,
    marketCap: 15000000000000,
    volume: 1000000000000,
    symbol: "DOGE",
    supply: 140000000000,
    maxSupply: null,
    type: "crypto",
    logo: "🐕",
  },
  {
    id: "polkadot",
    code: "DOT/KRW",
    name: "폴카닷",
    price: 8500,
    change: 1.5,
    changePercent: 1.5,
    marketCap: 10000000000000,
    volume: 800000000000,
    symbol: "DOT",
    supply: 1200000000,
    maxSupply: null,
    type: "crypto",
    logo: "⚫",
  },
  {
    id: "shiba-inu",
    code: "SHIB/KRW",
    name: "시바이누",
    price: 0.0035,
    change: -0.8,
    changePercent: -0.8,
    marketCap: 2000000000000,
    volume: 500000000000,
    symbol: "SHIB",
    supply: 589000000000000,
    maxSupply: null,
    type: "crypto",
    logo: "🐶",
  },
  {
    id: "polygon",
    code: "MATIC/KRW",
    name: "폴리곤",
    price: 950,
    change: 2.3,
    changePercent: 2.3,
    marketCap: 9000000000000,
    volume: 700000000000,
    symbol: "MATIC",
    supply: 9500000000,
    maxSupply: 10000000000,
    type: "crypto",
    logo: "🔷",
  },
  {
    id: "avalanche",
    code: "AVAX/KRW",
    name: "아발란체",
    price: 35000,
    change: 1.1,
    changePercent: 1.1,
    marketCap: 12000000000000,
    volume: 900000000000,
    symbol: "AVAX",
    supply: 350000000,
    maxSupply: 720000000,
    type: "crypto",
    logo: "❄️",
  },
]

// Combined data
const allAssets = [...stockData, ...cryptoData]

// Function to get all assets
export const getAllAssets = (): Asset[] => {
  return allAssets
}

// Function to get assets by type
export const getAssetsByType = (type: AssetType): Asset[] => {
  return allAssets.filter((asset) => asset.type === type)
}

// Function to get asset by ID
export const getAssetById = (id: string): Asset | undefined => {
  return allAssets.find((asset) => asset.id === id)
}

// Function to get asset by code
export const getAssetByCode = (code: string): Asset | undefined => {
  return allAssets.find((asset) => asset.code === code)
}

// Function to fetch real-time data from API
export const fetchRealTimeData = async (symbol: string) => {
  try {
    const response = await fetch(`/api/stock/${symbol}?period=1d&interval=1m`)
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching real-time data:", error)
    return null
  }
}

// Function to search assets
export const searchAssets = async (query: string) => {
  try {
    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error("Failed to search")
    }
    return await response.json()
  } catch (error) {
    console.error("Error searching assets:", error)
    return { results: [] }
  }
}

// Function to get chart data for an asset
export interface ChartData {
  timestamp: number
  value: number
}

export const getChartData = (assetId: string, timeFrame: string): ChartData[] => {
  const asset = getAssetById(assetId)
  if (!asset) return []

  const data: ChartData[] = []
  const now = new Date()
  let startDate: Date
  const baseValue = asset.price
  const volatility = asset.type === "crypto" ? 0.05 : 0.02

  switch (timeFrame) {
    case "1D":
      startDate = new Date(now)
      startDate.setHours(9, 0, 0, 0)
      for (let i = 0; i <= 390; i += 10) {
        const time = new Date(startDate)
        time.setMinutes(time.getMinutes() + i)
        if (time > now) break

        const randomChange = (Math.random() * 2 - 1) * baseValue * volatility
        data.push({
          timestamp: time.getTime(),
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

        const randomChange = (Math.random() * 2 - 1) * baseValue * volatility * 2
        data.push({
          timestamp: time.getTime(),
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

        const randomChange = (Math.random() * 2 - 1) * baseValue * volatility * 3
        data.push({
          timestamp: time.getTime(),
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

        const randomChange = (Math.random() * 2 - 1) * baseValue * volatility * 4
        data.push({
          timestamp: time.getTime(),
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

        const randomChange = (Math.random() * 2 - 1) * baseValue * volatility * 6
        data.push({
          timestamp: time.getTime(),
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

        const randomChange = (Math.random() * 2 - 1) * baseValue * volatility * 10
        data.push({
          timestamp: time.getTime(),
          value: baseValue + randomChange,
        })
      }
      break

    default:
      break
  }

  return data
}

// Function to get historical data for an asset
export interface HistoricalData {
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export const getHistoricalData = (assetId: string): HistoricalData[] => {
  const asset = getAssetById(assetId)
  if (!asset) return []

  const data: HistoricalData[] = []
  const now = new Date()
  const baseValue = asset.price
  const volatility = asset.type === "crypto" ? 0.05 : 0.02

  for (let i = 30; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    const dayVolatility = volatility * (Math.random() + 0.5)
    const open = baseValue * (1 + (Math.random() * 2 - 1) * dayVolatility)
    const high = open * (1 + Math.random() * dayVolatility)
    const low = open * (1 - Math.random() * dayVolatility)
    const close = low + Math.random() * (high - low)
    const volume = asset.volume * (0.5 + Math.random())

    data.push({
      date: date.toISOString().split("T")[0],
      open,
      high,
      low,
      close,
      volume,
    })
  }

  return data
}

// Function to get news for an asset
export interface NewsItem {
  id: string
  title: string
  content: string
  date: string
  source: string
  url: string
}

export const getNewsForAsset = (assetId: string): NewsItem[] => {
  const asset = getAssetById(assetId)
  if (!asset) return []

  const now = new Date()

  if (asset.type === "stock") {
    return [
      {
        id: "1",
        title: `${asset.name}, 신형 제품 출시로 주가 상승 기대`,
        content: `${asset.name}이(가) 다음 달 신형 제품을 출시할 예정이며, 이에 따라 주가 상승이 기대됩니다. 업계 전문가들은 이번 제품이 시장에서 좋은 반응을 얻을 것으로 예상하고 있습니다.`,
        date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        source: "경제신문",
        url: "#",
      },
      {
        id: "2",
        title: `${asset.name}, 분기 실적 발표... 예상치 상회`,
        content: `${asset.name}이(가) 오늘 분기 실적을 발표했습니다. 매출은 전년 동기 대비 15% 증가했으며, 영업이익은 20% 증가했습니다. 이는 시장 예상치를 상회하는 결과입니다.`,
        date: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: "투자저널",
        url: "#",
      },
      {
        id: "3",
        title: `${asset.name}, 해외 시장 진출 확대 계획 발표`,
        content: `${asset.name}이(가) 해외 시장 진출 확대 계획을 발표했습니다. 특히 동남아시아와 유럽 시장에 집중할 예정이며, 이를 통해 글로벌 경쟁력을 강화할 계획입니다.`,
        date: new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        source: "글로벌비즈",
        url: "#",
      },
    ]
  } else {
    return [
      {
        id: "1",
        title: `${asset.name}, 24시간 거래량 급증... 가격 상승세`,
        content: `${asset.name}의 24시간 거래량이 급증하면서 가격이 상승세를 보이고 있습니다. 전문가들은 이번 상승세가 당분간 지속될 것으로 전망하고 있습니다.`,
        date: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        source: "코인데일리",
        url: "#",
      },
      {
        id: "2",
        title: `${asset.name}, 주요 거래소 추가 상장 소식`,
        content: `${asset.name}이(가) 글로벌 주요 거래소에 추가 상장될 예정입니다. 이에 따라 유동성 증가와 가격 상승이 기대됩니다.`,
        date: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        source: "크립토뉴스",
        url: "#",
      },
      {
        id: "3",
        title: `${asset.name}, 새로운 기술 업데이트 발표`,
        content: `${asset.name} 개발팀이 새로운 기술 업데이트를 발표했습니다. 이번 업데이트는 네트워크 속도와 보안성을 크게 향상시킬 것으로 기대됩니다.`,
        date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: "블록체인타임스",
        url: "#",
      },
    ]
  }
}

// Function to update asset prices (simulate real-time updates)
export const updateAssetPrices = (): Asset[] => {
  return allAssets.map((asset) => {
    const volatility = asset.type === "crypto" ? 0.02 : 0.01
    const randomChange = (Math.random() * 2 - 1) * asset.price * volatility
    const newPrice = asset.price + randomChange
    const changePercent = (randomChange / asset.price) * 100

    return {
      ...asset,
      price: newPrice,
      change: changePercent,
      changePercent: changePercent,
    }
  })
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("ko-KR").format(value)
}

export const formatCurrency = (value: number): string => {
  if (value >= 1000000000000) {
    return `${(value / 1000000000000).toFixed(2)}조원`
  } else if (value >= 100000000) {
    return `${(value / 100000000).toFixed(2)}억원`
  } else if (value >= 10000) {
    return `${(value / 10000).toFixed(2)}만원`
  } else {
    return `${value.toFixed(2)}원`
  }
}

export const formatChange = (value: number): string => {
  return value > 0 ? `+${value.toFixed(2)}%` : `${value.toFixed(2)}%`
}

export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
