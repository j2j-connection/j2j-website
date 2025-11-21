'use client'

import { useState } from 'react'

interface Message {
  id: number
  content: string
  isUser: boolean
}

export default function Contact() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: `Hi! I&apos;m your J2J AI assistant. I can:

• Schedule consultation calls
• Discuss AI solutions for your needs
• Answer questions about our services
• Connect you with our team

What do you need?`,
      isUser: false
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const quickActions = [
    { label: 'Schedule Call', action: 'schedule' },
    { label: 'Learn More', action: 'learn' },
    { label: 'Contact Team', action: 'contact' },
  ]

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: message,
      isUser: true
    }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Simulate AI response (in real app, this would call your AI API)
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        content: getAIResponse(message),
        isUser: false
      }
      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleQuickAction = (action: string) => {
    let message = ''
    switch (action) {
      case 'schedule':
        message = 'I\'d like to schedule a consultation call'
        break
      case 'learn':
        message = 'Tell me more about your AI solutions'
        break
      case 'contact':
        message = 'I\'d like to contact your team'
        break
      default:
        return
    }
    handleSendMessage(message)
  }

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes('schedule') || message.includes('call') || message.includes('meeting')) {
      return `Perfect! I can help you schedule a call with our team. What works better for you:

• 15-minute quick overview
• 30-minute full consultation
• Custom demo for your specific needs

You can also email us directly at tom@j2j.info and we'll get back to you within 24 hours.`
    }

    if (message.includes('learn') || message.includes('more') || message.includes('about') || message.includes('solutions')) {
      return `We build AI solutions that actually work for everyone. Our approach:

• Practical AI tools tailored to real-world needs
• Solutions designed for people who use them
• Focus on making technology accessible and useful

What industry or challenge are you looking to address with AI?`
    }

    if (message.includes('contact') || message.includes('team') || message.includes('support')) {
      return `Happy to connect you with our team! Here are the best ways to reach us:

📧 Email: tom@j2j.info (24hr response)
📞 For urgent inquiries, mention "urgent" in your email
💬 Continue chatting here for immediate questions

What specific questions can I help answer about our AI solutions?`
    }

    return `Thanks for your message! I'm here to help with questions about:

• AI solutions for your business
• Custom implementations
• How we can solve your specific challenges
• Scheduling demos or consultations

What would you like to know more about?`
  }

  return (
    <section id="contact" className="py-20 lg:py-32 bg-black">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Content */}
          <div>
            <div className="inline-block bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-semibold mb-6">
              Get Started
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Try Something That Actually Works?
            </h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Let&apos;s talk about what you need and how we can help
            </p>
          </div>

          {/* AI Chat Interface */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
            {/* Chat Header */}
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="text-white font-semibold">J2J AI Assistant</h3>
                <p className="text-gray-400 text-sm">
                  I can help schedule calls, answer questions, and connect you with our team
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto mb-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-yellow-500 text-black'
                        : 'bg-white/10 text-white border border-white/20'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/20 p-3 rounded-2xl">
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>AI is responding</span>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                placeholder="Type your message here..."
                className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage(inputMessage)}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <button
                  key={action.action}
                  onClick={() => handleQuickAction(action.action)}
                  className="bg-white/5 border border-white/20 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/10 transition-all"
                  disabled={isLoading}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}