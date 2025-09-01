"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useSolanaPayment } from "../../hooks/use-solana-payment"
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
  Music,
  VideoIcon,
  Headphones,
} from "lucide-react"

type OutputType = "video" | "audio" | "both"

// Enhanced Content Display Component (handles both video and audio)
interface ContentDisplayProps {
  contentUrl: string
  audioUrl?: string
  title?: string
  outputType: OutputType
  onClose?: () => void
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({
  contentUrl,
  audioUrl,
  title = "Generated Content",
  outputType,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = downloadUrl
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error("Download failed:", error)
    }
  }

  const handleVideoDownload = () => {
    const filename = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.mp4`
    handleDownload(contentUrl, filename)
  }

  const handleAudioDownload = () => {
    const filename = `${title.replace(/[^a-zA-Z0-9]/g, "_")}.mp3`
    const url = audioUrl || contentUrl
    handleDownload(url, filename)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this AI-generated ${outputType === "audio" ? "audio" : "tutorial"}!`,
          url: contentUrl,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      try {
        await navigator.clipboard.writeText(contentUrl)
        const toast = document.createElement("div")
        toast.className = "fixed top-4 right-4 bg-weaveit-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        toast.textContent = "Content URL copied to clipboard!"
        document.body.appendChild(toast)
        setTimeout(() => document.body.removeChild(toast), 3000)
      } catch (error) {
        console.error("Failed to copy URL:", error)
      }
    }
  }

  const togglePlay = () => {
    const mediaElement = outputType === "audio" ? audioRef.current : videoRef.current
    if (mediaElement) {
      if (isPlaying) {
        mediaElement.pause()
      } else {
        mediaElement.play()
      }
    }
  }

  const toggleMute = () => {
    const mediaElement = outputType === "audio" ? audioRef.current : videoRef.current
    if (mediaElement) {
      mediaElement.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen && outputType !== "audio") {
      videoRef.current.requestFullscreen()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const getContentIcon = () => {
    switch (outputType) {
      case "audio":
        return <Headphones className="w-6 h-6 text-white" />
      case "video":
        return <Play className="w-6 h-6 text-white" />
      case "both":
        return <VideoIcon className="w-6 h-6 text-white" />
    }
  }

  const getContentTypeLabel = () => {
    switch (outputType) {
      case "audio":
        return "AI-generated audio"
      case "video":
        return "AI-generated tutorial video"
      case "both":
        return "AI-generated video with audio"
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-weaveit-500 to-weaveit-600 rounded-xl flex items-center justify-center">
            {getContentIcon()}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-400">{getContentTypeLabel()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleShare}
            className="bg-gray-800/50 hover:bg-weaveit-500/20 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-gray-700/50"
            title="Share content"
          >
            <Share2 className="w-5 h-5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-800/50 hover:bg-red-500/20 text-white p-3 rounded-xl transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-gray-700/50"
              title="Close content"
            >
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl group border border-gray-800/50"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {outputType === "audio" ? (
          <div className="w-full h-64 bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-weaveit-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-10 h-10 text-weaveit-400" />
              </div>
              <h4 className="text-white font-semibold mb-2">Audio Content</h4>
              <p className="text-gray-400 text-sm">Click play to listen</p>
            </div>
            <audio
              ref={audioRef}
              src={contentUrl}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onTimeUpdate={(e) => {
                const audio = e.target as HTMLAudioElement
                setCurrentTime(audio.currentTime)
                setProgress((audio.currentTime / audio.duration) * 100)
              }}
              onLoadedMetadata={(e) => {
                const audio = e.target as HTMLAudioElement
                setDuration(audio.duration)
              }}
            />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={contentUrl}
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
        )}

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

            {outputType !== "audio" && (
              <button
                onClick={toggleFullscreen}
                className="bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full transition-all duration-200"
              >
                <Maximize className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        {(outputType === "video" || outputType === "both") && (
          <button
            onClick={handleVideoDownload}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Download Video</span>
          </button>
        )}

        {(outputType === "audio" || outputType === "both") && (
          <button
            onClick={handleAudioDownload}
            className="flex-1 min-w-[200px] bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Download Audio</span>
          </button>
        )}

        <button
          onClick={handleShare}
          className="flex-1 min-w-[200px] bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold py-4 px-6 rounded-xl border border-gray-700/50 hover:border-weaveit-500/50 transition-all duration-200 flex items-center justify-center space-x-3 backdrop-blur-sm"
        >
          <Share2 className="w-5 h-5" />
          <span>Share Content</span>
        </button>
      </div>

      {/* Content Stats */}
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

// Enhanced Script Form Component with Output Type Selection
interface ScriptFormProps {
  onContentGenerated: (contentUrl: string, title: string, outputType: OutputType, audioUrl?: string) => void
}

const ScriptForm: React.FC<ScriptFormProps> = ({ onContentGenerated }) => {
  const [script, setScript] = useState("")
  const [title, setTitle] = useState("")
  const [outputType, setOutputType] = useState<OutputType>("video") // Added output type state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loadingStep, setLoadingStep] = useState("")
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const { publicKey } = useWallet()

  const { sendPayment, getSolPrice, isProcessing } = useSolanaPayment()

  const getPrice = () => {
    switch (outputType) {
      case "audio":
        return 0.25 // $0.25 for audio only
      case "video":
        return 0.5 // $0.50 for video
      case "both":
        return 0.65 // $0.65 for both
      default:
        return 0.5
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!script.trim()) {
      setError("Please enter a script for your content")
      return
    }

    if (!title.trim()) {
      setError("Please enter a title for your content")
      return
    }

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      setLoadingStep("Processing payment...")
      setPaymentProcessing(true)

      const price = getPrice()
      const paymentResult = await sendPayment(price)
      console.log("Payment completed:", paymentResult)

      setPaymentProcessing(false)
      setLoadingStep("Payment confirmed! Generating content...")

      const response = await fetch("/api/videos/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          script,
          title,
          outputType, // Include output type in request
          paymentSignature: paymentResult.signature,
          walletAddress: publicKey?.toBase58(),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to start content generation")
      }

      const contentData = await response.json()
      console.log("[v0] Content generation started:", contentData)

      setLoadingStep("Generating AI content...")
      await pollContentStatus(contentData.contentId, contentData.title, outputType)
    } catch (err: any) {
      console.error("[v0] Generation failed:", err)
      if (err.message?.includes("Wallet not connected")) {
        setError("Please connect your wallet to generate content")
      } else if (err.message?.includes("insufficient funds")) {
        setError("Insufficient SOL balance for payment")
      } else {
        setError("Failed to process payment or generate content. Please try again.")
      }
    } finally {
      setLoading(false)
      setLoadingStep("")
      setPaymentProcessing(false)
    }
  }

  const pollContentStatus = async (contentId: string, contentTitle: string, type: OutputType) => {
    const getSteps = () => {
      switch (type) {
        case "audio":
          return [
            "Analyzing your script...",
            "Generating AI narration...",
            "Processing audio...",
            "Finalizing output...",
          ]
        case "video":
          return [
            "Analyzing your script...",
            "Generating AI narration...",
            "Creating visual elements...",
            "Rendering video...",
            "Finalizing output...",
          ]
        case "both":
          return [
            "Analyzing your script...",
            "Generating AI narration...",
            "Creating visual elements...",
            "Rendering video...",
            "Processing audio...",
            "Finalizing outputs...",
          ]
      }
    }

    const steps = getSteps()
    let stepIndex = 0
    const maxAttempts = 120 // 10 minutes total (120 * 5 seconds)
    let attempts = 0

    const poll = async () => {
      try {
        const contentUrl = `/api/videos/${contentId}${type === "audio" ? ".mp3" : ".mp4"}`
        const contentResponse = await fetch(contentUrl, { method: "HEAD" })

        if (contentResponse.ok) {
          setSuccess(
            `${type === "audio" ? "Audio" : type === "video" ? "Video" : "Content"} generated successfully! 🎉`,
          )

          const audioUrl = type === "both" ? `/api/videos/${contentId}.mp3` : undefined
          onContentGenerated(contentUrl, contentTitle, type, audioUrl)
          setScript("")
          setTitle("")
          return
        }

        if (stepIndex < steps.length - 1) {
          const progressRate = Math.floor(attempts / (maxAttempts / steps.length))
          if (progressRate > stepIndex) {
            stepIndex = Math.min(progressRate, steps.length - 1)
          }
          setLoadingStep(steps[stepIndex])
        }

        attempts++
        if (attempts >= maxAttempts) {
          throw new Error("Content generation timed out. Please try again with a shorter script.")
        }

        setTimeout(poll, 5000)
      } catch (error) {
        console.error("[v0] Status polling error:", error)
        throw error
      }
    }

    await poll()
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
          Content Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title for your content..."
          className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-weaveit-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
          disabled={loading}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-semibold text-white">Output Type</label>
        <div className="grid sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setOutputType("video")}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              outputType === "video"
                ? "bg-weaveit-500/20 border-weaveit-500/50 text-white"
                : "bg-gray-800/30 border-gray-700/50 text-gray-400 hover:bg-gray-800/50"
            }`}
            disabled={loading}
          >
            <div className="flex flex-col items-center space-y-2">
              <VideoIcon className="w-6 h-6" />
              <span className="font-semibold">Video Only</span>
              <span className="text-xs">$0.50</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setOutputType("audio")}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              outputType === "audio"
                ? "bg-purple-500/20 border-purple-500/50 text-white"
                : "bg-gray-800/30 border-gray-700/50 text-gray-400 hover:bg-gray-800/50"
            }`}
            disabled={loading}
          >
            <div className="flex flex-col items-center space-y-2">
              <Headphones className="w-6 h-6" />
              <span className="font-semibold">Audio Only</span>
              <span className="text-xs">$0.25</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setOutputType("both")}
            className={`p-4 rounded-xl border transition-all duration-200 ${
              outputType === "both"
                ? "bg-blue-500/20 border-blue-500/50 text-white"
                : "bg-gray-800/30 border-gray-700/50 text-gray-400 hover:bg-gray-800/50"
            }`}
            disabled={loading}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-1">
                <VideoIcon className="w-5 h-5" />
                <Music className="w-5 h-5" />
              </div>
              <span className="font-semibold">Both</span>
              <span className="text-xs">$0.65</span>
            </div>
          </button>
        </div>
      </div>

      {/* Script Input */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label htmlFor="script" className="block text-sm font-semibold text-white">
            {outputType === "audio" ? "Audio Script" : outputType === "video" ? "Tutorial Script" : "Content Script"}
          </label>
          <div className="flex items-center space-x-4 text-xs">
            {script.trim() && (
              <>
                <span className="text-gray-400">~{estimateVideoLength(script)} min content</span>
                <span className={`${scriptQuality.color} font-medium`}>{scriptQuality.quality}</span>
              </>
            )}
          </div>
        </div>
        <textarea
          id="script"
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder={`Enter your ${outputType === "audio" ? "audio narration" : "tutorial"} script here. ${
            outputType === "audio"
              ? "Describe what you want to narrate or explain in audio format..."
              : "Explain your code, concepts, or step-by-step instructions..."
          }`}
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
        disabled={loading || !script.trim() || !title.trim() || isProcessing}
        className={`
          relative overflow-hidden w-full py-6 px-8 rounded-xl font-semibold text-lg
          flex items-center justify-center space-x-3
          ${
            loading || isProcessing
              ? "bg-gray-700/50 cursor-not-allowed"
              : "bg-gradient-to-r from-weaveit-500 to-weaveit-600 hover:from-weaveit-600 hover:to-weaveit-700"
          }
          text-white shadow-lg hover:shadow-xl
          transform transition-all duration-300 hover:scale-[1.02]
          disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
          border border-weaveit-500/20
        `}
      >
        {loading || paymentProcessing ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              <span>
                {paymentProcessing
                  ? "Processing Payment..."
                  : `Generating Your ${outputType === "audio" ? "Audio" : outputType === "video" ? "Video" : "Content"}...`}
              </span>
            </div>
            {loadingStep && <span className="text-sm text-weaveit-200">{loadingStep}</span>}
          </div>
        ) : (
          <>
            <Zap className="w-6 h-6" />
            <span>
              Generate {outputType === "audio" ? "Audio" : outputType === "video" ? "Video" : "Content"} ($
              {getPrice().toFixed(2)})
            </span>
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
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-white">Generation Cost</h4>
            <p className="text-sm text-gray-400">Transparent pricing</p>
          </div>
        </div>
        <p className="text-sm text-gray-300 mb-2">
          {outputType === "audio" && "Audio generation requires a payment of "}
          {outputType === "video" && "Video generation requires a payment of "}
          {outputType === "both" && "Video + Audio generation requires a payment of "}
          <strong className="text-weaveit-400">${getPrice().toFixed(2)}</strong> in SOL to cover AI processing costs.
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
            <h4 className="font-semibold text-white">
              💡 Tips for Better {outputType === "audio" ? "Audio" : outputType === "video" ? "Videos" : "Content"}
            </h4>
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
            <span>
              {outputType === "audio" ? "Use natural speaking patterns" : "Mention specific code examples or concepts"}
            </span>
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
  const { connected, connecting } = useWallet()

  if (connected) {
    onConnect()
    return null
  }

  return (
    <div className="space-y-6">
      {connecting && (
        <div className="bg-weaveit-500/10 border border-weaveit-500/30 rounded-xl p-4 flex items-center space-x-3 backdrop-blur-sm">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-weaveit-500 border-t-transparent"></div>
          <span className="text-white">Connecting to wallet...</span>
        </div>
      )}

      <div className="flex justify-center">
        <WalletMultiButton className="!bg-gradient-to-r !from-weaveit-500 !to-weaveit-600 hover:!from-weaveit-600 hover:!to-weaveit-700 !rounded-xl !font-semibold !py-4 !px-8 !text-lg !transition-all !duration-200 !transform hover:!scale-105" />
      </div>

      {/* Supported Wallets Info */}
      <div className="grid sm:grid-cols-2 gap-3">
        {[
          { name: "Phantom", icon: "👻", popular: true },
          { name: "Solflare", icon: "☀️", popular: true },
          { name: "Alpha", icon: "🚀", popular: false },
          { name: "Clover", icon: "🍀", popular: false },
        ].map((wallet) => (
          <div
            key={wallet.name}
            className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm"
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
                <div className="text-gray-400 text-sm">Supported</div>
              </div>
            </div>
          </div>
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
  const { connected, disconnect, publicKey } = useWallet()
  const [currentContent, setCurrentContent] = useState<{
    url: string
    title: string
    outputType: OutputType
    audioUrl?: string
  } | null>(null) // Updated state for content
  const [contents, setContents] = useState<
    Array<{ id: string; title: string; url: string; outputType: OutputType; audioUrl?: string; createdAt: string }>
  >([]) // Updated contents array

  const handleConnect = () => {
    // Connection is handled by the wallet adapter
  }

  const handleDisconnect = () => {
    disconnect()
    setCurrentContent(null)
  }

  const handleContentGenerated = (contentUrl: string, title: string, outputType: OutputType, audioUrl?: string) => {
    const newContent = {
      id: Date.now().toString(),
      title,
      url: contentUrl,
      outputType,
      audioUrl,
      createdAt: new Date().toISOString(),
    }
    setContents((prev) => [newContent, ...prev])
    setCurrentContent({ url: contentUrl, title, outputType, audioUrl })
  }

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
                <p className="text-sm text-gray-400">AI Content Generator</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-800/50 rounded-xl px-4 py-3 border border-gray-700/50 backdrop-blur-sm">
                <div className="w-8 h-8 bg-weaveit-500/20 rounded-lg flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-weaveit-400" />
                </div>
                <div>
                  <div className="text-sm text-white font-medium">Connected</div>
                  <div className="text-xs text-gray-400">
                    {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
                  </div>
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
                  <h2 className="text-2xl font-bold text-white">Create AI Content</h2>
                  <p className="text-gray-400">Transform your script into engaging content</p>
                </div>
              </div>
              <ScriptForm onContentGenerated={handleContentGenerated} />
            </div>

            {/* Content Display */}
            {currentContent && (
              <div className="bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 shadow-2xl">
                <ContentDisplay
                  contentUrl={currentContent.url}
                  audioUrl={currentContent.audioUrl}
                  title={currentContent.title}
                  outputType={currentContent.outputType}
                  onClose={() => setCurrentContent(null)}
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
                  <h3 className="text-xl font-bold text-white">Your Content</h3>
                  <p className="text-sm text-gray-400">{contents.length} items created</p>
                </div>
              </div>

              {contents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-gray-700/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Video className="w-10 h-10 text-gray-500" />
                  </div>
                  <p className="text-gray-400 mb-2">No content yet</p>
                  <p className="text-sm text-gray-500">Create your first AI content to get started!</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
                  {contents.map((content) => (
                    <div
                      key={content.id}
                      className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/30 hover:border-weaveit-500/30 transition-all duration-200 cursor-pointer hover:transform hover:scale-[1.02] backdrop-blur-sm group"
                      onClick={() =>
                        setCurrentContent({
                          url: content.url,
                          title: content.title,
                          outputType: content.outputType,
                          audioUrl: content.audioUrl,
                        })
                      }
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-weaveit-500/20 rounded-lg flex items-center justify-center group-hover:bg-weaveit-500/30 transition-colors">
                          {content.outputType === "audio" ? (
                            <Headphones className="w-5 h-5 text-weaveit-400" />
                          ) : content.outputType === "video" ? (
                            <Play className="w-5 h-5 text-weaveit-400" />
                          ) : (
                            <VideoIcon className="w-5 h-5 text-weaveit-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-sm truncate">
                            {content.title || "Untitled Content"}
                          </h4>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="capitalize">{content.outputType}</span>
                          </div>
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
