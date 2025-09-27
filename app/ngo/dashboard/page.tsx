"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Plus, MapPin, Activity, FolderOpen, Star, Users, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FAB } from "@/components/ui/fab"
import { Navbar } from "@/components/ui/navbar"
import { mockProjects, mockUserStats } from "@/lib/mock-data"
import Link from "next/link"

const navItems = [
  { href: "/ngo/dashboard", label: "Home", icon: <Activity className="h-5 w-5" /> },
  { href: "/ngo/projects", label: "Projects", icon: <FolderOpen className="h-5 w-5" /> },
  { href: "/profile", label: "Profile", icon: <Users className="h-5 w-5" /> },
]

export default function NGODashboard() {
  const [projects] = useState(mockProjects)
  const [stats] = useState(mockUserStats.ngo)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/forest-canopy-sunlight.jpg" alt="Forest canopy" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-green-900/70 to-emerald-900/60" />
        </div>

        {/* Logo */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
          <Image
            src="/Logo2.png"
            alt="Samudra Sankalp Logo"
            width={120}
            height={38}
            className="h-6 w-auto md:h-8 md:w-auto"
          />
        </div>

        <div className="relative z-10 px-4 md:px-6 py-16 md:py-12">
          <div className="max-w-md mx-auto text-white">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="mt-8 md:mt-4">
                <h1 className="text-2xl md:text-3xl font-semibold mb-2">Welcome Back</h1>
                <p className="text-white/80 mb-6 md:mb-8 text-sm md:text-base">Forest Guardian Dashboard</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 mb-6">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 w-full sm:w-auto justify-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-semibold text-sm md:text-base">{stats.reputation}</span>
                  <span className="text-white/80 text-xs md:text-sm">Reputation</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 md:px-4 py-2 w-full sm:w-auto justify-center">
                  <Target className="h-4 w-4 text-green-400" />
                  <span className="font-semibold text-sm md:text-base">{stats.impactScore.toLocaleString()}</span>
                  <span className="text-white/80 text-xs md:text-sm">Impact</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 md:px-6 -mt-4 md:-mt-6 relative z-20">
        <motion.div
          className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="premium-card text-center">
            <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{stats.activeClaims}</div>
              <div className="text-xs md:text-sm text-slate-600">Active Claims</div>
            </CardContent>
          </Card>

          <Card className="premium-card text-center">
            <CardContent className="pt-4 md:pt-6 pb-4 md:pb-6">
              <div className="text-2xl md:text-3xl font-bold text-emerald-600 mb-1">{stats.verifiedClaims}</div>
              <div className="text-xs md:text-sm text-slate-600">Verified</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-semibold">Active Projects</h2>
            <Button variant="ghost" size="sm" className="text-green-600 text-sm" asChild>
              <Link href="/ngo/projects">View All</Link>
            </Button>
          </div>

          <div className="space-y-4 md:space-y-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <Card className="premium-card overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 p-3 md:p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-slate-800 leading-tight text-sm md:text-base line-clamp-2">
                            {project.name}
                          </h3>
                          <Badge
                            className={`${getStatusColor(project.status)} text-xs font-medium border ml-2 flex-shrink-0`}
                          >
                            {project.status}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-1 text-xs md:text-sm text-slate-500 mb-2 md:mb-3">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>

                        <div className="space-y-1 md:space-y-2">
                          <div className="flex justify-between text-xs md:text-sm">
                            <span className="text-slate-600">Progress</span>
                            <span className="font-semibold text-green-600">{project.progress}%</span>
                          </div>

                          <div className="w-full bg-slate-200 rounded-full h-1.5 md:h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 md:h-2 rounded-full transition-all duration-700"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>

                          <div className="text-xs text-slate-500">
                            {project.verifiedClaims}/{project.totalClaims} claims verified
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-6 md:mt-8 mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="premium-card">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <Button
                  className="h-14 md:h-16 flex-col gap-1 md:gap-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg text-xs md:text-sm"
                  asChild
                >
                  <Link href="/ngo/submit-claim">
                    <Plus className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="font-medium">New Claim</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="h-14 md:h-16 flex-col gap-1 md:gap-2 border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 bg-transparent text-xs md:text-sm"
                  asChild
                >
                  <Link href="/ngo/projects">
                    <FolderOpen className="h-5 w-5 md:h-6 md:w-6 text-slate-600" />
                    <span className="font-medium text-slate-700">Projects</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Floating Action Button */}
      <FAB asChild>
        <Link href="/ngo/submit-claim">
          <Plus className="h-6 w-6" />
        </Link>
      </FAB>

      {/* Bottom Navigation */}
      <Navbar items={navItems} />
    </div>
  )
}
