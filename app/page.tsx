import StockDashboard from "@/components/stock-dashboard"
import Providers from "./providers"

export default function Home() {
  return (
    <Providers>
      <StockDashboard />
    </Providers>
  )
}
