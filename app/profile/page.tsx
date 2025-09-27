"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { User, Star, Activity, LogOut, Settings, Award, Calendar, TrendingUp, Shield, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/ui/navbar"

// Mock user data
const mockUser = {
  name: "Priya Sharma",
  role: "Community Verifier",
  email: "priya.sharma@example.com",
  avatar: "",
  reputation: 4.8,
  totalVerifications: 127,
  joinDate: "March 2023",
  impactPoints: 2450,
  level: "Expert Verifier",
  recentActivity: [
    { id: 1, action: "Verified tree plantation", location: "Western Ghats", date: "2 hours ago", points: "+15" },
    {
      id: 2,
      action: "Completed nursery verification",
      location: "Village Nursery",
      date: "1 day ago",
      points: "+20",
    },
    { id: 3, action: "Verified forest restoration", location: "Himachal Pradesh", date: "3 days ago", points: "+25" },
    { id: 4, action: "Submitted soil quality report", location: "Karnataka Forest", date: "1 week ago", points: "+10" },
  ],
}

const navItems = [
  { href: "/verifier/dashboard", label: "Tasks", icon: <Activity className="h-5 w-5" /> },
  { href: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
]

export default function ProfilePage() {
  const router = useRouter()
  const [user] = useState(mockUser)

  const handleLogout = () => {
    router.push("/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen relative overflow-hidden pb-20">
      <div className="absolute inset-0 z-0">
        <Image src="/forest-canopy-sunlight.jpg" alt="Forest conservation" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 via-emerald-900/80 to-forest-900/85" />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 text-white p-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center mr-2">
                <Image
                  src="/Logo2.png"
                  alt="Vanasthali Sankalp Logo"
                  width={80}
                  height={25}
                  className="h-5 w-auto object-contain hover:opacity-80 transition-opacity"
                  priority
                />
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Profile</h1>
                <p className="text-white/80 text-sm">Your forest restoration journey</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-3 rounded-xl">
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto p-6 space-y-6">
        <Card className="bg-white/95 backdrop-blur-xl border-white/30 shadow-xl">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-gradient-to-br from-green-400 to-emerald-500">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-4 border-white">
                  <Shield className="h-5 w-5 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-slate-800">{user.name}</h2>
                <p className="text-lg text-slate-600 font-medium">{user.role}</p>
                <p className="text-sm text-slate-500 mt-1">{user.email}</p>
              </div>

              {/* Reputation Score */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200/50 px-6 py-4 rounded-2xl">
                <Star className="h-8 w-8 text-yellow-500 fill-current" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600">{user.reputation}</div>
                  <div className="text-sm text-slate-600 font-medium">Reputation Score</div>
                </div>
              </div>

              <div className="flex gap-3">
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm">
                  <Award className="h-4 w-4 mr-2" />
                  {user.level}
                </Badge>
                <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 text-sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {user.impactPoints} Points
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white/95 backdrop-blur-xl border-white/30 shadow-xl">
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600">{user.totalVerifications}</div>
                <div className="text-sm text-slate-600 font-medium">Verifications</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-xl border-white/30 shadow-xl">
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-600">18</div>
                <div className="text-sm text-slate-600 font-medium">Months Active</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/95 backdrop-blur-xl border-white/30 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Activity className="h-4 w-4 text-white" />
              </div>
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {user.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      <p className="text-sm text-slate-600">{activity.location}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold">
                    {activity.points}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleLogout}
          className="w-full h-16 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-lg font-bold shadow-xl"
        >
          <LogOut className="h-6 w-6 mr-3" />
          Logout
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="relative z-10">
        <Navbar items={navItems} />
      </div>
    </div>
  )
}
