import { Clock, Users, Lightbulb, TrendingUp } from "lucide-react"

export default function ImpactSection() {
  return (
    <section id="impact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-weaveit-500 font-semibold tracking-wide uppercase">The Impact</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Transform How Technical Content Is Created
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            WeaveIt revolutionizes the way developers, educators, and content creators share knowledge.
          </p>
        </div>

        <div className="mt-16">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                <Clock className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Save Hours of Production Time</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                What used to take days now takes minutes. Automatically generate professional-quality tutorial videos
                without video editing expertise.
              </p>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                <Users className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Reach Wider Audiences</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Engage visual and auditory learners with multimedia content that makes complex coding concepts more
                accessible.
              </p>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                <Lightbulb className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Improve Learning Outcomes</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Studies show that multimedia learning increases retention by up to 60% compared to text-only tutorials.
              </p>
            </div>

            <div className="relative">
              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-weaveit-500 text-white">
                <TrendingUp className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Scale Your Content Creation</p>
              <p className="mt-2 ml-16 text-base text-gray-500">
                Produce consistent, high-quality tutorial videos at scale for documentation, training, or educational
                platforms.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-weaveit-500 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Time Saved Per Tutorial</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">4-6 hours</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
