import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

export default function ChallengeSection() {
  return (
    <section id="challenge" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-weaveit-500 font-semibold tracking-wide uppercase">The Challenge</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Why Creating Code Tutorials Is Hard
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Technical content creation has traditionally been a time-consuming and complex process.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-yellow-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">The Traditional Process</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>Creating code tutorials traditionally requires multiple tools and steps:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Writing code explanations</li>
                        <li>Creating slides or visual aids</li>
                        <li>Recording voiceovers</li>
                        <li>Editing audio for clarity</li>
                        <li>Screen recording code examples</li>
                        <li>Video editing to combine all elements</li>
                        <li>Rendering and publishing the final product</li>
                      </ul>
                      <p className="mt-3">
                        This process can take hours or even days for a single tutorial, making it difficult to scale
                        content creation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">The WeaveIt Solution</h3>
                    <div className="mt-2 text-sm text-gray-500">
                      <p>WeaveIt automates the entire process:</p>
                      <div className="mt-4 space-y-4">
                        {[
                          {
                            before: "Manual code explanation writing",
                            after: "AI-powered code analysis and explanation generation",
                          },
                          {
                            before: "Creating slides in presentation software",
                            after: "Automatic slide generation with code highlighting",
                          },
                          {
                            before: "Recording and editing voiceovers",
                            after: "Text-to-speech generation with natural-sounding voices",
                          },
                          {
                            before: "Video editing to combine elements",
                            after: "Automatic video compilation with synchronized audio",
                          },
                        ].map((item, index) => (
                          <div key={index} className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex-1 min-w-0 bg-red-50 p-3 rounded-md">
                              <p className="text-sm font-medium text-red-800">{item.before}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 sm:mx-4 flex-shrink-0">
                              <ArrowRight className="h-5 w-5 text-gray-500" aria-hidden="true" />
                            </div>
                            <div className="flex-1 min-w-0 bg-green-50 p-3 rounded-md">
                              <p className="text-sm font-medium text-green-800">{item.after}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="mt-4">
                        By automating these steps, WeaveIt reduces the time required from hours to minutes, while
                        maintaining high-quality output.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-weaveit-500 rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to transform your code tutorials?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-weaveit-200">
                  Start creating engaging video content from your code in minutes, not hours.
                </p>
                <a
                  href="#"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-weaveit-600 hover:bg-weaveit-50"
                >
                  Get started today
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
