"use client"

import type React from "react"
import { useState, useRef } from "react"
import {
  Download,
  Play,
  Pause,
  Share2,
  AlertCircle,
  CheckCircle,
  DollarSign,
  FileText,
  ArrowRight,
  Video,
  Sparkles,
  LogOut,
  User,
  Wallet,
  Volume2,
  VolumeX,
  Maximize,
  Zap,
  Shield,
} from "lucide-react"

// Enhanced Video Display Component
interface VideoDisplayProps {
  videoUrl: string
  title?: string
  onClose?: () => void
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ videoUrl, title = "Generated Tutorial Video", onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: "Check out this AI-generated tutorial video!",
          url: videoUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(videoUrl)
        // Show toast notification
        const toast = document.createElement("div")
        toast.className = "fixed top-4 right-4 bg-weaveit-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        toast.textContent = "Video URL copied to clipboard!"
        document.body.appendChild(toast)
        setTimeout(() => document.body.removeChild(toast), 3000)
      } catch (error) {
        console.error("Failed to copy URL:", error)
      }
    }
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-weaveit-500 to-weaveit-600 rounded-xl flex items-center justify-center">
            <Play className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">AI-generated tutorial video</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="bg-gray-800/50 hover:bg-weaveit-500/20 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-gray-700/50"
            title="Share video"
          >
            <Share2 className="w-5 h-5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-800/50 hover:bg-red-500/20 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-gray-700/50"
              title="Close video"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Video Container */}
      <div
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group border border-gray-800/50"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src="/placeholder.svg?height=500&width=900&text=Sample+Tutorial+Video"
          className="w-full h-auto max-h-[60vh] object-contain"
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={(e) => {
            const video = e.target as HTMLVideoElement
            setCurrentTime(video.currentTime)
            setProgress((video.currentTime / video.duration) * 100)
          }}
          onLoadedMetadata={(e) => {
            const video = e.target as HTMLVideoElement
            setDuration(video.duration)
          }}
        >
          Your browser does not support the video tag.
        </video>

        {/* Custom Controls Overlay */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-all duration-300 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        >
          {/* Progress Bar */}
          <div className="w-full bg-gray-700/50 rounded-full h-1 mb-4">
            <div
              className="bg-gradient-to-r from-weaveit-500 to-weaveit-600 h-1 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="bg-weaveit-500 hover:bg-weaveit-600 text-white p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleMute}
                className="bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-200"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-white text-sm font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-200"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleDownload}
          className="flex-1 min-w-[200px] bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
        >
          <Download className="w-5 h-5" />
          <span>Download Video</span>
        </button>

        <button
          onClick={handleShare}
          className="flex-1 min-w-[200px] bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold py-4 px-6 rounded-xl border border-gray-700/50 hover:border-weaveit-500/50 transition-all duration-200 flex items-center justify-center space-x-3 backdrop-blur-sm"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Video</span>
        </button>
      </div>

      {/* Video Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-weaveit-500/10 to-weaveit-600/10 rounded-xl p-4 border border-weaveit-500/20 text-center backdrop-blur-sm">
          <div className="text-3xl mb-2">✨</div>
          <div className="text-sm text-white font-semibold">AI Generated</div>
          <div className="text-xs text-gray-400">Powered by WeaveIt</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/20 text-center backdrop-blur-sm">
          <div className="text-3xl mb-2">🎯</div>
          <div className="text-sm text-white font-semibold">High Quality</div>
          <div className="text-xs text-gray-400">Professional output</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/20 text-center backdrop-blur-sm">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-sm text-white font-semibold">Fast Creation</div>
          <div className="text-xs text-gray-400">Generated in minutes</div>
        </div>
      </div>
    </div>
  )
}

// Enhanced Script Form Component
interface ScriptFormProps {
  onVideoGenerated: (videoUrl: string, title: string) => void
}

const ScriptForm: React.FC<ScriptFormProps> = ({ onVideoGenerated }) => {
  const [script, setScript] = useState("")
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loadingStep, setLoadingStep] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!script.trim()) {
      setError("Please enter a script for your tutorial")
      return
    }

    if (!title.trim()) {
      setError("Please enter a title for your video")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    const steps = [
      "Analyzing your script...",
      "Generating AI narration...",
      "Creating visual elements...",
      "Rendering video...",
      "Finalizing output...",
    ]

    try {
      for (let i = 0; i < steps.length; i++) {
        setLoadingStep(steps[i])
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }

      setSuccess("Video generated successfully! 🎉")
      onVideoGenerated("/api/videos/demo-video.mp4", title)

      setScript("")
      setTitle("")
    } catch (err) {
      setError("Failed to generate video. Please try again.")
    } finally {
      setLoading(false)
      setLoadingStep("")
    }
  }

  const estimateVideoLength = (text: string) => {
    const words = text.trim().split(/\s+/).length
    const avgWordsPerMinute = 150
    const minutes = Math.ceil(words / avgWordsPerMinute)
    return minutes
  }

  const getScriptQuality = (text: string) => {
    const wordCount = text.trim().split(/\s+/).length
    if (wordCount < 50) return { quality: "Too short", color: "text-red-400" }
    if (wordCount < 150) return { quality: "Good", color: "text-yellow-400" }
    if (wordCount < 500) return { quality: "Excellent", color: "text-green-400" }
    return { quality: "Very long", color: "text-blue-400" }
  }

  const scriptQuality = getScriptQuality(script)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Input */}
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-semibold text-white">
          Video Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title for your tutorial video..."
          className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-weaveit-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          disabled={loading}
        />
      </div>

      {/* Script Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="script" className="block text-sm font-semibold text-white">
            Tutorial Script
          </label>
          <div className="flex items-center space-x-4 text-xs">
            {script.trim() && (
              <>
                <span className="text-gray-400">~{estimateVideoLength(script)} min video</span>
                <span className={`${scriptQuality.color} font-medium`}>{scriptQuality.quality}</span>
              </>
            )}
          </div>
        </div>
        <textarea
          id="script"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Enter your tutorial script here. Explain your code, concepts, or step-by-step instructions that you want to turn into a video tutorial..."
          rows={12}
          className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-weaveit-500 focus:border-transparent transition-all duration-200 resize-vertical backdrop-blur-sm"
          disabled={loading}
        />
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>
            {script.length} characters •{" "}
            {
              script
                .trim()
                .split(/\s+/)
                .filter((word) => word.length > 0).length
            }{" "}
            words
          </span>
          {script.length > 5000 && (
            <span className="text-amber-400 flex items-center">
              <AlertCircle className="w-3 h-3 mr-1" />
              Very long script may take more time to process
            </span>
          )}
        </div>
      </div>

      {/* Generation Button */}
      <button
        type="submit"
        disabled={loading || !script.trim() || !title.trim()}
        className={`
          relative overflow-hidden w-full py-6 px-8 rounded-xl font-semibold text-lg
          flex items-center justify-center space-x-3
          ${
            loading
              ? "bg-gray-700/50 cursor-not-allowed"
              : "bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700"
          }
          text-white shadow-lg hover:shadow-xl
          transform transition-all duration-300 hover:scale-[1.02]
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
          border border-weaveit-500/20
        `}
      >
        {loading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              <span>Generating Your Video...</span>
            </div>
            {loadingStep && <span className="text-sm text-weaveit-200">{loadingStep}</span>}
          </div>
        ) : (
          <>
            <Zap className="w-6 h-6" />
            <span>Generate Tutorial Video</span>
            <ArrowRight className="w-6 h-6" />
          </>
        )}
      </button>

      {/* Status Messages */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <span className="text-red-400">{error}</span>
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <span className="text-green-400">{success}</span>
        </div>
      )}

      {/* Cost Information */}
      <div className="bg-gradient-to-r from-weaveit-500/10 to-weaveit-600/10 border border-weaveit-500/30 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-weaveit-500/20 rounded-xl flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-weaveit-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">Generation Cost</h4>
            <p className="text-sm text-gray-400">Transparent pricing</p>
          </div>
        </div>
        <p className="text-sm text-gray-300 mb-2">
          Video generation requires a payment of <strong className="text-weaveit-400">$0.50</strong> in SOL to cover AI
          processing costs.
        </p>
        <p className="text-xs text-gray-400">💡 Payment is processed securely through your connected Solana wallet</p>
      </div>

      {/* Tips Section */}
      <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/30 backdrop-blur-sm">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">💡 Tips for Better Videos</h4>
            <p className="text-sm text-gray-400">Optimize your script for best results</p>
          </div>
        </div>
        <ul className="text-sm text-gray-300 space-y-2">
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-weaveit-500 rounded-full"></div>
            <span>Be clear and specific in your explanations</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-weaveit-500 rounded-full"></div>
            <span>Include step-by-step instructions</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-weaveit-500 rounded-full"></div>
            <span>Mention specific code examples or concepts</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-weaveit-500 rounded-full"></div>
            <span>Keep sections organized with clear transitions</span>
          </li>
        </ul>
      </div>
    </form>
  )
}

// Enhanced Wallet Connect Component
const WalletConnect: React.FC<{ onConnect: () => void }> = ({ onConnect }) => {
  const [connecting, setConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const wallets = [
    { name: "Phantom", icon: "👻", popular: true },
    { name: "Backpack", icon: "🎒", popular: true },
    { name: "Solflare", icon: "☀️", popular: false },
    { name: "Glow", icon: "✨", popular: false },
  ]

  const handleConnect = async (walletName: string) => {
    setSelectedWallet(walletName)
    setConnecting(true)

    try {
      // Simulate wallet connection without actual wallet integration
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setConnecting(false)
      onConnect()
    } catch (error) {
      console.error("Connection simulation error:", error)
      setConnecting(false)
      // Handle error gracefully without throwing
    }
  }

  return (
    <div className="space-y-6">
      {connecting && (
        <div className="bg-weaveit-500/10 border border-weaveit-500/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-weaveit-500 border-t-transparent"></div>
          <span className="text-white">Connecting to {selectedWallet}...</span>
        </div>
      )}

      {/* Wallet Options */}
      <div className="grid sm:grid-cols-2 gap-3">
        {wallets.map((wallet) => (
          <button
            key={wallet.name}
            onClick={() => handleConnect(wallet.name)}
            disabled={connecting}
            className="relative bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-weaveit-500/50 rounded-xl p-4 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 backdrop-blur-sm group"
          >
            {wallet.popular && (
              <div className="absolute -top-2 -right-2 bg-weaveit-500 text-white text-xs px-2 py-1 rounded-full">
                Popular
              </div>
            )}
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{wallet.icon}</span>
              <div className="text-left">
                <div className="text-white font-semibold">{wallet.name}</div>
                <div className="text-gray-400 text-sm">Connect wallet</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Security Features */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-5 h-5 text-green-400" />
            <h4 className="font-semibold text-white">Secure Connection</h4>
          </div>
          <p className="text-sm text-gray-400">
            Your wallet connection is encrypted and secure. We never store your private keys.
          </p>
        </div>

        <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-2">
            <Zap className="w-5 h-5 text-weaveit-500" />
            <h4 className="font-semibold text-white">Fast & Easy</h4>
          </div>
          <p className="text-sm text-gray-400">
            Connect in seconds and start generating videos immediately. No complex setup required.
          </p>
        </div>
      </div>
    </div>
  )
}

// Main WeaveIt App Component
export default function WeaveItApp() {
  const [connected, setConnected] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<{ url: string; title: string } | null>(null)
  const [videos, setVideos] = useState<Array<{ id: string; title: string; url: string; createdAt: string }>>([])

  const handleConnect = () => {
    setConnected(true)
  }

  const handleDisconnect = () => {
    setConnected(false)
    setCurrentVideo(null)
  }

  const handleVideoGenerated = (videoUrl: string, title: string) => {
    const newVideo = {
      id: Date.now().toString(),
      title,
      url: videoUrl,
      createdAt: new Date().toISOString(),
    }
    setVideos((prev) => [newVideo, ...prev])
    setCurrentVideo({ url: videoUrl, title })
  }

  // Show wallet connection if not connected
  if (!connected) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-12 border border-gray-700/30 shadow-2xl text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-weaveit-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-10 h-10 text-weaveit-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
            <p className="text-gray-400 mb-8">
              Connect your Solana wallet to start creating AI-powered tutorial videos
            </p>
          </div>
          <WalletConnect onConnect={handleConnect} />
        </div>
      </div>
    )
  }

  // App View
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0e17] to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-xl border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-weaveit-500 to-weaveit-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">WeaveIt Studio</h1>
                <p className="text-sm text-gray-400">AI Video Generator</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-700/50 backdrop-blur-sm">
                <div className="w-8 h-8 bg-weaveit-500/20 rounded-lg flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-weaveit-400" />
                </div>
                <div>
                  <div className="text-sm text-white font-medium">Connected</div>
                  <div className="text-xs text-gray-400">Solana Wallet</div>
                </div>
              </div>

              <button
                onClick={handleDisconnect}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center space-x-2 transition-all duration-200 backdrop-blur-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Script Form */}
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 shadow-2xl">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-weaveit-500/20 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-weaveit-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Create Tutorial Video</h2>
                  <p className="text-gray-400">Transform your script into an engaging video</p>
                </div>
              </div>
              <ScriptForm onVideoGenerated={handleVideoGenerated} />
            </div>

            {/* Video Display */}
            {currentVideo && (
              <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 shadow-2xl">
                <VideoDisplay
                  videoUrl={currentVideo.url}
                  title={currentVideo.title}
                  onClose={() => setCurrentVideo(null)}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/30 sticky top-28 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Video className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Your Videos</h3>
                  <p className="text-sm text-gray-400">{videos.length} videos created</p>
                </div>
              </div>

              {videos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Video className="w-10 h-10 text-gray-500" />
                  </div>
                  <p className="text-gray-400 mb-2">No videos yet</p>
                  <p className="text-sm text-gray-500">Create your first tutorial video to get started!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {videos.map((video) => (
                    <div
                      key={video.id}
                      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 hover:border-weaveit-500/30 transition-all duration-200 cursor-pointer hover:transform hover:scale-[1.02] backdrop-blur-sm group"
                      onClick={() => setCurrentVideo({ url: video.url, title: video.title })}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-weaveit-500/20 rounded-lg flex items-center justify-center group-hover:bg-weaveit-500/30 transition-colors">
                          <Play className="w-5 h-5 text-weaveit-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm truncate">
                            {video.title || "Untitled Video"}
                          </h4>
                          <p className="text-xs text-gray-400">{new Date(video.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
