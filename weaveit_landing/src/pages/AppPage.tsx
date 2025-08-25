"use client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import WeaveItApp from "../components/WeaveItApp"

export default function AppPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0e17] to-gray-900">
      {/* App Header */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 hover:text-white rounded-xl border border-gray-700/50 hover:border-weaveit-500/50 transition-all duration-200 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-white">WeaveIt Studio</h1>
              <p className="text-gray-400">Create AI-powered tutorial videos</p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* WeaveIt App Component with error handling */}
      <div className="relative">
        <WeaveItApp />
      </div>
    </div>
  )
}
