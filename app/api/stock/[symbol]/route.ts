import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { symbol: string } }) {
  const symbol = params.symbol
  const searchParams = request.nextUrl.searchParams
  const period = searchParams.get("period") || "1d"
  const interval = searchParams.get("interval") || "1m"

  try {
    // In a real app, this would call the Python API
    // For now, we'll simulate the response

    // Generate mock data
    const now = new Date()
    const data = []
    const basePrice =
      symbol === "005930" ? 55500 : symbol === "000660" ? 134000 : symbol === "BTC-KRW" ? 45000000 : 100000

    // Generate data points
    for (let i = 0; i < 100; i++) {
      const timestamp = new Date(now)
      timestamp.setMinutes(now.getMinutes() - (100 - i))

      const volatility = symbol.includes("BTC") ? 0.02 : 0.01
      const randomChange = (Math.random() * 2 - 1) * basePrice * volatility
      const price = basePrice + randomChange

      data.push({
        timestamp: timestamp.getTime(),
        price: price,
      })
    }

    return NextResponse.json({
      symbol,
      data,
      info: {
        name:
          symbol === "005930"
            ? "삼성전자"
            : symbol === "000660"
              ? "SK하이닉스"
              : symbol === "BTC-KRW"
                ? "비트코인"
                : "Unknown",
        sector:
          symbol === "005930" ? "전자" : symbol === "000660" ? "반도체" : symbol === "BTC-KRW" ? "암호화폐" : "Unknown",
        marketCap:
          symbol === "005930"
            ? 331000000000000
            : symbol === "000660"
              ? 97000000000000
              : symbol === "BTC-KRW"
                ? 850000000000000
                : 10000000000000,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 })
  }
}
