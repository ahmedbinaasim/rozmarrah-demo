import Image from 'next/image'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { Button } from '../components/ui/Button'

export function Navbar() {
  return (
    <nav className="border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png?height=32&width=32"
              alt="RozMarrah Logo"
              width={32}
              height={32}
              className="rounded"
            />
            <span className="font-semibold text-lg">RozMarrah</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="default" className="bg-emerald-500 hover:bg-emerald-600">
            Create Job
          </Button>
          <button className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </button>
          <div className="flex items-center gap-2">
            <div className = "overflow-hidden rounded-full w-[40px] h-[40px]">
            <Image
              src="/pfp.jpeg"
              alt="Profile"
              width={40}
              height={40}
              className=""
            />
            </div>
            <div className="hidden md:block">
              <span className="flex items-center gap-2">
                Hi! Ali
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

