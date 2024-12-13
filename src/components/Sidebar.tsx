import Link from 'next/link'
import { LayoutDashboard, OctagonAlert, Briefcase, MessageSquare, User, LogOut } from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: OctagonAlert, label: 'Urgent', href: '/chat1' },
  { icon: Briefcase, label: 'Manage Jobs', href: '/jobs' },
  { icon: MessageSquare, label: 'Chat', href: '/chat' },
  { icon: User, label: 'Profile', href: '/profile' },
]

export function Sidebar() {
  return (
    <div className="w-64 border-r h-[calc(100vh-73px)] p-4 hidden md:block">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 ${
              item.label === 'Urgent' ? 'bg-emerald-500 text-white hover:bg-emerald-600' : ''
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
        <button className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 w-full mt-4">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </nav>
    </div>
  )
}

