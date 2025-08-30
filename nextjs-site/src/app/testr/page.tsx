import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'TESTR - Digital Test Ride System | J2J Connection',
  description: 'TESTR - Digital test ride system for electric bike shops. Eliminate staff time waste, reduce liability, and capture 100% of leads with Lightspeed integration.',
}

export default function TESTR() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-blue-500/10"></div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
            Digital Test Ride System
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            TESTR
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            The test ride system that actually works
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            Self-service digital process that eliminates paperwork, reduces liability, and turns every test ride into a qualified lead. No staff time wasted.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 font-mono">15hrs</div>
              <div className="text-gray-400">Staff Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 font-mono">100%</div>
              <div className="text-gray-400">Lead Capture</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 font-mono">0%</div>
              <div className="text-gray-400">Payment Liability</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#demo"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:scale-105"
            >
              See Demo
            </Link>
            <Link
              href="/#contact"
              className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Problem */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  CURRENT PROBLEM
                </span>
                <div className="text-2xl">⚠️</div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Staff Waste Time on Manual Processes
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Staff spend valuable time managing paper forms, handling customer IDs and credit cards, witnessing signatures, and filing documents. This creates <strong>liability risks</strong> and prevents staff from focusing on sales.
              </p>
              
              <div className="bg-red-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-400 font-mono">10+ min</div>
                <div className="text-red-300 text-sm">per customer</div>
              </div>
            </div>

            {/* Solution */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  TESTR SOLUTION
                </span>
                <div className="text-2xl">✅</div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Self-Service Digital System
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Complete <strong>self-service customer process</strong> with digital ID capture, electronic waivers, and Stripe payment authorization. Staff focus on sales while customers onboard themselves.
              </p>
              
              <div className="bg-green-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 font-mono">3 min</div>
                <div className="text-green-300 text-sm">self-service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See TESTR in Action
            </h2>
            <p className="text-lg text-gray-400">
              Real implementation from SD Electric Bike
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* App Screenshot */}
            <div className="flex justify-center">
              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <div className="relative max-w-[280px] mx-auto">
                  <Image
                    src="/app-screenshot.png"
                    alt="SD Electric Bike Test Ride App - Real Implementation"
                    width={280}
                    height={600}
                    className="rounded-3xl shadow-2xl border-4 border-gray-800 hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Demo Features */}
            <div className="space-y-6">
              {[
                {
                  title: 'Save Staff Time',
                  description: 'Complete self-service process frees staff from form management. 15+ hours saved monthly.'
                },
                {
                  title: 'Risk Elimination',
                  description: 'Zero physical ID or credit card handling. Digital storage meets compliance requirements.'
                },
                {
                  title: 'Lead Generation',
                  description: 'Customer data flows directly into Lightspeed POS with bike preferences for targeted follow-up.'
                },
                {
                  title: 'Modern Experience',
                  description: 'Customers use familiar mobile interface with Stripe payments (Apple Pay, Google Pay, cards).'
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-yellow-500/20 rounded-2xl p-6 backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:translate-x-2"
                >
                  <h4 className="text-yellow-500 font-semibold text-lg mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Return on Investment
            </h2>
            <p className="text-lg text-gray-400">
              Based on 50 test rides per month
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              {
                number: '15',
                label: 'Hours saved monthly',
                description: 'Staff time freed from form management'
              },
              {
                number: '600+',
                label: 'Leads captured yearly',
                description: '100% capture with Lightspeed sync'
              },
              {
                number: '$0',
                label: 'Liability exposure',
                description: 'No physical ID or payment handling'
              },
              {
                number: '$99',
                label: 'Monthly investment',
                description: 'ROI in first month with time savings'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-yellow-500/20 rounded-3xl p-6 text-center backdrop-blur-sm hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl font-bold text-yellow-500 mb-3 font-mono">
                  {item.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {item.label}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/#contact"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:scale-105 inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}