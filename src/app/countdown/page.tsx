'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '../../components/ui/Button'

const messages = [
  "We're finding the perfect match for your job...",
  "Our AI is searching for top talent...",
  "Hang tight! Great candidates are on their way...",
  "Quality takes time. We're almost there...",
  "Your ideal freelancer is just around the corner...",
  "Matching skills with your requirements...",
  "Analyzing freelancer portfolios...",
  "Verifying expertise levels...",
  "Checking availability windows...",
  "Reviewing past project success rates...",
  "Evaluating communication styles...",
  "Assessing project compatibility...",
  "Finding the best cultural fit...",
  "Gathering professional references..."
]

export default function CountdownPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const seconds = localStorage.getItem('selectedTimeframe')
      if (seconds) {
        return parseInt(seconds)
      }
    }
    return 7200 // Default to 2 hours
  })
  const [currentMessage, setCurrentMessage] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setCurrentMessage((prevMessage) => (prevMessage + 1) % messages.length)
        setFadeIn(true)
      }, 800)
    }, 6000)

    return () => clearInterval(messageInterval)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleViewApplicants = () => {
    if (timeLeft === 0) {
      router.push('/applicants')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center space-y-12 max-w-2xl w-full">
            <div
              className={`text-3xl min-h-32 flex items-center justify-center transition-all duration-800 ${
                fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="bg-gradient-to-r from-emerald-500 to-emerald-700 text-transparent bg-clip-text">
                {messages[currentMessage]}
              </span>
            </div>
            
            <div className="flex flex-col items-center gap-8">
              <div className="text-7xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 text-transparent bg-clip-text">
                {formatTime(timeLeft)}
              </div>
              
              <Button
                onClick={handleViewApplicants}
                disabled={timeLeft > 0}
                className={`w-full max-w-md py-6 text-lg transition-all duration-500 ${
                  timeLeft > 0
                    ? 'opacity-50 cursor-not-allowed bg-gray-400'
                    : 'opacity-100 bg-emerald-500 hover:bg-emerald-600'
                }`}
              >
                View Applicants
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}