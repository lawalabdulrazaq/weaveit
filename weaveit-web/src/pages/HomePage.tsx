"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import {
  Play,
  Pause,
  ArrowRight,
  Code,
  Video,
  Sparkles,
  Zap,
  FileText,
  Mic,
  Download,
  Star,
  Users,
  Clock,
  CheckCircle,
  ArrowDown,
  Volume2,
  VolumeX,
} from "lucide-react"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause()
        } else {
          videoRef.current.play().catch((error) => {
            console.log("Video play failed:", error)
            // Handle gracefully without throwing
          })
        }
        setIsPlaying(!isPlaying)
      } catch (error) {
        console.error("Video control error:", error)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0e17] to-gray-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-weaveit-500/5 to-weaveit-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-weaveit-500/10 border border-weaveit-500/20 rounded-full text-weaveit-400 text-sm font-medium">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Video Generation
                </div>
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                  Transform
                  <span className="block bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
                    Code to Video
                  </span>
                  in Minutes
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Turn your code explanations into professional tutorial videos with AI narration, visual slides, and
                  seamless audio generation. No video editing skills required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/app"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Creating
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <button
                  onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
                  className="inline-flex items-center justify-center px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-xl border border-gray-700/50 hover:border-weaveit-500/50 transition-all duration-200 backdrop-blur-sm"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No video editing required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>AI-powered narration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Professional quality</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gray-800/50 rounded-3xl p-8 backdrop-blur-sm border border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-weaveit-500/10 to-weaveit-600/10 rounded-3xl"></div>
                <div className="relative space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">WeaveIt Studio</span>
                  </div>

                  <div className="bg-gray-900/80 rounded-xl p-6 font-mono text-sm">
                    <div className="text-green-400 mb-2">// Your script input</div>
                    <div className="text-white">
                      <span className="text-blue-400">function</span>{" "}
                      <span className="text-yellow-400">createTutorial</span>() {"{"}
                    </div>
                    <div className="text-white ml-4">
                      <span className="text-purple-400">const</span> script ={" "}
                      <span className="text-green-300">"Explain React hooks..."</span>
                    </div>
                    <div className="text-white ml-4">
                      <span className="text-blue-400">return</span>{" "}
                      <span className="text-yellow-400">generateVideo</span>(script)
                    </div>
                    <div className="text-white">{"}"}</div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowDown className="w-6 h-6 text-weaveit-500 animate-bounce" />
                  </div>

                  <div className="bg-gray-900/80 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-medium">Generated Video</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400 text-xs">Ready</span>
                      </div>
                    </div>
                    <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                      <Play className="w-12 h-12 text-weaveit-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for
              <span className="block bg-gradient-to-r from-weaveit-500 to-weaveit-600 bg-clip-text text-transparent">
                Content Creators
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to create professional tutorial videos from your code and scripts
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: "Smart Code Analysis",
                description:
                  "AI automatically analyzes your code structure and creates logical explanations for each section.",
                gradient: "from-blue-500/10 to-purple-500/10",
                border: "border-blue-500/20",
                iconColor: "text-blue-400",
              },
              {
                icon: Mic,
                title: "Natural AI Narration",
                description: "Generate human-like voiceovers that explain your code clearly and professionally.",
                gradient: "from-weaveit-500/10 to-weaveit-600/10",
                border: "border-weaveit-500/20",
                iconColor: "text-weaveit-400",
              },
              {
                icon: Video,
                title: "Automatic Video Creation",
                description: "Combine code slides, narration, and visual effects into polished tutorial videos.",
                gradient: "from-green-500/10 to-emerald-500/10",
                border: "border-green-500/20",
                iconColor: "text-green-400",
              },
              {
                icon: FileText,
                title: "Script to Slides",
                description: "Transform written explanations into visually appealing slides with syntax highlighting.",
                gradient: "from-orange-500/10 to-red-500/10",
                border: "border-orange-500/20",
                iconColor: "text-orange-400",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Generate professional videos in minutes, not hours. Perfect for rapid content creation.",
                gradient: "from-yellow-500/10 to-orange-500/10",
                border: "border-yellow-500/20",
                iconColor: "text-yellow-400",
              },
              {
                icon: Download,
                title: "Multiple Formats",
                description:
                  "Export in various formats and resolutions. Perfect for YouTube, courses, or documentation.",
                gradient: "from-purple-500/10 to-pink-500/10",
                border: "border-purple-500/20",
                iconColor: "text-purple-400",
              },
            ].map((feature, index) => (
              <div
                key={feature.title}
                className={`bg-gradient-to-br ${feature.gradient} backdrop-blur-sm rounded-2xl p-8 border ${feature.border} hover:border-opacity-60 transition-all duration-300 hover:transform hover:scale-105 group`}
              >
                <div
                  className={`w-16 h-16 ${feature.iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How WeaveIt Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From script to professional video in just a few simple steps
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Write Your Script",
                description: "Input your code explanation or tutorial script into our editor",
                icon: FileText,
                color: "text-blue-400",
              },
              {
                step: "02",
                title: "AI Analysis",
                description: "Our AI analyzes your content and creates structured explanations",
                icon: Sparkles,
                color: "text-weaveit-400",
              },
              {
                step: "03",
                title: "Generate Narration",
                description: "AI creates natural-sounding voiceovers for your tutorial",
                icon: Mic,
                color: "text-green-400",
              },
              {
                step: "04",
                title: "Export Video",
                description: "Download your professional tutorial video ready for sharing",
                icon: Video,
                color: "text-purple-400",
              },
            ].map((step, index) => (
              <div key={step.step} className="relative">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-weaveit-500/30 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-gray-600">{step.step}</span>
                    <step.icon
                      className={`w-8 h-8 ${step.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">See WeaveIt in Action</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Watch how a simple script transforms into a professional tutorial video
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">script.txt</span>
                </div>

                <div className="bg-gray-900/80 rounded-xl p-6 font-mono text-sm space-y-2">
                  <div className="text-green-400">// Tutorial Script</div>
                  <div className="text-white">Today we'll learn about React useState hook.</div>
                  <div className="text-white">First, let's import useState from React.</div>
                  <div className="text-blue-400">import {"{ useState }"} from 'react'</div>
                  <div className="text-white">Now we can create a state variable...</div>
                  <div className="text-yellow-400">const [count, setCount] = useState(0)</div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4 bg-weaveit-500/10 border border-weaveit-500/20 rounded-full px-6 py-3">
                  <Sparkles className="w-5 h-5 text-weaveit-400 animate-pulse" />
                  <span className="text-weaveit-400 font-medium">AI Processing</span>
                  <ArrowRight className="w-5 h-5 text-weaveit-400" />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white font-medium">Generated Tutorial Video</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleMute}
                      className="p-2 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors duration-200"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Volume2 className="w-4 h-4 text-white" />
                      )}
                    </button>
                    <button
                      onClick={togglePlay}
                      className="p-2 bg-weaveit-500 hover:bg-weaveit-600 rounded-lg transition-colors duration-200"
                    >
                      {isPlaying ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                </div>

                <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    loop
                    poster="/placeholder.svg?height=400&width=600&text=React+useState+Tutorial"
                  >
                    <source src="/placeholder.svg?height=400&width=600&text=Sample+Tutorial+Video" type="video/mp4" />
                  </video>

                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <button
                        onClick={togglePlay}
                        className="w-16 h-16 bg-weaveit-500 hover:bg-weaveit-600 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110"
                      >
                        <Play className="w-8 h-8 text-white ml-1" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-gray-400">Duration: 2:34</span>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-gray-400">HD Quality</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-gray-400">AI Narrated</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Videos Created", icon: Video },
              { number: "5M+", label: "Minutes Saved", icon: Clock },
              { number: "98%", label: "User Satisfaction", icon: Star },
              { number: "50+", label: "Languages Supported", icon: Users },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="w-16 h-16 bg-weaveit-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-weaveit-400" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-weaveit-500/10 to-weaveit-600/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Content?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of creators who are already using WeaveIt to create amazing tutorial videos
          </p>
          <div className="flex justify-center">
            <Link
              href="/app"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Creating Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
