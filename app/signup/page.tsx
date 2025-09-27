"use client"

import type React from "react"
import Link from "next/link"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Mail, Lock, Eye, EyeOff, User, TreePine, ArrowRight, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "ngo" as "ngo" | "verifier",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      setIsLoading(false)
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Mock registration - redirect based on user type
    if (formData.userType === "ngo") {
      router.push("/ngo/dashboard")
    } else {
      router.push("/verifier/dashboard")
    }

    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      {/* Professional Header with Logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-3">
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

      <div className="w-full max-w-md">
        <Card className="border-0 shadow-xl bg-white">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <TreePine className="h-8 w-8 text-white" />
            </div>

            <h1 className="text-2xl font-semibold text-slate-800 mb-2">Start Your Journey</h1>
            <p className="text-slate-600">Join the tree restoration revolution</p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            {/* User Type Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium text-slate-700 mb-3 block">I want to join as:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange("userType", "ngo")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.userType === "ngo"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <TreePine className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                  <div className="text-sm font-medium text-slate-800">NGO</div>
                  <div className="text-xs text-slate-600">Plant & Track</div>
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("userType", "verifier")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.userType === "verifier"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Shield className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                  <div className="text-sm font-medium text-slate-800">Verifier</div>
                  <div className="text-xs text-slate-600">Verify & Earn</div>
                </button>
              </div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    className="pl-10 pr-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 mt-0.5"
                  required
                />
                <span className="text-slate-600 leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    Privacy Policy
                  </a>
                </span>
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Start Your Journey
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>

              <div className="text-center text-sm text-slate-600 mt-6">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/login")}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Sign in here
                </button>
              </div>
            </form>

            {/* Benefits Section */}
            <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <p className="text-sm font-medium text-emerald-800 mb-3">What you'll get:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-700">Transparent project tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-700">Verified impact measurement</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span className="text-emerald-700">Community collaboration tools</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-slate-600">
          <p>© 2025 Vanasthali Sankalp - Tree Restoration Platform</p>
          <p className="mt-1">Building a greener future together</p>
        </div>
      </div>
    </div>
  )
}
