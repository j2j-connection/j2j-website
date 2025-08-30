export default function About() {
  const stats = [
    { number: '3+', label: 'Years Building AI', description: 'Real experience solving real problems' },
    { number: '100+', label: 'Communities Served', description: 'From bike shops to local businesses' },
    { number: '24/7', label: 'AI Support', description: 'Always there when you need help' },
    { number: '99%', label: 'Uptime', description: 'Reliable tools you can count on' },
  ]

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <div className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
                About Us
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                We Build Things That Work
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                We&apos;re a small team that believes technology should solve real problems, not create new ones. 
                We build AI tools that actually help people get things done.
              </p>
              <p className="text-gray-400 leading-relaxed">
                No corporate speak, no empty promises. Just solid tools that make life easier for the people who use them.
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-3xl sm:text-4xl font-bold text-yellow-500 mb-3 font-mono">
                  {stat.number}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}