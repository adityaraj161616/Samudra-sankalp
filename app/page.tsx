"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Waves, Shield, Users, Play, CheckCircle, Globe, Heart } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HomePage() {
  const router = useRouter()
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Logo entrance
      tl.from(logoRef.current, {
        duration: 1.2,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      })

        // Title typewriter effect with glitch
        .from(
          titleRef.current?.children || [],
          {
            duration: 0.8,
            y: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.3,
        )

        // Subtitle reveal
        .from(
          subtitleRef.current,
          {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out",
          },
          0.8,
        )

        // Buttons entrance
        .from(
          buttonsRef.current?.children || [],
          {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          1.2,
        )

      // Parallax scrolling effects
      gsap.to(".hero-bg", {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      // Floating elements animation
      gsap.to(".floating-element", {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax */}
        <div className="absolute inset-0 z-0">
          <Image src="/hero-ocean-waves.jpg" alt="Ocean waves" fill className="object-cover hero-bg" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
        </div>

        {/* Floating background elements */}
        <div className="absolute inset-0 z-1">
          <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />
          <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-green-500/10 rounded-full blur-xl" />
          <div className="floating-element absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl" />
        </div>

        {/* Logo with proper dimensions */}
        <div ref={logoRef} className="absolute top-8 left-8 z-20">
          <div className="w-48 h-15 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
            <span className="text-white font-semibold text-lg">Samudra Sankalp</span>
            <span className="text-xs text-white/60 ml-2">(Logo 6550x2070)</span>
          </div>
        </div>

        {/* Enhanced Hero Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-7xl mx-auto">
          <h1 ref={titleRef} className="hero-text mb-8">
            <span className="block">Ocean's</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400">
              Pledge
            </span>
            <span className="block text-2xl md:text-4xl font-normal mt-4 opacity-90">Conservation Revolution</span>
          </h1>

          <p ref={subtitleRef} className="subtitle-text mb-12 max-w-3xl mx-auto leading-relaxed">
            Connecting NGOs and verifiers to create transparent, impactful ocean conservation through verified
            environmental claims and community-driven accountability.
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="btn-premium text-lg px-12 py-6 h-auto group"
              onClick={() => router.push("/login")}
            >
              <span className="mr-3">Start Your Journey</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-12 py-6 h-auto border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm group"
            >
              <Play className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span>500+ Verified Projects</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-blue-400" />
              <span>50+ NGO Partners</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-red-400" />
              <span>1M+ Ocean Impact</span>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <Waves className="h-6 w-6" />
            <span className="text-xs">Scroll to explore</span>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-600">
              Our Impact Pillars
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Building trust through transparency in ocean conservation efforts with cutting-edge verification
              technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="premium-card p-12 rounded-3xl group hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold">For NGOs</h3>
              </div>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Submit and track your ocean conservation projects with transparent verification processes, real-time
                impact measurement, and community engagement tools.
              </p>
              <Button size="lg" className="w-full h-14 text-lg" onClick={() => router.push("/login")}>
                Join as NGO Partner
              </Button>
            </div>

            <div className="premium-card p-12 rounded-3xl group hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold">For Verifiers</h3>
              </div>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Verify conservation claims, build your professional reputation, and contribute to authentic
                environmental impact tracking while earning rewards.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg bg-transparent hover:bg-slate-50"
                onClick={() => router.push("/login")}
              >
                Become Verifier
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Impact Gallery */}
      <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/marine-biodiversity.jpg" alt="Marine life" fill className="object-cover" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="text-5xl font-semibold text-center mb-20">Conservation in Action</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/coral-restoration-hero.jpg",
                title: "Coral Restoration",
                description: "Rebuilding marine ecosystems through verified coral transplantation and monitoring",
                impact: "2,500 corals restored",
              },
              {
                image: "/mangrove-conservation.jpg",
                title: "Mangrove Protection",
                description: "Preserving coastal ecosystems and carbon sequestration through community programs",
                impact: "500 hectares protected",
              },
              {
                image: "/beach-cleanup-team.jpg",
                title: "Waste Removal",
                description: "Community-driven ocean plastic cleanup initiatives with verified impact tracking",
                impact: "10 tons plastic removed",
              },
            ].map((project, index) => (
              <div
                key={index}
                className="premium-card overflow-hidden rounded-3xl group hover:scale-105 transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium">
                      {project.impact}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-3 text-white">{project.title}</h3>
                  <p className="text-white/80 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-blue-600 via-cyan-600 to-green-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-5xl mx-auto text-center relative">
          <h2 className="text-5xl font-semibold mb-8 text-white">Ready to Make an Impact?</h2>
          <p className="text-xl text-white/90 mb-16 leading-relaxed max-w-3xl mx-auto">
            Join our community of ocean conservationists and verified impact creators. Together, we're building a
            transparent future for marine conservation.
          </p>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-white/90 text-xl px-16 py-8 h-auto rounded-2xl font-semibold group"
            onClick={() => router.push("/login")}
          >
            <span className="mr-4">Get Started Today</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  )
}
