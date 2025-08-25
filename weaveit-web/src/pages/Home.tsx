import Hero from "../components/Hero"
import SolutionSection from "../components/SolutionSection"
import ImpactSection from "../components/ImpactSection"
import ApproachSection from "../components/ApproachSection"
import ChallengeSection from "../components/ChallengeSection"
import WeaveItApp from "../components/WeaveItApp"

export default function Home() {
  return (
    <main className="pt-16">
      <Hero />
      <SolutionSection />
      <ImpactSection />
      <ApproachSection />
      <ChallengeSection />

      {/* WeaveIt App Section */}
      <section id="weaveit-app" className="py-20 bg-[#0a0e17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Try WeaveIt Now</h2>
            <p className="mt-4 text-xl text-gray-400">Experience the power of AI-driven video generation</p>
          </div>
          <WeaveItApp />
        </div>
      </section>
    </main>
  )
}
