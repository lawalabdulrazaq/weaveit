"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import Footer from "./components/Footer"
import ErrorBoundary from "./components/ErrorBoundary"
import "./App.css"

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason)
      event.preventDefault() // Prevent the default browser behavior
    }

    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0a0e17]">
        <div className="text-center">
          <div className="relative mb-8">
            <img src="/assets/weav12.jpg" alt="WeaveIt Logo" className="w-20 h-20 rounded-2xl mx-auto shadow-2xl" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-weaveit-500/20 to-weaveit-600/20 animate-pulse"></div>
          </div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-weaveit-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-300">Loading WeaveIt...</h2>
          <p className="text-gray-500 mt-2">Preparing your AI video studio</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <HomePage />
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  )
}

export default App
