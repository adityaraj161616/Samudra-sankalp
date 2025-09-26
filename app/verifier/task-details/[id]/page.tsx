"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, MapPin, Clock, DollarSign, User, Calendar, Camera, CheckCircle, Star, TreePine } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockTasks, mockClaims } from "@/lib/mock-data"
import { gsap } from "gsap"

export default function TaskDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = Number.parseInt(params.id as string)

  const [task] = useState(mockTasks.find((t) => t.id === taskId))
  const [claim] = useState(mockClaims.find((c) => c.id === task?.claimId))

  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const actionRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Background entrance
      tl.from(bgRef.current, {
        duration: 1,
        scale: 1.1,
        opacity: 0,
        ease: "power3.out",
      })

        // Header slide down
        .from(
          headerRef.current,
          {
            duration: 0.8,
            y: -100,
            opacity: 0,
            ease: "power3.out",
          },
          0.2,
        )

        // Content cards stagger
        .from(
          contentRef.current?.children || [],
          {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.15,
            ease: "power3.out",
          },
          0.5,
        )

        // Action button
        .from(
          actionRef.current,
          {
            duration: 0.8,
            y: 50,
            opacity: 0,
            scale: 0.95,
            ease: "back.out(1.7)",
          },
          1,
        )
    }, [])

    return () => ctx.revert()
  }, [])

  if (!task || !claim) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TreePine className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xl font-semibold text-green-800">Task not found</p>
          <p className="text-green-600 mt-2">The verification task you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const handleAcceptTask = () => {
    router.push(`/verifier/approve-reject/${task.id}`)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white"
      case "medium":
        return "bg-amber-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-slate-500 text-white"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image
          src="/hero-forest-background.jpg"
          alt="Forest restoration site aerial view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/90 via-emerald-800/70 to-green-900/85" />
      </div>

      <div
        ref={headerRef}
        className="relative z-10 bg-white/10 backdrop-blur-xl border-b border-white/20 text-white p-6"
      >
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-white hover:bg-white/20 p-3 rounded-xl"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                <TreePine className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Tree Restoration Verification</h1>
                <p className="text-white/80 text-sm">Review and verify tree planting claim</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto p-6 space-y-6">
        <div ref={contentRef} className="space-y-6">
          {/* Task Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-white/95 backdrop-blur-xl border-white/30 shadow-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl leading-tight pr-4 text-green-800">{task.title}</CardTitle>
                  <Badge className={`${getPriorityColor(task.priority)} font-semibold px-3 py-1`}>
                    {task.priority.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-slate-600 leading-relaxed text-lg">{task.description}</p>

                {/* Task Details Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Distance</p>
                      <p className="font-bold text-slate-800">{task.distance}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Duration</p>
                      <p className="font-bold text-slate-800">{task.estimatedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">Reward</p>
                      <p className="font-bold text-green-600 text-lg">₹{task.reward}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium">NGO</p>
                      <p className="font-bold text-slate-800">{task.ngoName}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="font-bold text-green-800">Verification Location</span>
                  </div>
                  <p className="text-slate-700 font-medium">{task.location}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <Card className="bg-white/95 backdrop-blur-xl border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <TreePine className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-green-800">Tree Restoration Claim</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Project Type</p>
                    <p className="font-bold text-slate-800 text-lg">{claim.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Trees Planted</p>
                    <p className="font-bold text-green-600 text-lg">
                      {claim.quantity} {claim.unit}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-slate-500 font-medium mb-2">Project Description</p>
                  <p className="text-slate-700 leading-relaxed">{claim.description}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 bg-green-50 rounded-lg p-3 border border-green-100">
                  <Calendar className="h-4 w-4 text-green-600" />
                  <span>Submitted {formatDate(claim.submittedAt)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="bg-white/95 backdrop-blur-xl border-white/30 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-green-800">Photo Evidence</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-green-50 rounded-xl overflow-hidden border-2 border-green-200">
                  <Image
                    src={claim.photos[0] || "/forest-saplings-planted.jpg"}
                    alt="Tree planting proof"
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-slate-500">Photo submitted by {claim.ngoName}</p>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-amber-500 fill-current" />
                    <span className="text-sm font-medium text-slate-600">High Quality</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          ref={actionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            onClick={handleAcceptTask}
            className="w-full h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xl font-bold shadow-xl"
          >
            <CheckCircle className="h-6 w-6 mr-3" />
            Accept & Start Tree Verification
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
