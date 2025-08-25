"use client"

import { ArrowDownCircle } from "lucide-react"

export default function Hero() {
  const handleLaunchApp = () => {
    // Scroll to the WeaveIt app section
    const appSection = document.getElementById("weaveit-app")
    if (appSection) {
      appSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative bg-[#0a0e17] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-[#0a0e17] sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="pt-20 mx-auto max-w-7xl px-4 sm:pt-24 sm:px-6 md:pt-32 lg:pt-32 lg:px-8 xl:pt-36">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block text-weaveit-500 xl:inline">Making Code</span>{" "}
                <span className="block text-white xl:inline">Simple.</span>
              </h1>
              <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Your gateway to automated video tutorials. No complexity, just seamless transformations.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <button
                    onClick={handleLaunchApp}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-weaveit-500 hover:bg-weaveit-600 md:py-4 md:text-lg md:px-10"
                  >
                    Launch App
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#solution"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-weaveit-700 bg-gray-100 hover:bg-gray-200 md:py-4 md:text-lg md:px-10"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full bg-[#0a0e17] sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=300"
              alt="WeaveIt App Demo"
              className="w-64 h-auto rounded-xl shadow-2xl transform rotate-6"
            />
            <div className="absolute inset-0 rounded-xl border border-weaveit-500/30 shadow-lg shadow-weaveit-500/20"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#solution">
          <ArrowDownCircle className="h-10 w-10 text-weaveit-500" />
          <span className="sr-only">Scroll down</span>
        </a>
      </div>
    </div>
  )
}
