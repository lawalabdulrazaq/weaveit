// import { type NextRequest, NextResponse } from "next/server"
// import { Connection } from "@solana/web3.js"

// type OutputType = "video" | "audio" | "both"

// export async function POST(request: NextRequest) {
//   try {
//     const { script, title, outputType = "video", paymentSignature, walletAddress } = await request.json()

//     // Validate required fields
//     if (!script || !title) {
//       return NextResponse.json({ error: "Script and title are required" }, { status: 400 })
//     }

//     if (!["video", "audio", "both"].includes(outputType)) {
//       return NextResponse.json({ error: "Invalid output type" }, { status: 400 })
//     }

//     if (!paymentSignature || !walletAddress) {
//       return NextResponse.json({ error: "Payment signature and wallet address are required" }, { status: 400 })
//     }

//     // Verify payment signature
//     try {
//       const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com")
//       const signature = await connection.getTransaction(paymentSignature, {
//         commitment: "confirmed",
//       })

//       if (!signature) {
//         return NextResponse.json({ error: "Payment verification failed - transaction not found" }, { status: 400 })
//       }

//       console.log(`Payment verified: ${paymentSignature}`)
//     } catch (error) {
//       console.error("Payment verification error:", error)
//       return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
//     }

//     const contentId = paymentSignature

//     const contentData = await generateContent({
//       script,
//       title,
//       contentId,
//       outputType,
//       walletAddress,
//     })

//     const response: any = {
//       success: true,
//       contentId,
//       title,
//       outputType,
//       duration: contentData.duration,
//       createdAt: new Date().toISOString(),
//     }

//     // Set appropriate URLs based on output type
//     if (outputType === "audio") {
//       response.contentUrl = `/api/videos/${contentId}.mp3`
//     } else if (outputType === "video") {
//       response.contentUrl = `/api/videos/${contentId}.mp4`
//     } else if (outputType === "both") {
//       response.contentUrl = `/api/videos/${contentId}.mp4`
//       response.audioUrl = `/api/videos/${contentId}.mp3`
//     }

//     return NextResponse.json(response)
//   } catch (error) {
//     console.error("Content generation error:", error)
//     return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
//   }
// }

// async function generateContent({
//   script,
//   title,
//   contentId,
//   outputType,
//   walletAddress,
// }: {
//   script: string
//   title: string
//   contentId: string
//   outputType: OutputType
//   walletAddress?: string
// }) {
//   console.log(`Starting ${outputType} generation for: ${title}`)
//   console.log(`Script length: ${script.length} characters`)
//   console.log(`Content ID: ${contentId}`)

//   const backendUrl = process.env.BACKEND_URL || "http://localhost:3001"

//   try {
//     // Call the backend server to generate content
//     const response = await fetch(`${backendUrl}/api/generate`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         script,
//         title,
//         walletAddress,
//         transactionSignature: contentId,
//         outputType,
//       }),
//     })

//     if (!response.ok) {
//       throw new Error(`Backend server error: ${response.status}`)
//     }

//     const result = await response.json()
//     console.log(`Backend generation completed: ${result.message}`)

//     return {
//       duration: Math.ceil((script.split(" ").length / 150) * 60), // Estimate duration
//       audioGenerated: outputType === "audio" || outputType === "both",
//       videoGenerated: outputType === "video" || outputType === "both",
//       outputType,
//       backendResult: result,
//     }
//   } catch (error) {
//     console.error(`Backend connection error:`, error)

//     console.log(`Falling back to local generation...`)

//     // Import and use local backend functions
//     const { generateSpeech } = await import("../../../../../src/textToSpeech")
//     const { generateScrollingScriptVideo } = await import("../../../../../src/videoGenerator")
//     const { enhanceScript } = await import("../../../../../src/codeAnalyzer")
//     const path = await import("path")
//     const fs = await import("fs")

//     // Create output directory
//     const outputDir = path.join(process.cwd(), "public", "generated")
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true })
//     }

//     // Generate enhanced script for narration
//     const explanation = await enhanceScript(script)
//     console.log(`AI explanation generated`)

//     const audioPath = path.join(outputDir, `${contentId}.mp3`)
//     const videoPath = path.join(outputDir, `${contentId}.mp4`)

//     if (outputType === "audio" || outputType === "both") {
//       await generateSpeech(explanation, audioPath)
//       console.log(`Audio generation completed`)
//     }

//     if (outputType === "video" || outputType === "both") {
//       // Generate audio first if not already done
//       if (outputType === "video") {
//         await generateSpeech(explanation, audioPath)
//       }

//       await generateScrollingScriptVideo(script, audioPath, videoPath)
//       console.log(`Video generation completed`)
//     }

//     return {
//       duration: Math.ceil((script.split(" ").length / 150) * 60),
//       audioGenerated: outputType === "audio" || outputType === "both",
//       videoGenerated: outputType === "video" || outputType === "both",
//       outputType,
//       localGeneration: true,
//     }
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import { Connection } from "@solana/web3.js"
import path from 'path';
import fs from 'fs';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001"
export const maxDuration = 300 // Set max duration to 5 minutes

export async function POST(request: NextRequest) {
  try {
    const { script, title, paymentSignature, walletAddress } = await request.json()
    console.log("Received generation request:", { title, paymentSignature })

    if (!script || !title) {
      return NextResponse.json({ error: "Script and title are required" }, { status: 400 })
    }

    if (!paymentSignature || !walletAddress) {
      return NextResponse.json({ error: "Payment signature and wallet address are required" }, { status: 400 })
    }

    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), "public", "generated")
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    // Verify payment signature
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com")
    const signature = await connection.getTransaction(paymentSignature, { commitment: "confirmed" })

    if (!signature) {
      return NextResponse.json({ error: "Payment verification failed - transaction not found" }, { status: 400 })
    }

    console.log(`✅ Payment verified: ${paymentSignature}`)

    // Always video-only
    const contentId = paymentSignature
    try {
      const contentData = await generateContent({
        script,
        title,
        contentId,
        walletAddress,
      })

      return NextResponse.json({
        success: true,
        contentId,
        title,
        outputType: "video",
        duration: contentData.duration,
        createdAt: new Date().toISOString(),
        contentUrl: `/api/videos/${contentId}.mp4`,
        status: "processing" // Add status field
      })
    } catch (genError) {
      console.error("Generation error:", genError)
      return NextResponse.json({ error: "Failed to start generation process" }, { status: 500 })
    }
  } catch (error) {
    console.error("❌ Content generation error:", error)
    return NextResponse.json({ error: "Failed to generate video" }, { status: 500 })
  }
}

async function generateContent({ script, title, contentId, walletAddress }: { script: string; title: string; contentId: string; walletAddress: string }) {
  console.log(`🎬 Starting video generation for: ${title}`)

  try {
    // Call backend to generate video
    const response = await fetch(`${BACKEND_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        script,
        title,
        transactionSignature: contentId, // Fix: use correct parameter name
        walletAddress,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Backend server error" }))
      throw new Error(error.message || `Backend server error: ${response.status}`)
    }

    const result = await response.json()
    console.log("✅ Backend generation completed:", result)

    return {
      duration: Math.ceil((script.split(" ").length / 150) * 60),
      ...result
    }
  } catch (error) {
    console.error("❌ Generation error:", error)
    throw error
  }
}

