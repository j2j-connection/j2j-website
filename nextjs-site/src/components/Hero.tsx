import Link from 'next/link'
import VideoCarousel from './VideoCarousel'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Carousel */}
      <VideoCarousel />

      {/* Fallback gradient when videos aren't loaded */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/5"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          <span className="block">AI that works</span>
          <span className="block text-yellow-500">
            for everyone
          </span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          We build intelligent tools that solve real problems in real communities. No buzzwords, just results.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="#contact"
            className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition-all transform hover:scale-105 w-full sm:w-auto text-center"
          >
            Get Started
          </Link>
          <Link
            href="#about"
            className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all transform hover:scale-105 backdrop-blur-sm w-full sm:w-auto text-center"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-16 bg-gradient-to-b from-white/50 to-transparent rounded-full"></div>
      </div>
    </section>
  )
}