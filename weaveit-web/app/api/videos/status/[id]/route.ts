import { type NextRequest, NextResponse } from "next/server"
import { existsSync } from "fs"
import { join } from "path"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contentId = params.id
    console.log("Checking status for content:", contentId)

    // Check both possible output locations
    const outputPaths = [
      join(process.cwd(), "public", "generated"),
      join(process.cwd(), "..", "src", "output"),
      join(process.cwd(), "src", "output")
    ]

    // Log the paths we're checking
    console.log("Checking paths:", outputPaths)

    // Determine output type from content ID prefix
    const outputType = contentId.startsWith("audio_")
      ? "audio"
      : contentId.startsWith("video_")
        ? "video"
        : contentId.startsWith("both_")
          ? "both"
          : "video"

    let videoExists = false
    let audioExists = false
    let videoUrl = null
    let audioUrl = null

    if (outputType === "video" || outputType === "both") {
      for (const basePath of outputPaths) {
        const videoPath = join(basePath, `${contentId}.mp4`)
        console.log("Checking video path:", videoPath, "Exists:", existsSync(videoPath))
        if (existsSync(videoPath)) {
          videoExists = true
          // Use the backend URL for serving videos
          videoUrl = `${process.env.BACKEND_URL}/output/${contentId}.mp4`
          console.log("Found video at:", videoPath)
          console.log("Video URL set to:", videoUrl)
          break
        }
      }
    }

    if (outputType === "audio" || outputType === "both") {
      for (const basePath of outputPaths) {
        const audioPath = join(basePath, `${contentId}.mp3`)
        if (existsSync(audioPath)) {
          audioExists = true
          audioUrl = `/api/videos/${contentId}.mp3`
          break
        }
      }
    }

    let ready = false
    let status = "processing"

    if (outputType === "audio") {
      ready = audioExists
      status = audioExists ? "completed" : "processing"
    } else if (outputType === "video") {
      ready = videoExists
      status = videoExists ? "completed" : "processing"
    } else if (outputType === "both") {
      ready = videoExists && audioExists
      status = ready ? "completed" : "processing"
    }

    // Log the final status before sending
    console.log("Final status:", {
      contentId,
      outputType,
      status,
      ready,
      videoExists,
      audioExists,
      videoUrl,
      audioUrl
    })

    const response: any = {
      contentId,
      outputType,
      status,
      ready,
    }

    // Set content URL based on output type
    if (outputType === "audio") {
      response.contentUrl = audioUrl
    } else if (outputType === "video") {
      response.contentUrl = videoUrl
    } else if (outputType === "both") {
      response.contentUrl = videoUrl
      response.audioUrl = audioUrl
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Status check error:", error)
    return NextResponse.json({ error: "Failed to check content status" }, { status: 500 })
  }
}


// import { type NextRequest, NextResponse } from "next/server"
// import { existsSync } from "fs"
// import { join } from "path"

// export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const videoId = params.id
//     const videoPath = join(process.cwd(), "src", "output", `${videoId}.mp4`)

//     const exists = existsSync(videoPath)

//     return NextResponse.json({
//       videoId,
//       status: exists ? "completed" : "processing",
//       ready: exists,
//       videoUrl: exists ? `/api/videos/${videoId}` : null,
//     })
//   } catch (error) {
//     console.error("Status check error:", error)
//     return NextResponse.json({ error: "Failed to check video status" }, { status: 500 })
//   }
// }