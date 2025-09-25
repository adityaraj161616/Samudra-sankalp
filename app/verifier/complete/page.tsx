"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle, Star, Home, ArrowRight, Award, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { gsap } from "gsap"

export default function VerificationCompletePage() {
  const router = useRouter()
  const checkmarkRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Background entrance
      tl.from(bgRef.current, {
        duration: 1.5,
        scale: 1.2,
        opacity: 0,
        ease: "power3.out",
      })

        // Checkmark dramatic entrance
        .from(
          checkmarkRef.current,
          {
            duration: 1.2,
            scale: 0,
            rotation: -360,
            ease: "back.out(2)",
          },
          0.5,
        )

        // Content stagger
        .from(
          contentRef.current?.children || [],
          {
            duration: 0.8,
            y: 40,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out",
          },
          1.2,
        )

      // Floating particles
      gsap.to(".success-particle", {
        y: -25,
        duration: 4,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.6,
      })
    }, [])

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      {/* Enhanced Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <Image src="/marine-conservation-team.jpg" alt="Verification success" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-blue-900/80 to-cyan-900/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* Floating success particles */}
      <div className="absolute inset-0 z-1">
        <div className="success-particle absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl" />
        <div className="success-particle absolute top-40 right-20 w-16 h-16 bg-blue-400/20 rounded-full blur-lg" />
        <div className="success-particle absolute bottom-32 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-xl" />
        <div className="success-particle absolute bottom-20 right-1/3 w-18 h-18 bg-emerald-300/20 rounded-full blur-lg" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <Card className="premium-card bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
            <CardContent className="pt-12 pb-12 px-8">
              {/* Success Checkmark */}
              <div ref={checkmarkRef} className="mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="relative w-32 h-32 mx-auto mb-6"
                >
                  <div className="w-full h-full bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl">
                    <CheckCircle className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Content */}
              <div ref={contentRef} className="space-y-6 text-center">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  className="text-3xl font-bold text-slate-800"
                >
                  Verification Recorded!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="text-lg text-slate-600 leading-relaxed"
                >
                  Thank you for completing the field verification. Your contribution helps maintain the integrity of our
                  conservation efforts and builds trust in environmental restoration.
                </motion.p>

                {/* Enhanced Reward Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200/50 rounded-2xl p-6 mt-8"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <TrendingUp className="h-6 w-6 text-emerald-600" />
                    <span className="font-bold text-emerald-800 text-lg">Reputation & Rewards Updated</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center bg-white/60 rounded-xl p-4">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">+15</div>
                      <div className="text-sm text-slate-600 font-medium">Reputation Points</div>
                    </div>
                    <div className="text-center bg-white/60 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-600 mb-1">₹150</div>
                      <div className="text-sm text-slate-600 font-medium">Verification Reward</div>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Impact Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.8 }}
                  className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200/50 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="h-6 w-6 text-blue-600" />
                    <h3 className="font-bold text-blue-800 text-lg">Impact Created</h3>
                  </div>
                  <p className="text-slate-700 text-left leading-relaxed">
                    Your verification helps ensure that conservation claims are accurate and trustworthy, building
                    confidence in environmental restoration efforts across India. Every verification contributes to a
                    more transparent and effective conservation ecosystem.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                  className="flex flex-col gap-4 mt-10"
                >
                  <Button
                    onClick={() => router.push("/verifier/dashboard")}
                    className="w-full h-16 btn-premium text-xl font-bold"
                  >
                    <Home className="h-6 w-6 mr-3" />
                    Back to Dashboard
                  </Button>

                  <Button
                    onClick={() => router.push("/verifier/dashboard")}
                    variant="outline"
                    className="w-full h-16 bg-white/90 border-2 border-slate-200 hover:bg-slate-50 text-lg font-semibold"
                  >
                    Find More Tasks
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced animated success particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full"
              initial={{
                x: Math.random() * 400,
                y: 600,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                y: -100,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 4,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
