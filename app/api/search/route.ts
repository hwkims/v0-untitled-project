import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || ""

  try {
    // In a real app, this would call the Python API
    // For now, we'll return mock results
    const results = [
      { id: "samsung", code: "005930", name: "삼성전자", type: "stock" },
      { id: "sk-hynix", code: "000660", name: "SK하이닉스", type: "stock" },
      { id: "bitcoin", code: "BTC/KRW", name: "비트코인", type: "crypto" },
      { id: "ethereum", code: "ETH/KRW", name: "이더리움", type: "crypto" },
    ].filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) || item.code.toLowerCase().includes(query.toLowerCase()),
    )

    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json({ error: "Failed to search" }, { status: 500 })
  }
}
