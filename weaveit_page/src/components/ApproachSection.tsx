import { Settings, Layers, Sliders } from "lucide-react"

export default function ApproachSection() {
  return (
    <section id="approach" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-weaveit-500 font-semibold tracking-wide uppercase">Our Approach</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Designed for Developers, By Developers
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            WeaveIt is built with flexibility and customization in mind, giving you full control over your content.
          </p>
        </div>

        <div className="mt-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="relative">
              <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                Fully Configurable SDK
              </h3>
              <p className="mt-3 text-lg text-gray-500">
                WeaveIt is designed to be flexible and adaptable to your specific needs, with extensive configuration
                options.
              </p>

              <dl className="mt-10 space-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                      <Settings className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Customizable Outputs</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Generate videos, slides, or just the narration script based on your needs.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                      <Layers className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Modular Architecture</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Use only the components you need - code analysis, AI narration, TTS, or video generation.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                      <Sliders className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">API Control</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Provide your own OpenAI API keys and configure model parameters for optimal results.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
              <div className="relative mx-auto bg-weaveit-600 rounded-lg shadow-lg overflow-hidden">
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="flex items-center justify-center">
                    <h3 className="text-xl leading-8 font-semibold text-white">Configuration Example</h3>
                  </div>
                </div>
                <div className="px-6 pt-6 pb-8 bg-gray-800 sm:p-10">
                  <div className="overflow-x-auto">
                    <pre className="text-sm text-green-400">
                      <code>{`// weaveit.config.ts
export default {
  input: {
    files: ["./src/**/*.ts"],
    exclude: ["**/*.test.ts"]
  },
  output: {
    format: "mp4",
    directory: "./tutorials",
    quality: "high"
  },
  ai: {
    provider: "openai",
    model: "gpt-4",
    apiKey: process.env.OPENAI_API_KEY
  },
  voice: {
    provider: "elevenlabs",
    voice: "adam",
    speed: 1.0
  },
  style: {
    theme: "dark-code",
    fontFamily: "Inter",
    highlightColor: "#6366F1"
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-weaveit-50 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Mock/Test Mode for Development</h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p>
                  WeaveIt includes a mock mode for development and testing, allowing you to iterate quickly without
                  consuming API credits.
                </p>
              </div>
              <div className="mt-5">
                <div className="bg-white p-4 rounded-md">
                  <pre className="text-sm text-gray-800">
                    <code>{`// Enable mock mode
npx weaveit transform --mock

// Test with sample data
npx weaveit test --sample-code`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
