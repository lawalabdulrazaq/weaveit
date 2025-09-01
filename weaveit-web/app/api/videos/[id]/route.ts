import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const contentId = params.id

    const fileExtension = contentId.split(".").pop()?.toLowerCase()
    const baseId = contentId.replace(/\.(mp4|mp3)$/, "")

    const possiblePaths = [
      join(process.cwd(), "public", "generated"), // Local generation path
      join(process.cwd(), "backend", "output"), // Backend output path
      join(process.cwd(), "src", "output"), // Original path for compatibility
    ]

    let filePath: string
    let contentType: string

    if (fileExtension === "mp3") {
      contentType = "audio/mpeg"
    } else if (fileExtension === "mp4") {
      contentType = "video/mp4"
    } else {
      // Default to mp4 for backward compatibility
      contentType = "video/mp4"
    }

    let fileBuffer: Buffer | null = null
    let foundPath: string | null = null

    for (const outputPath of possiblePaths) {
      try {
        if (fileExtension === "mp3") {
          filePath = join(outputPath, `${baseId}.mp3`)
        } else if (fileExtension === "mp4") {
          filePath = join(outputPath, `${baseId}.mp4`)
        } else {
          filePath = join(outputPath, `${contentId}.mp4`)
        }

        fileBuffer = await readFile(filePath)
        foundPath = filePath
        console.log(`[v0] Found content file at: ${foundPath}`)
        break
      } catch (error) {
        // Continue to next path
        continue
      }
    }

    if (!fileBuffer || !foundPath) {
      console.error(`Content file not found in any location for ID: ${contentId}`)

      const backendUrl = process.env.BACKEND_URL || "http://localhost:3001"
      try {
        const backendResponse = await fetch(`${backendUrl}/api/videos/${baseId}`)
        if (backendResponse.ok) {
          const backendBuffer = await backendResponse.arrayBuffer()
          fileBuffer = Buffer.from(backendBuffer)
          console.log(`[v0] Retrieved content from backend server`)
        }
      } catch (backendError) {
        console.error(`Backend fetch failed:`, backendError)
      }
    }

    if (!fileBuffer) {
      return NextResponse.json(
        {
          error: `${fileExtension === "mp3" ? "Audio" : "Video"} not found or still processing`,
          contentId: baseId,
          searchedPaths: possiblePaths,
        },
        { status: 404 },
      )
    }

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Content-Length": fileBuffer.length.toString(),
      "Cache-Control": "public, max-age=3600",
    }

    // Add range support for video files
    if (contentType === "video/mp4") {
      headers["Accept-Ranges"] = "bytes"
    }

    const arrayBuffer = new Uint8Array(fileBuffer).buffer

    return new NextResponse(arrayBuffer, { headers })
  } catch (error) {
    console.error("Content serving error:", error)
    return NextResponse.json({ error: "Failed to serve content" }, { status: 500 })
  }
}
