"use client"

import { useAppStore } from "@/lib/store"
import { getNewsForAsset, formatDate } from "@/lib/data-service"
import { Newspaper, Calendar, ExternalLink } from "lucide-react"

export default function AssetNews() {
  const { currentAsset } = useAppStore()

  if (!currentAsset) {
    return (
      <div className="p-4 flex items-center justify-center">
        <div className="text-gray-500">자산을 선택해주세요</div>
      </div>
    )
  }

  const news = getNewsForAsset(currentAsset.id)

  return (
    <div className="space-y-4">
      {news.length > 0 ? (
        news.map((item) => (
          <div key={item.id} className="border-b pb-4 hover:bg-gray-50 p-3 rounded transition-colors">
            <h3 className="font-bold mb-1 text-blue-600 flex items-center">
              <Newspaper className="h-4 w-4 mr-1" />
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{item.content}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span className="font-medium">{item.source}</span>
              <span className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(item.date)}
              </span>
            </div>
            <div className="mt-2">
              <a
                href={item.url}
                className="text-xs text-blue-500 flex items-center hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                기사 원문 보기
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 py-8">뉴스를 불러오는 중입니다...</div>
      )}
    </div>
  )
}
