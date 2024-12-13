'use client'

import { useState } from 'react'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { Button } from '../../components/ui/Button'
import { ApplicantCard } from '../../components/ApplicantCard'

// Pakistani names array for variety
const pakistaniNames = [
  "Ali Hassan",
  "Fatima Malik",
  "Muhammad Ahmed",
  "Ayesha Khan",
  "Zain Qureshi",
  "Sara Mahmood",
  "Omar Farooq",
  "Amna Zaidi",
  "Bilal Ahmad",
  "Zara Sheikh",
  "Hassan Syed",
  "Mehreen Akhtar",
  "Usman Ali",
  "Nadia Hussain",
  "Ibrahim Shah",
  "Saira Wasim",
  "Kamran Rashid"
]

// Generate random price between 70 and 120
const getRandomPrice = () => Math.floor(Math.random() * (100 - 30 + 1) + 30)

// Mock data for 17 applicants with Pakistani names and randomized prices
const mockApplicants = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  name: pakistaniNames[i],
  jobTitle: 'UI/UX Design',
  price: `${getRandomPrice()}$`,
  date: '23/7/2024'
}))

export default function ApplicantsPage() {
  const [visibleCount, setVisibleCount] = useState(5)
  
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 5, mockApplicants.length))
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Applicants</h1>
              <p className="text-gray-500">
                Total Applicants: {mockApplicants.length}
              </p>
            </div>

            <div className="space-y-4">
              {mockApplicants.slice(0, visibleCount).map((applicant, index) => (
                <ApplicantCard
                  key={applicant.id}
                  name={applicant.name}
                  jobTitle={applicant.jobTitle}
                  price={applicant.price}
                  date={applicant.date}
                  rank={index + 1}
                />
              ))}
            </div>

            {visibleCount < mockApplicants.length && (
              <div className="flex justify-end mt-6">
                <Button
                  onClick={handleLoadMore}
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  Load next {Math.min(5, mockApplicants.length - visibleCount)}
                </Button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}