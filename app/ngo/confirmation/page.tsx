"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ArrowRight, Home, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function ConfirmationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 z-0">
        <Image src="/marine-conservation-team.jpg" alt="Marine conservation success" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-blue-900/80 to-cyan-900/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20">
        <Link href="/" className="flex items-center">
          <Image
            src="/Logo2.png"
            alt="Vanasthali Sankalp Logo"
            width={120}
            height={38}
            className="h-6 w-auto md:h-8 object-contain hover:opacity-80 transition-opacity"
            priority
          />
        </Link>
      </div>

      <div className="relative z-10 max-w-md w-full">
        <Card className="bg-white/95 backdrop-blur-xl border-white/30 shadow-2xl">
          <CardContent className="pt-12 pb-12 px-8">
            {/* Success Checkmark */}
            <div className="mb-8">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 text-center">
              <h1 className="text-3xl font-bold text-slate-800">Claim Submitted Successfully!</h1>

              <p className="text-lg text-slate-600 leading-relaxed">
                Your conservation impact has been documented and submitted for verification. Local verifiers will review
                your contribution soon.
              </p>

              {/* Info Card */}
              <div className="bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200/50 rounded-2xl p-6 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <Waves className="h-6 w-6 text-blue-600" />
                  <h3 className="font-bold text-blue-800 text-lg">What happens next?</h3>
                </div>
                <ul className="text-sm text-slate-700 space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Nearby verifiers receive your claim notification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Field verification will be scheduled within 24-48 hours</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Real-time updates on verification progress</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <span>Impact points and reputation boost upon approval</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 mt-10">
                <Button
                  onClick={() => router.push("/ngo/dashboard")}
                  className="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-xl font-bold"
                >
                  <Home className="h-6 w-6 mr-3" />
                  Back to Dashboard
                </Button>

                <Button
                  onClick={() => router.push("/ngo/submit-claim")}
                  variant="outline"
                  className="w-full h-16 bg-white/90 border-2 border-slate-200 hover:bg-slate-50 text-lg font-semibold"
                >
                  Submit Another Claim
                  <ArrowRight className="h-5 w-5 ml-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
