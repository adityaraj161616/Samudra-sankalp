"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, DollarSign, Navigation, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/ui/navbar"
import { mockTasks, mockUserStats } from "@/lib/mock-data"
import { animations } from "@/lib/animations"
import Link from "next/link"

const navItems = [
  { href: "/verifier/dashboard", label: "Tasks", icon: <MapPin className="h-5 w-5" /> },
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
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-secondary text-secondary-foreground"
      default:
        return "bg-muted text-muted-foreground"
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
    <div className="min-h-screen bg-background pb-20">
      {/* Map Section - Top 60% */}
      <div className="h-[60vh] relative">
        <div
          ref={mapRef}
          className="gsap-fade-in h-full bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/30 relative overflow-hidden"
        >
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=400&text=Map')] bg-cover bg-center opacity-20" />

          {/* Map Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

          {/* Header */}
          <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-primary/90 to-transparent">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between text-white">
                <div>
                  <h1 className="text-xl font-semibold">Verification Tasks</h1>
                  <p className="text-white/80 text-sm">Find tasks near you</p>
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
                    task.priority === "high" ? "bg-destructive" : "bg-secondary"
                  } text-white`}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                {selectedTask === task.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-card rounded-lg shadow-xl p-2 min-w-[120px] border"
                  >
                    <p className="text-xs font-medium">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.distance}</p>
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
                <Card className="bg-card/80 backdrop-blur-sm border-0">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-primary">{stats.totalVerifications}</div>
                    <div className="text-xs text-muted-foreground">Verified</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border-0">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-secondary">{stats.reputation}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <Card className="bg-card/80 backdrop-blur-sm border-0">
                  <CardContent className="p-3 text-center">
                    <div className="text-lg font-bold text-foreground">₹{stats.monthlyEarnings}</div>
                    <div className="text-xs text-muted-foreground">Monthly</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section - Bottom 40% */}
      <div className="h-[40vh] bg-background">
        <div ref={tasksRef} className="gsap-slide-in-right h-full">
          {/* Pull-up Handle */}
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-muted-foreground/30 rounded-full" />
          </div>

          <div className="px-4 pb-4 h-full overflow-hidden">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Tasks Near You</h2>
                <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                  {tasks.length} available
                </Badge>
              </div>

              <div className="space-y-3 overflow-y-auto h-full pb-16">
                {tasks.map((task, index) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" asChild>
                      <Link href={`/verifier/task-details/${task.id}`}>
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
                                  {task.title}
                                </h3>
                                <Badge className={getPriorityColor(task.priority)} size="sm">
                                  {task.priority}
                                </Badge>
                              </div>

                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{task.description}</p>

                              <div className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Navigation className="h-3 w-3" />
                                    <span>{task.distance}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    <span>{task.estimatedTime}</span>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 font-medium text-secondary">
                                  <DollarSign className="h-3 w-3" />
                                  <span>₹{task.reward}</span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                                <span className="text-xs text-muted-foreground">{task.ngoName}</span>
                                <span className="text-xs text-muted-foreground">{formatTimeAgo(task.submittedAt)}</span>
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
