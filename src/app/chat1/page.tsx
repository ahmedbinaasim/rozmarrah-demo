import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar'
import { Chat } from '../../components/Chat'

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

