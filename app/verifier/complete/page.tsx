"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import { CheckCircle, Home, ArrowRight, Award, TrendingUp, TreePine } from "lucide-react"
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
      // Subtle floating particles only - no opacity animations
      gsap.to(".success-particle", {
        y: -15,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      })

      // Gentle scale pulse for checkmark
      gsap.to(checkmarkRef.current, {
        scale: 1.05,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })
    }, [])

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      <div ref={bgRef} className="absolute inset-0 z-0 opacity-100">
        <Image src="/forest-conservation-hero.jpg" alt="Verification success" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-emerald-800/80 to-green-900/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      {/* Floating success particles */}
      <div className="absolute inset-0 z-1">
        <div className="success-particle absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl" />
        <div className="success-particle absolute top-40 right-20 w-16 h-16 bg-emerald-400/20 rounded-full blur-lg" />
        <div className="success-particle absolute bottom-32 left-1/4 w-24 h-24 bg-green-300/20 rounded-full blur-xl" />
        <div className="success-particle absolute bottom-20 right-1/3 w-18 h-18 bg-emerald-300/20 rounded-full blur-lg" />
      </div>

      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 1, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Card className="bg-white/95 backdrop-blur-xl border-green-200/50 shadow-2xl">
            <CardContent className="pt-12 pb-12 px-8">
              <div ref={checkmarkRef} className="mb-8 opacity-100">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 150,
                  }}
                  className="relative w-32 h-32 mx-auto mb-6"
                >
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                    <CheckCircle className="h-16 w-16 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                </motion.div>
              </div>

              <div ref={contentRef} className="space-y-6 text-center opacity-100">
                <motion.h1
                  initial={{ opacity: 1, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="text-3xl font-bold text-gray-800"
                >
                  Verification Recorded!
                </motion.h1>

                <motion.p
                  initial={{ opacity: 1, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="text-lg text-gray-600 leading-relaxed"
                >
                  Thank you for completing the forest restoration verification. Your contribution helps maintain the
                  integrity of our tree planting efforts and builds trust in environmental restoration projects.
                </motion.p>

                {/* Enhanced Reward Card */}
                <motion.div
                  initial={{ opacity: 1, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200/50 rounded-2xl p-6 mt-8"
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    <span className="font-bold text-green-800 text-lg">Reputation & Rewards Updated</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center bg-white/60 rounded-xl p-4">
                      <div className="text-2xl font-bold text-green-600 mb-1">+15</div>
                      <div className="text-sm text-gray-600 font-medium">Reputation Points</div>
                    </div>
                    <div className="text-center bg-white/60 rounded-xl p-4">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">₹150</div>
                      <div className="text-sm text-gray-600 font-medium">Verification Reward</div>
                    </div>
                  </div>
                </motion.div>

                {/* Enhanced Impact Message */}
                <motion.div
                  initial={{ opacity: 1, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200/50 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <TreePine className="h-6 w-6 text-emerald-600" />
                    <h3 className="font-bold text-emerald-800 text-lg">Forest Impact Created</h3>
                  </div>
                  <p className="text-gray-700 text-left leading-relaxed">
                    Your verification helps ensure that tree restoration claims are accurate and trustworthy, building
                    confidence in reforestation efforts across India. Every verification contributes to a more
                    transparent and effective forest restoration ecosystem.
                  </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 1, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className="flex flex-col gap-4 mt-10"
                >
                  <Button
                    onClick={() => router.push("/verifier/dashboard")}
                    className="w-full h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xl font-bold shadow-xl"
                  >
                    <Home className="h-6 w-6 mr-3" />
                    Back to Dashboard
                  </Button>

                  <Button
                    onClick={() => router.push("/verifier/dashboard")}
                    variant="outline"
                    className="w-full h-16 bg-white/90 border-2 border-green-200 hover:bg-green-50 text-lg font-semibold text-green-700"
                  >
                    Find More Tasks
                    <ArrowRight className="h-5 w-5 ml-3" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-60"
              initial={{
                x: Math.random() * 400,
                y: 500,
                scale: 0,
              }}
              animate={{
                y: -50,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                delay: i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
