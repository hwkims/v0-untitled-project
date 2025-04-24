export default function StockInfo({ stock }: { stock: any }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-bold mb-4">기업정보</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">시가총액</span>
            <span className="font-medium">{(stock.marketCap / 1000000000000).toFixed(2)}조원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">52주 최고</span>
            <span className="font-medium">88,800원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">52주 최저</span>
            <span className="font-medium">49,900원</span>
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
        <h3 className="text-lg font-bold mb-4">기업개요</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          삼성전자는 1969년 설립된 기업으로 반도체, 전자 제품을 제조, 판매하고 있습니다. 세계 최고 수준의 메모리
          반도체와 스마트폰, TV 등 가전제품을 생산하며 글로벌 시장을 선도하고 있습니다.
        </p>

        <h4 className="text-md font-bold mt-4 mb-2">실적 추이</h4>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">매출액</div>
            <div className="font-medium">302조 원</div>
            <div className="text-xs text-red-500">+8.7%</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">영업이익</div>
            <div className="font-medium">43.4조 원</div>
            <div className="text-xs text-red-500">+12.2%</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">순이익</div>
            <div className="font-medium">36.9조 원</div>
            <div className="text-xs text-red-500">+9.8%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
