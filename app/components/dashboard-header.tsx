import { Search, Calendar, MessageCircle, Bell, HelpCircle, Globe, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#001529] text-white">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="text-blue-400 font-bold text-xl">AquaMonitor</div>
        </div>
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-blue-400">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Monitoring
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Reports
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Pools
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Equipment
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Value-Added Services
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            System
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            SmartDesign
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <MessageCircle className="w-5 h-5" />
        <Bell className="w-5 h-5" />
        <Globe className="w-5 h-5" />
        <span>English</span>
        <User className="w-5 h-5" />
        <span>VSbvk1967</span>
        <Clock className="w-5 h-5" />
        <HelpCircle className="w-5 h-5" />
      </div>
    </header>
  )
}

