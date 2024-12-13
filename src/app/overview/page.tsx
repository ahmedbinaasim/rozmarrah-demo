'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Edit2 } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { EditModal } from '../../components/ui/EditModal'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'

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

export default function Overview() {
  const router = useRouter()
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [jobDetails, setJobDetails] = useState(() => {
    if (typeof window !== 'undefined') {
      const responses = localStorage.getItem('jobResponses')
      if (responses) {
        const [title, description, budget, deadline, timeframe] = JSON.parse(responses)
        return {
          title,
          description,
          budget: budget.includes('$') ? budget : `${budget}$`,
          deadline: new Date(deadline).toLocaleString(),
          timeframe
        }
      }
    }
    return {
      title: '',
      description: '',
      budget: '',
      deadline: '',
      timeframe: ''
    }
  })

  useEffect(() => {
    return () => {
      localStorage.removeItem('jobResponses')
    }
  }, [])

  const [activeModal, setActiveModal] = useState<keyof typeof jobDetails | null>(null)
  const [editValue, setEditValue] = useState('')

  const handleEdit = (field: keyof typeof jobDetails) => {
    let value = jobDetails[field]
    
    switch (field) {
      case 'budget':
        value = value.replace('$', '')
        break
      case 'deadline':
        try {
          const date = new Date(value)
          value = date.toISOString().slice(0, 16)
        } catch {
          value = new Date().toISOString().slice(0, 16)
        }
        break
      case 'timeframe':
        const matchingInterval = timeIntervals.find(t => t.label === value) || timeIntervals[0]
        value = matchingInterval.label
        break
    }
    
    setEditValue(value)
    setActiveModal(field)
  }

  const handleSave = (value: string) => {
    if (activeModal) {
      let formattedValue = value.trim()
      
      switch (activeModal) {
        case 'budget':
          formattedValue = formattedValue.replace('$', '') + '$'
          break
        case 'deadline':
          formattedValue = new Date(value).toLocaleString()
          break
        case 'timeframe':
          if (!formattedValue.includes('minute') && !formattedValue.includes('hour')) {
            formattedValue = timeIntervals[0].label
          }
          break
      }
  
      const updatedDetails = {
        ...jobDetails,
        [activeModal]: formattedValue
      }
  
      setJobDetails(updatedDetails)
      
      const responsesArray = [
        updatedDetails.title,
        updatedDetails.description,
        updatedDetails.budget,
        updatedDetails.deadline,
        updatedDetails.timeframe
      ]
      localStorage.setItem('jobResponses', JSON.stringify(responsesArray))
      setActiveModal(null)
    }
  }

  const handleStart = () => {
    setShowConfirmModal(true)
  }

  const handleConfirm = () => {
    // Parse timeframe to get total seconds
    let totalSeconds = 0
    if (jobDetails.timeframe.includes('seconds')) {
      totalSeconds = 30  // For 30 seconds option
    } else if (jobDetails.timeframe.includes('minutes')) {
      const minutes = parseInt(jobDetails.timeframe.split(' ')[0])
      totalSeconds = minutes * 60
    } else if (jobDetails.timeframe.includes('hour')) {
      const [hours, minutesPart] = jobDetails.timeframe.split(' hour')
      totalSeconds = (parseInt(hours) * 3600) + 
        (minutesPart ? parseInt(minutesPart.split(' ')[1]) * 60 : 0)
    }
    
    localStorage.setItem('selectedTimeframe', totalSeconds.toString())
    setShowConfirmModal(false)
    router.push('/countdown')
  }

  const handleCancel = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-semibold mb-8">Overview</h1>
          
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <p className="text-gray-600">You are looking for</p>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-medium">{jobDetails.title}</span>
                <button onClick={() => handleEdit('title')} className="text-gray-400 hover:text-gray-600">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">Short description</p>
              <div className="flex items-start gap-2">
                <span className="text-gray-900">{jobDetails.description}</span>
                <button onClick={() => handleEdit('description')} className="text-gray-400 hover:text-gray-600">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">Your budget</p>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-medium">{jobDetails.budget}</span>
                <button onClick={() => handleEdit('budget')} className="text-gray-400 hover:text-gray-600">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">Deadline</p>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-medium">{jobDetails.deadline}</span>
                <button onClick={() => handleEdit('deadline')} className="text-gray-400 hover:text-gray-600">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-gray-600">How soon do you want to hire?</p>
              <div className="flex items-center gap-2">
                <span className="text-emerald-500 font-medium">{jobDetails.timeframe}</span>
                <button onClick={() => handleEdit('timeframe')} className="text-gray-400 hover:text-gray-600">
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4 pt-8">
              <Button onClick={handleStart} className="bg-emerald-500 hover:bg-emerald-600">
                Start
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>

          {/* Edit Modals */}
          <EditModal
            isOpen={activeModal === 'title'}
            onClose={() => setActiveModal(null)}
            onSave={handleSave}
            title="Edit Job Title"
            value={editValue}
          >
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </EditModal>

          <EditModal
            isOpen={activeModal === 'description'}
            onClose={() => setActiveModal(null)}
            onSave={handleSave}
            title="Edit Description"
            value={editValue}
          >
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </EditModal>

          <EditModal
            isOpen={activeModal === 'budget'}
            onClose={() => setActiveModal(null)}
            onSave={handleSave}
            title="Edit Budget"
            value={editValue}
          >
            <input
              type="text"
              value={editValue.replace('$', '')}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Enter amount in $"
            />
          </EditModal>

          <EditModal
            isOpen={activeModal === 'deadline'}
            onClose={() => setActiveModal(null)}
            onSave={handleSave}
            title="Edit Deadline"
            value={editValue}
          >
            <input
              type="datetime-local"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </EditModal>

          <EditModal
            isOpen={activeModal === 'timeframe'}
            onClose={() => setActiveModal(null)}
            onSave={handleSave}
            title="Edit Timeframe"
            value={editValue}
          >
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">Select time</option>
              {timeIntervals.map((time) => (
                <option key={time.value} value={time.label}>
                  {time.label}
                </option>
              ))}
            </select>
          </EditModal>

          {/* Confirmation Modal */}
          {showConfirmModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold mb-4">Confirm Start</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to start looking for providers? This will begin the {jobDetails.timeframe} countdown.
                </p>
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}