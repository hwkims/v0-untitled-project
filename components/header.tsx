"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Search, Bell, User, Menu, X, ChevronDown, BarChart2 } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSection, setActiveSection] = useState("home")
  const isMobile = useMediaQuery({ maxWidth: 768 })

  // 네비게이션 항목 클릭 처리
  const handleNavClick = (section: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveSection(section)

    // 커스텀 이벤트 발생
    const event = new CustomEvent("navClick", { detail: section })
    window.dispatchEvent(event)

    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  return (
    <>
      <header className="border-b border-gray-200 px-4 py-2 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center mr-6" onClick={(e) => handleNavClick("home", e)}>
              <div className="bg-blue-500 text-white p-1.5 rounded-md mr-2 flex items-center justify-center">
                <BarChart2 className="h-4 w-4" />
              </div>
              <span className="font-bold text-sm">트레이드마스터</span>
              {!isMobile && <span className="text-blue-500 font-bold text-sm ml-2">실시간 시장 동향</span>}
            </Link>

            {isMobile && (
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-auto text-gray-600">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
          </div>

          {!isMobile && (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="종목 검색 (alt + s)"
                  className="bg-gray-100 rounded-full pl-10 pr-4 py-1.5 w-64 text-sm focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-2">
                <button className="text-blue-500 border border-blue-500 rounded px-2 py-1 text-xs">로그인</button>
                <button className="text-gray-600">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="text-gray-600">
                  <User className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>

        {/* Mobile search bar */}
        {isMobile && (
          <div className="mt-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="종목 검색"
              className="bg-gray-100 rounded-full pl-10 pr-4 py-1.5 w-full text-sm focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </header>

      {/* Navigation */}
      <nav className={`bg-gray-100 px-4 py-2 ${isMobile && !isMenuOpen ? "hidden" : ""}`}>
        <div className={`${isMobile ? "flex flex-col space-y-2" : "flex items-center space-x-6 overflow-x-auto"}`}>
          <Link
            href="#"
            className={`text-sm font-medium whitespace-nowrap ${activeSection === "home" ? "text-blue-600" : ""}`}
            onClick={(e) => handleNavClick("home", e)}
          >
            홈
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium whitespace-nowrap ${activeSection === "stocks" ? "text-blue-600" : ""}`}
            onClick={(e) => handleNavClick("stocks", e)}
          >
            주식
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium whitespace-nowrap ${activeSection === "futures" ? "text-blue-600" : ""}`}
            onClick={(e) => handleNavClick("futures", e)}
          >
            선물
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium whitespace-nowrap ${activeSection === "crypto" ? "text-blue-600" : ""}`}
            onClick={(e) => handleNavClick("crypto", e)}
          >
            암호화폐
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium whitespace-nowrap ${activeSection === "forex" ? "text-blue-600" : ""}`}
            onClick={(e) => handleNavClick("forex", e)}
          >
            외환
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium whitespace-nowrap ${activeSection === "indicators" ? "text-blue-600" : ""}`}
            onClick={(e) => handleNavClick("indicators", e)}
          >
            경제지표
          </Link>
          <Link
            href="#"
            className={`text-sm font-medium whitespace-nowrap ${activeSection === "news" ? "text-blue-600" : ""}`}
            onClick={(e) => handleNavClick("news", e)}
          >
            뉴스
          </Link>
          <div className="relative group">
            <button
              className={`text-sm font-medium flex items-center whitespace-nowrap ${activeSection === "tools" ? "text-blue-600" : ""}`}
              onClick={(e) => handleNavClick("tools", e)}
            >
              도구 <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md p-2 z-10 w-48">
              <Link
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                onClick={(e) => handleNavClick("calendar", e)}
              >
                경제 달력
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                onClick={(e) => handleNavClick("calculator", e)}
              >
                수익률 계산기
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                onClick={(e) => handleNavClick("technical", e)}
              >
                기술적 분석 도구
              </Link>
              <Link
                href="#"
                className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-md"
                onClick={(e) => {
                  document.getElementById("game-modal-trigger")?.click()
                  handleNavClick("game", e)
                }}
              >
                투자 & 클릭 게임
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
