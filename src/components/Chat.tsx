'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, MoreVertical, Mic, ChevronDown } from 'lucide-react'
import { Button } from './../components/ui/Button'
import Image from 'next/image'

type Message = {
  id: number
  text: string
  sender: 'system' | 'user'
  timestamp: string
}

// Updated time intervals starting with 5 minutes
const timeIntervals = [
  { value: '30s', label: '30 seconds' },
  { value: '5m', label: '5 minutes' },
  { value: '15m', label: '15 minutes' },
  { value: '30m', label: '30 minutes' },
  { value: '45m', label: '45 minutes' },
  ...Array.from({ length: 92 }, (_, i) => {
    const hours = Math.floor((i * 15 + 60) / 60)
    const minutes = (i * 15 + 60) % 60
    return {
      value: `${hours}h ${minutes}m`,
      label: `${hours} hour${hours !== 1 ? 's' : ''} ${minutes > 0 ? ` ${minutes} minute${minutes !== 1 ? 's' : ''}` : ''}`
    }
  })
]

export function Chat() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [currentStep, setCurrentStep] = useState(0)
  const [userResponses, setUserResponses] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDateTime, setSelectedDateTime] = useState('')
  const [showDateTimePicker, setShowDateTimePicker] = useState(false)
  const [showTimeDropdown, setShowTimeDropdown] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const systemQuestions = [
    "Hi there! Welcome to RozMarrah - Urgent. What is the title of your job?",
    "Sounds great! Please give us a short description of this task.",
    "What's your budget? Enter a numeric amount ($) please.",
    "Almost there! What's the deadline of this task? Please enter the date and time.",
    "Last question (we promise). How soon do you want to finalize a RozMarrah provider for this task?"
  ]

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        text: systemQuestions[0],
        sender: 'system',
        timestamp: new Date().toLocaleTimeString()
      }])
    }
  }, [messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async () => {
    if (!currentInput.trim() && !showTimeDropdown && !showDateTimePicker) return

    const newMessage: Message = {
      id: Date.now(),
      text: currentInput,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, newMessage])
    setUserResponses(prev => [...prev, currentInput])

    if (currentStep === 2) { // After budget question
      setShowDateTimePicker(true)
      setCurrentStep(prev => prev + 1)
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: systemQuestions[3],
          sender: 'system',
          timestamp: new Date().toLocaleTimeString()
        }])
      }, 500)
    } else if (currentStep < systemQuestions.length - 2) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          text: systemQuestions[currentStep + 1],
          sender: 'system',
          timestamp: new Date().toLocaleTimeString()
        }])
        setCurrentStep(prev => prev + 1)
      }, 500)
    }
    
    setCurrentInput('')
  }

  const handleDateTimeConfirm = () => {
    if (!selectedDateTime) return

    const formattedDate = new Date(selectedDateTime).toLocaleString()
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: formattedDate,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }])
    setUserResponses(prev => [...prev, formattedDate])
    setShowDateTimePicker(false)
    setShowTimeDropdown(true)
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: systemQuestions[4],
        sender: 'system',
        timestamp: new Date().toLocaleTimeString()
      }])
    }, 500)
  }

  const handleTimeSelect = (time: string) => {
    const finalResponses = [...userResponses, time]
    localStorage.setItem('jobResponses', JSON.stringify(finalResponses))
    
    // Parse time to seconds
    let totalSeconds = 0;
    if (time.includes('seconds')) {
      totalSeconds = 30;
    } else if (time.includes('minutes')) {
      const minutes = parseInt(time.split(' ')[0])
      totalSeconds = minutes * 60
    } else if (time.includes('hour')) {
      const [hours, minutesPart] = time.split(' hour')
      totalSeconds = (parseInt(hours) * 3600) + 
        (minutesPart ? parseInt(minutesPart.split(' ')[1]) * 60 : 0)
    }
    
    localStorage.setItem('selectedTimeframe', totalSeconds.toString())
      
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: time,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    }])
      
    setIsLoading(true)
    setTimeout(() => {
      router.push('/overview')
    }, 2000)
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-73px)]">
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <ChevronLeft className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Urgent</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'flex-row-reverse' : ''} gap-3`}
          >
            {message.sender === 'system' && (
              <Image 
                src="/avatar.svg"
                alt="System Avatar" 
                width={40} 
                height={40}
              />
            )}
            <div className="flex items-start gap-2">
              <div className={`${message.sender === 'user' ? 'bg-emerald-500 text-white' : 'bg-gray-100'} rounded-lg p-3 max-w-[80%]`}>
                <p>{message.text}</p>
              </div>
              {message.sender === 'user' && (
                <button className="mt-2">
                  <MoreVertical className="h-4 w-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        {showTimeDropdown ? (
          <div className="space-y-4">
            <div className="relative">
              <select
                className="w-full p-2 pr-10 border rounded-lg focus:ring-2 focus:ring-emerald-500 appearance-none"
                onChange={(e) => handleTimeSelect(e.target.value)}
              >
                <option value="">Select time interval</option>
                {timeIntervals.map((time) => (
                  <option key={time.value} value={time.label}>
                    {time.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        ) : showDateTimePicker ? (
          <div className="space-y-4">
            <input
              type="datetime-local"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-emerald-500"
              value={selectedDateTime}
              onChange={(e) => setSelectedDateTime(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowDateTimePicker(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDateTimeConfirm}
                disabled={!selectedDateTime}
              >
                OK
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Mic className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Write message"
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit()
                  }
                }}
              />
              <Button
                variant="secondary"
                onClick={handleSubmit}
                disabled={!currentInput.trim()}
              >
                Confirm
              </Button>
            </div>
            <div className="flex justify-end">
              <span className="text-xs text-gray-500">
                Please answer all the questions
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}