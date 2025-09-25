"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, Camera, Check, X, Upload, Shield, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { mockTasks, mockClaims } from "@/lib/mock-data"
import { gsap } from "gsap"

export default function ApproveRejectPage() {
  const router = useRouter()
  const params = useParams()
  const taskId = Number.parseInt(params.id as string)

  const [task] = useState(mockTasks.find((t) => t.id === taskId))
  const [claim] = useState(mockClaims.find((c) => c.id === task?.claimId))
  const [verificationPhotos, setVerificationPhotos] = useState<File[]>([])
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
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

        // Action buttons
        .from(
          actionsRef.current?.children || [],
          {
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          1.2,
        )
    }, [])

    return () => ctx.revert()
  }, [])

  if (!task || !claim) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-slate-400" />
          </div>
          <p className="text-xl font-semibold text-slate-600">Task not found</p>
        </div>
      </div>
    )
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files)
      setVerificationPhotos((prev) => [...prev, ...newPhotos])
    }
  }

  const removePhoto = (index: number) => {
    setVerificationPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleApprove = async () => {
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/verifier/complete")
  }

  const handleReject = async () => {
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    router.push("/verifier/complete")
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image src="/underwater-coral-restoration.jpg" alt="Underwater verification" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-cyan-900/80 to-green-900/85" />
      </div>

      {/* Enhanced Header */}
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
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Complete Verification</h1>
                <p className="text-white/80 text-sm">Make your final decision</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-md mx-auto p-6 space-y-6">
        <div ref={contentRef} className="space-y-6">
          {/* Verification Question */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="premium-card bg-white/95 backdrop-blur-xl border-white/30">
              <CardContent className="pt-8 pb-8">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-10 w-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3 text-slate-800">Is the claim accurate?</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      Based on your field verification, please confirm if the NGO's claim matches reality.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Claim Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <Card className="premium-card bg-white/95 backdrop-blur-xl border-white/30">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  Claim to Verify
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-lg p-3">
                      <span className="text-sm text-slate-500 font-medium">Type</span>
                      <p className="font-bold text-slate-800">{claim.type}</p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-3">
                      <span className="text-sm text-slate-500 font-medium">Quantity</span>
                      <p className="font-bold text-green-600">
                        {claim.quantity} {claim.unit}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-3">
                    <span className="text-sm text-slate-500 font-medium">Location</span>
                    <p className="font-bold text-slate-800">{claim.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Add Verification Photos */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="premium-card bg-white/95 backdrop-blur-xl border-white/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                  Add Your Photo Proof
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-16 border-dashed border-2 hover:bg-blue-50 bg-white/90 border-blue-300 text-blue-600"
                  onClick={() => document.getElementById("verification-upload")?.click()}
                >
                  <Upload className="h-6 w-6 mr-3" />
                  <span className="text-lg font-medium">Upload Verification Photos</span>
                </Button>
                <input
                  id="verification-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                />

                {/* Photo Preview */}
                {verificationPhotos.length > 0 && (
                  <div className="grid grid-cols-2 gap-4">
                    {verificationPhotos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200">
                          <img
                            src={URL.createObjectURL(photo) || "/placeholder.svg"}
                            alt={`Verification ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          onClick={() => removePhoto(index)}
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
          >
            <Card className="premium-card bg-white/95 backdrop-blur-xl border-white/30">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Label htmlFor="notes" className="text-lg font-semibold">
                    Verification Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any observations or comments about the verification..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="resize-none bg-white/90 border-slate-200 text-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div ref={actionsRef} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              onClick={handleApprove}
              disabled={isSubmitting}
              className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl font-bold shadow-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  <Check className="h-6 w-6 mr-3" />
                  Approve Claim
                </>
              )}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <Button
              onClick={handleReject}
              disabled={isSubmitting}
              className="w-full h-16 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white text-xl font-bold shadow-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  <X className="h-6 w-6 mr-3" />
                  Reject Claim
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
