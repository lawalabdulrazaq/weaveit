import { type NextRequest, NextResponse } from "next/server"
import { existsSync } from "fs"
import { join } from "path"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contentId = params.id
    const outputPath = join(process.cwd(), "src", "output")

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
      const videoPath = join(outputPath, `${contentId}.mp4`)
      videoExists = existsSync(videoPath)
      if (videoExists) {
        videoUrl = `/api/videos/${contentId}.mp4`
      }
    }

    if (outputType === "audio" || outputType === "both") {
      const audioPath = join(outputPath, `${contentId}.mp3`)
      audioExists = existsSync(audioPath)
      if (audioExists) {
        audioUrl = `/api/videos/${contentId}.mp3`
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
