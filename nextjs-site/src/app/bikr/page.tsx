import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'BIKR - AI-Powered Bike Diagnostics | J2J Connection',
  description: 'BIKR - AI-powered bike diagnostics that turn website visitors into ready-to-book repairs. Save 10-20 minutes per diagnosis with smart POS integration.',
}

export default function BIKR() {
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/5"></div>
        
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
            AI-Powered Diagnostics
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            BIKR
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
            The bike diagnostics tool that actually works
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
            AI-powered diagnostics that turn website visitors into ready-to-book repairs. No more guessing games.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 font-mono">10-20</div>
              <div className="text-gray-400">Minutes Saved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 font-mono">24/7</div>
              <div className="text-gray-400">Expert AI</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 font-mono">100%</div>
              <div className="text-gray-400">POS Integration</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#demo"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:scale-105"
            >
              Watch Demo
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
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              The Problem & Solution
            </h2>
            <p className="text-lg text-gray-400">
              How BIKR transforms bike shop operations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Problem */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  PROBLEM
                </span>
                <div className="text-2xl">⚠️</div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Bike Shops Waste Time & Lose Customers
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Bike shops spend <strong>10–20 minutes</strong> per intake/diagnosis, phones tie up staff, 
                and many web inquiries never convert to actual repairs.
              </p>
              
              <div className="bg-red-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-red-400 font-mono">10-20 min</div>
                <div className="text-red-300 text-sm">per diagnosis</div>
              </div>
            </div>

            {/* Solution */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  SOLUTION
                </span>
                <div className="text-2xl">✅</div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                BIKR Diagnostic AI
              </h3>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                BIKR triages issues online, produces <strong>structured diagnostic summaries</strong>, 
                and turns website visitors into <strong>ready-to-book repairs</strong> using Lightspeed pricing.
              </p>
              
              <div className="bg-green-500/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 font-mono">Instant</div>
                <div className="text-green-300 text-sm">diagnosis</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How BIKR Works
            </h2>
            <p className="text-lg text-gray-400">
              AI-powered diagnostics that save time and increase conversions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Customer Describes Issue',
                description: 'Website visitors describe bike problems in plain English. BIKR understands natural language and asks clarifying questions.'
              },
              {
                step: '2',
                title: 'AI Generates Diagnosis',
                description: 'BIKR produces structured diagnostic summaries with specific repair steps and real-time Lightspeed pricing integration.'
              },
              {
                step: '3',
                title: 'Ready-to-Book Repairs',
                description: 'Customers arrive with realistic price expectations and specific issues identified, reducing consultation time by 10-20 minutes.'
              }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-gray-950">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-400">
              No hidden fees, no surprises
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-white mb-4">BIKR Pro</h3>
                <div className="text-5xl font-bold text-yellow-500 mb-2">
                  $49<span className="text-xl text-gray-400">/month</span>
                </div>
              </div>

              <div className="text-left mb-8 space-y-3">
                {[
                  'Unlimited diagnostics',
                  'POS integration',
                  'Mobile app access',
                  'Email support',
                  'Regular updates'
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                      ✓
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/#contact"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:scale-105 block text-center"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}