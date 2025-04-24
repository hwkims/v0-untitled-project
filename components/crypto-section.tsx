export default function CryptoSection({ crypto }: { crypto: any }) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-bold mb-4">암호화폐 정보</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500">시가총액</span>
            <span className="font-medium">{(crypto.marketCap / 1000000000000).toFixed(2)}조원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">24시간 거래량</span>
            <span className="font-medium">{(crypto.volume / 1000000000).toFixed(2)}십억원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">유통 공급량</span>
            <span className="font-medium">
              {crypto.supply?.toLocaleString() || "19,000,000"} {crypto.symbol || "BTC"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">총 공급량</span>
            <span className="font-medium">
              {crypto.maxSupply?.toLocaleString() || "21,000,000"} {crypto.symbol || "BTC"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">52주 최고</span>
            <span className="font-medium">{(crypto.price * 1.5).toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">52주 최저</span>
            <span className="font-medium">{(crypto.price * 0.6).toLocaleString()}원</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-4">암호화폐 개요</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {crypto.name || "비트코인"}은 2009년 사토시 나카모토에 의해 개발된 최초의 암호화폐입니다. 블록체인 기술을
          기반으로 하며, 중앙 기관 없이 P2P 네트워크를 통해 거래가 이루어집니다. 총 발행량은 2,100만 개로 제한되어 있어
          희소성을 가지고 있습니다.
        </p>

        <h4 className="text-md font-bold mt-4 mb-2">주요 거래소</h4>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">업비트</div>
            <div className="font-medium">{crypto.price?.toLocaleString() || "45,000,000"}원</div>
            <div className="text-xs text-red-500">+2.1%</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">바이낸스</div>
            <div className="font-medium">{(crypto.price * 0.99)?.toLocaleString() || "44,550,000"}원</div>
            <div className="text-xs text-red-500">+1.9%</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">코인베이스</div>
            <div className="font-medium">{(crypto.price * 1.01)?.toLocaleString() || "45,450,000"}원</div>
            <div className="text-xs text-red-500">+2.3%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
