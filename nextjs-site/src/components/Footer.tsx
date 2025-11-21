import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-4 hover:opacity-80 transition-opacity">
              <div className="w-12 h-12 relative">
                <Image
                  src="/J2J_logo.svg"
                  alt="J2J Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-white">
                <div className="text-xl font-bold">J2J</div>
                <div className="text-xs text-yellow-500 font-medium">AI FOR ALL</div>
              </div>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Building tools that actually work, for people who actually use them.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-yellow-500 font-semibold mb-4">Company</h4>
            <div className="space-y-3">
              <Link
                href="/#about"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-yellow-500 font-semibold mb-4">Support</h4>
            <div className="space-y-3">
              <Link
                href="/#contact"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Help
              </Link>
              <Link
                href="mailto:tom@j2j.info"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2024 J2J Connection. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="https://twitter.com/j2jconnection"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-yellow-500 transition-colors text-sm"
            >
              Twitter
            </Link>
            <Link
              href="https://linkedin.com/company/j2jconnection"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-yellow-500 transition-colors text-sm"
            >
              LinkedIn
            </Link>
            <Link
              href="https://github.com/j2jconnection"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-yellow-500 transition-colors text-sm"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}