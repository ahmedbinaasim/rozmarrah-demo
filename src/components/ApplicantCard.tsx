'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { MoreVertical, Shield } from 'lucide-react'

interface ApplicantCardProps {
  name: string
  jobTitle: string
  price: string
  date: string
  rank?: number
}

export function ApplicantCard({ name, jobTitle, price, date, rank }: ApplicantCardProps) {
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isTooltipVisible, setIsTooltipVisible] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getBadgeColor = (rank: number) => {
    switch(rank) {
      case 1:
        return 'bg-yellow-400'
      case 2:
        return 'bg-gray-300'
      case 3:
        return 'bg-amber-600'
      default:
        return 'bg-gray-200'
    }
  }

  const getBadgeTooltip = (rank: number) => {
    switch(rank) {
      case 1:
        return 'This RozMarrah Provider is an Exceptional Match for your job!'
      case 2:
        return 'This RozMarrah Provider is a Strong Match for your job'
      case 3:
        return 'This RozMarrah Provider is a Good Match for your job'
      default:
        return ''
    }
  }

  const handleVisitProfile = () => {
    setIsDropdownOpen(false)
    router.push('/applicantProfile')
  }

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src="/pfp1.png?height=48&width=48"
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
          {rank && rank <= 5 && (
            <div 
              className="relative"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              {rank <= 3 ? (
                <div className="absolute -top-2 -right-2">
                  <Shield 
                    className={`h-6 w-6 ${
                      rank === 1 
                        ? 'text-yellow-400'
                        : rank === 2 
                        ? 'text-gray-300'
                        : 'text-amber-600'
                    }`}
                  />
                </div>
              ) : (
                <div className={`absolute -top-2 -right-2 w-6 h-6 ${getBadgeColor(rank)} rounded-full flex items-center justify-center text-xs font-bold ${rank <= 3 ? 'text-white' : 'text-gray-600'}`}>
                  {rank}
                </div>
              )}
              {rank <= 3 && isTooltipVisible && (
                <div 
                  ref={tooltipRef}
                  className="absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
                  style={{
                    top: '-40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {getBadgeTooltip(rank)}
                </div>
              )}
            </div>
          )}
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-gray-500">{jobTitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <span className="text-sm">{price}/hr</span>
        <span className="hidden md:block px-3 py-1 text-sm text-emerald-600 bg-emerald-50 rounded-full">
          Pending
        </span>
        <span className="hidden md:block text-sm text-gray-500">{date}</span>
        <div className="relative" ref={dropdownRef}>
          <button 
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Hire
                </button>
                <button 
                  onClick={handleVisitProfile}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Visit Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}