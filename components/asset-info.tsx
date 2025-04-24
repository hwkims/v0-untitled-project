"use client"

import { useAppStore } from "@/lib/store"
import { formatCurrency } from "@/lib/data-service"
import { TrendingUp, Info, DollarSign, BarChart } from "lucide-react"

export default function AssetInfo() {
  const { currentAsset } = useAppStore()

  if (!currentAsset) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="text-gray-500">자산을 선택해주세요</div>
      </div>
    )
  }

  if (currentAsset.type === "stock") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-500" />
            기업정보
          </h3>
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-500">시가총액</span>
              <span className="font-medium">{formatCurrency(currentAsset.marketCap)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">52주 최고</span>
              <span className="font-medium">{formatCurrency(currentAsset.price * 1.3)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">52주 최저</span>
              <span className="font-medium">{formatCurrency(currentAsset.price * 0.7)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">외국인비중</span>
              <span className="font-medium">50.03%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">PER</span>
              <span className="font-medium">9.8배</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">ROE</span>
              <span className="font-medium">12.4%</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-blue-500" />
            기업개요
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentAsset.name}는 {currentAsset.sector} 분야의 선도적인 기업으로, 글로벌 시장에서 높은 경쟁력을 갖추고
              있습니다. 지속적인 연구개발과 혁신을 통해 산업 내 선도적인 위치를 유지하고 있으며, 안정적인 성장세를
              보이고 있습니다.
            </p>

            <h4 className="text-md font-bold mt-4 mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1 text-red-500" />
              실적 추이
            </h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="text-gray-500">매출액</div>
                <div className="font-medium">{formatCurrency(currentAsset.marketCap * 0.3)}</div>
                <div className="text-xs text-red-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +8.7%
                </div>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="text-gray-500">영업이익</div>
                <div className="font-medium">{formatCurrency(currentAsset.marketCap * 0.04)}</div>
                <div className="text-xs text-red-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +12.2%
                </div>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="text-gray-500">순이익</div>
                <div className="font-medium">{formatCurrency(currentAsset.marketCap * 0.03)}</div>
                <div className="text-xs text-red-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +9.8%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-blue-500" />
            암호화폐 정보
          </h3>
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-gray-500">시가총액</span>
              <span className="font-medium">{formatCurrency(currentAsset.marketCap)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">24시간 거래량</span>
              <span className="font-medium">{formatCurrency(currentAsset.volume)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">유통 공급량</span>
              <span className="font-medium">
                {currentAsset.supply?.toLocaleString() || "19,000,000"} {currentAsset.symbol || "BTC"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">총 공급량</span>
              <span className="font-medium">
                {currentAsset.maxSupply?.toLocaleString() || "21,000,000"} {currentAsset.symbol || "BTC"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">52주 최고</span>
              <span className="font-medium">{formatCurrency(currentAsset.price * 1.5)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">52주 최저</span>
              <span className="font-medium">{formatCurrency(currentAsset.price * 0.6)}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-500" />
            암호화폐 개요
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 leading-relaxed">
              {currentAsset.name}은(는) 블록체인 기술을 기반으로 한 암호화폐로, 분산화된 네트워크를 통해 안전하고 투명한
              거래를 지원합니다. 글로벌 시장에서 높은 인지도와 유동성을 갖추고 있으며, 다양한 거래소에서 거래되고
              있습니다.
            </p>

            <h4 className="text-md font-bold mt-4 mb-2 flex items-center">
              <BarChart className="h-4 w-4 mr-1 text-blue-500" />
              주요 거래소
            </h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="text-gray-500">업비트</div>
                <div className="font-medium">{formatCurrency(currentAsset.price)}</div>
                <div className="text-xs text-red-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +2.1%
                </div>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="text-gray-500">바이낸스</div>
                <div className="font-medium">{formatCurrency(currentAsset.price * 0.99)}</div>
                <div className="text-xs text-red-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +1.9%
                </div>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="text-gray-500">코인베이스</div>
                <div className="font-medium">{formatCurrency(currentAsset.price * 1.01)}</div>
                <div className="text-xs text-red-500 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-0.5" />
                  +2.3%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
