// // app/api/generate/route.ts
// import { NextResponse } from "next/server"
// import path from "path"
// import fs from "fs"
// import { generateScrollingScriptVideo } from "../../../../src/videoGenerator"
// import { generateSpeech } from "../../../../src/textToSpeech"
// import { enhanceScript } from "../../../../src/codeAnalyzer"

// export async function POST(req: Request) {
//   try {
//     const { script, title, walletAddress, transactionSignature, outputType } = await req.json()

//     if (!transactionSignature) {
//       return NextResponse.json({ error: "Missing transactionSignature" }, { status: 400 })
//     }

//     if (!script || typeof script !== "string" || script.trim().length === 0) {
//       return NextResponse.json({ error: "Missing or empty script" }, { status: 400 })
//     }

//     // Step 1: Enhance script
//     const explanation = await enhanceScript(script)

//     // Step 2: Ensure output dir exists
//     const outputDir = path.join(process.cwd(), "src", "output")
//     if (!fs.existsSync(outputDir)) {
//       fs.mkdirSync(outputDir, { recursive: true })
//     }

//     // Step 3: Define file paths
//     const audioPath = path.join(outputDir, `${transactionSignature}.mp3`)
//     const videoPath = path.join(outputDir, `${transactionSignature}.mp4`)

//     // Step 4: Generate audio
//     await generateSpeech(explanation, audioPath)

//     // Step 5: Optionally generate video (only if outputType includes video)
//     if (outputType === "video" || outputType === "both") {
//       await generateScrollingScriptVideo(script, audioPath, videoPath)
//     }

//     // Step 6: Response
//     return NextResponse.json({
//       contentId: transactionSignature,
//       title,
//       walletAddress,
//       outputType,
//       message: "Educational tutorial generated successfully",
//     })
//   } catch (err: any) {
//     console.error("Video generation error:", err)
//     return NextResponse.json(
//       { error: "Failed to generate content", details: err?.message || err },
//       { status: 500 },
//     )
//   }
// }
