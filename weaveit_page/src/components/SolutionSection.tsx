import { Code, Mic, Video, Zap } from "lucide-react"

export default function SolutionSection() {
  return (
    <section id="solution" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-weaveit-500 font-semibold tracking-wide uppercase">The Solution</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Automate Your Tutorial Creation
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            WeaveIt transforms your code explanations into engaging multimedia tutorials with minimal effort.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                <Code className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Code Snippet Analysis</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Automatically analyze and break down code snippets into digestible, educational segments.
              </p>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                <Zap className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">AI-Powered Narration</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Leverage OpenAI to generate clear, concise explanations of your code that sound natural.
              </p>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                <Mic className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Text-to-Speech Voiceovers</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Convert explanations into professional-sounding voiceovers that guide viewers through your code.
              </p>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                <Video className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Slide + Video Generation</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Automatically create visually appealing slides and compile them into a cohesive video using canvas and
                ffmpeg.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900">One Command Transformation</h3>
            <p className="mt-4 text-gray-600">
              From raw .ts files to fully narrated tutorial videos with a single command
            </p>
          </div>
          <div className="mt-6 bg-gray-800 rounded-md p-4 overflow-x-auto">
            <pre className="text-sm text-green-400">
              <code>$ npx weaveit transform my-tutorial.ts --output video</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
