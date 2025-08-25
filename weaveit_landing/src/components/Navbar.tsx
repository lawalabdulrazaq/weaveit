"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Home, Zap } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isHomePage = pathname === "/"
  const isAppPage = pathname === "/app"

  return (
    <nav className="bg-[#0a0e17]/95 backdrop-blur-xl fixed w-full z-50 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  className="h-12 w-12 rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110"
                  src="/assets/weav12.jpg"
                  alt="WeaveIt Logo"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-weaveit-500/20 to-weaveit-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
                  WeaveIt
                </h1>
                <p className="text-xs text-gray-400">AI Video Generator</p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isHomePage
                    ? "text-weaveit-500 bg-weaveit-500/10 border border-weaveit-500/20"
                    : "text-gray-300 hover:text-weaveit-500 hover:bg-weaveit-500/5"
                }`}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Home
              </Link>
              <Link
                href="#features"
                className="text-gray-300 hover:text-weaveit-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-300 hover:text-weaveit-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                How It Works
              </Link>
              <Link
                href="#demo"
                className="text-gray-300 hover:text-weaveit-500 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Demo
              </Link>
              <Link
                href="/app"
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                  isAppPage
                    ? "bg-weaveit-600 text-white"
                    : "bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white transform hover:scale-105"
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Launch App</span>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-weaveit-500 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#0a0e17]/98 backdrop-blur-xl border-t border-gray-800/50">
          <Link
            href="/"
            className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
              isHomePage
                ? "text-weaveit-500 bg-weaveit-500/10"
                : "text-white hover:text-weaveit-500 hover:bg-gray-800/50"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            <Home className="w-4 h-4 inline mr-2" />
            Home
          </Link>
          <Link
            href="#features"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="#demo"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 block px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Demo
          </Link>
          <Link
            href="/app"
            className="bg-gradient-to-r from-weaveit-500 to-weaveit-600 text-white block px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 mt-4"
            onClick={() => setIsMenuOpen(false)}
          >
            <Zap className="w-4 h-4 inline mr-2" />
            Launch App
          </Link>
        </div>
      </div>
    </nav>
  )
}
