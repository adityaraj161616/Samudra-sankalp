"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Clock, DollarSign, Navigation, Filter, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/ui/navbar"
import { mockTasks, mockUserStats } from "@/lib/mock-data"
import { animations } from "@/lib/animations"
import Link from "next/link"

const navItems = [
  { href: "/verifier/dashboard", label: "Tasks", icon: <TreePine className="h-5 w-5" /> },
  { href: "/profile", label: "Profile", icon: <Navigation className="h-5 w-5" /> },
]

export default function VerifierDashboard() {
  const [tasks] = useState(mockTasks)
  const [stats] = useState(mockUserStats.verifier)
  const [selectedTask, setSelectedTask] = useState<number | null>(null)

  const mapRef = useRef<HTMLDivElement>(null)
  const tasksRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP animations on mount
    animations.fadeIn(mapRef.current, { delay: 0.2 })
    animations.slideInLeft(statsRef.current, { delay: 0.4 })
    animations.slideInRight(tasksRef.current, { delay: 0.6 })
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-amber-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pb-20">
      {/* Map Section - Top 60% */}
      <div className="h-[60vh] relative">
        <div
          ref={mapRef}
          className="gsap-fade-in h-full bg-gradient-to-br from-green-600/90 via-emerald-500/80 to-green-700/90 relative overflow-hidden"
        >
          {/* Forest Background */}
          <div className="absolute inset-0 bg-[url('/forest-conservation-hero.jpg')] bg-cover bg-center opacity-30" />

          {/* Map Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent" />

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-green-800/90 to-transparent">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h1 className="text-xl font-semibold">Tree Restoration Tasks</h1>
                  <p className="text-white/90 text-sm">Verify forest restoration projects</p>
                </div>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Map Pins */}
          {tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                index === 0 ? "top-1/3 left-1/4" : "top-2/3 right-1/3"
              }`}
              onClick={() => setSelectedTask(task.id)}
            >
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                    task.priority === "high" ? "bg-red-500" : "bg-green-600"
                  } text-white`}
                >
                  <TreePine className="h-4 w-4" />
                </div>
                {selectedTask === task.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-2 min-w-[120px] border"
                  >
                    <p className="text-xs font-medium text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-600">{task.distance}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Stats Overlay */}
          <div ref={statsRef} className="gsap-slide-in-left absolute bottom-4 left-4 right-4">
            <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{stats.totalVerifications}</div>
                    <div className="text-xs text-gray-600">Verified</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-emerald-600">{stats.reputation}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-gray-800">₹{stats.monthlyEarnings}</div>
                    <div className="text-xs text-gray-600">Monthly</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section - Bottom 40% */}
      <div className="h-[40vh] bg-white">
        <div ref={tasksRef} className="gsap-slide-in-right h-full">
          {/* Pull-up Handle */}
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          <div className="px-4 pb-4 h-full overflow-hidden">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Forest Restoration Tasks</h2>
                <Badge className="bg-green-100 text-green-700 border-green-200">{tasks.length} available</Badge>
              </div>

              <div className="space-y-3 overflow-y-auto h-full pb-16">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <Card
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-green-100 hover:border-green-200"
                      asChild
                    >
                      <Link href={`/verifier/task-details/${task.id}`}>
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <TreePine className="h-5 w-5 text-green-600" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-sm leading-tight group-hover:text-green-600 transition-colors text-gray-800">
                                  {task.title}
                                </h3>
                                <Badge className={getPriorityColor(task.priority)} size="sm">
                                  {task.priority}
                                </Badge>
                              </div>

                              <p className="text-xs text-gray-600 mb-2 line-clamp-2">{task.description}</p>

                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1 text-gray-500">
                                    <Navigation className="h-3 w-3" />
                                    <span>{task.distance}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    <span>{task.estimatedTime}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 font-medium text-green-600">
                                  <DollarSign className="h-3 w-3" />
                                  <span>₹{task.reward}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                                <span className="text-xs text-gray-500">{task.ngoName}</span>
                                <span className="text-xs text-gray-500">{formatTimeAgo(task.submittedAt)}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <Navbar items={navItems} />
    </div>
  )
}
