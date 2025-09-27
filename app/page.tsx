"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Users, Play, CheckCircle, Globe, Heart } from "lucide-react"
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

      // Ensure buttons are visible by default
      if (buttonsRef.current) {
        gsap.set(buttonsRef.current.children, { opacity: 1, visibility: "visible" })
      }

      // Logo entrance
      if (logoRef.current) {
        tl.from(logoRef.current, {
          duration: 1.2,
          y: -50,
          opacity: 0,
          ease: "power3.out",
        })
      }

      // Title animation
      if (titleRef.current?.children) {
        tl.from(
          titleRef.current.children,
          {
            duration: 0.8,
            y: 100,
            opacity: 0,
            stagger: 0.1,
            ease: "power4.out",
          },
          0.3,
        )
      }

      // Subtitle reveal
      if (subtitleRef.current) {
        tl.from(
          subtitleRef.current,
          {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power3.out",
          },
          0.8,
        )
      }

      // Buttons entrance with fallback
      if (buttonsRef.current?.children) {
        tl.from(
          buttonsRef.current.children,
          {
            duration: 0.6,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "back.out(1.7)",
            onComplete: () => {
              // Ensure buttons are fully visible after animation
              gsap.set(buttonsRef.current?.children || [], { opacity: 1, visibility: "visible" })
            },
          },
          1.2,
        )
      }

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
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-16 md:pb-20"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-background.jpg"
            alt="Lush green forest canopy with sunlight filtering through trees"
            fill
            className="object-cover hero-bg scale-105"
            priority
          />
          {/* Professional gradient overlay for optimal text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent" />
        </div>

        {/* Floating background elements for depth */}
        <div className="absolute inset-0 z-1">
          <div className="floating-element absolute top-20 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
          <div className="floating-element absolute top-40 right-20 w-24 h-24 bg-green-500/20 rounded-full blur-2xl" />
          <div className="floating-element absolute bottom-32 left-1/4 w-40 h-40 bg-lime-500/20 rounded-full blur-2xl" />
        </div>

        <div ref={logoRef} className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
          <div className="flex items-center gap-3">
            <Image
              src="/Logo2.png"
              alt="Samudra Sankalp Logo"
              width={100}
              height={32}
              className="h-6 w-auto md:h-8 md:w-auto object-contain"
              priority
            />
          </div>
        </div>

        <div className="relative z-10 text-center text-white px-4 md:px-6 max-w-7xl mx-auto flex-1 flex flex-col justify-center">
          <h1 ref={titleRef} className="hero-title mb-6 md:mb-8">
            <span className="block text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-none mb-2 md:mb-4">
              Forest
            </span>
            <span className="block text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black leading-none mb-2 md:mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-lime-300">
              Restoration
            </span>
            <span className="block text-lg md:text-xl lg:text-3xl xl:text-4xl font-light mt-4 md:mt-6 text-white/90 tracking-wide">
              Reforestation Revolution
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="hero-subtitle mb-8 md:mb-12 max-w-4xl mx-auto text-base md:text-lg lg:text-xl leading-relaxed px-2"
          >
            Connecting NGOs and verifiers to create transparent, impactful tree restoration through verified
            reforestation claims and community-driven environmental accountability.
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center relative z-50 px-4 mb-12 md:mb-16"
            style={{ opacity: 1, visibility: "visible" }}
          >
            <Button
              size="lg"
              className="hero-cta-primary group relative z-50 w-full sm:w-auto min-w-[200px] opacity-100 visible h-12 md:h-14 text-base md:text-lg"
              onClick={() => router.push("/signup")}
              style={{ opacity: 1, visibility: "visible" }}
            >
              <span className="mr-3 font-semibold">Start Your Journey</span>
              <ArrowRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hero-cta-secondary group bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white relative z-50 w-full sm:w-auto min-w-[180px] opacity-100 visible h-12 md:h-14 text-base md:text-lg"
              style={{ opacity: 1, visibility: "visible" }}
            >
              <Play className="h-4 w-4 md:h-5 md:w-5 mr-3 group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Watch Demo</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 md:gap-8 text-white/90 px-4 relative z-10">
            <div className="flex items-center gap-3 text-sm md:text-base font-medium bg-white/10 backdrop-blur-sm rounded-full px-3 md:px-4 py-2">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
              <span>500+ Verified Projects</span>
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base font-medium bg-white/10 backdrop-blur-sm rounded-full px-3 md:px-4 py-2">
              <Globe className="h-4 w-4 md:h-5 md:w-5 text-green-400" />
              <span>50+ NGO Partners</span>
            </div>
            <div className="flex items-center gap-3 text-sm md:text-base font-medium bg-white/10 backdrop-blur-sm rounded-full px-3 md:px-4 py-2">
              <Heart className="h-4 w-4 md:h-5 md:w-5 text-lime-400" />
              <span>1M+ Trees Planted</span>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 animate-bounce">
          <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-3">
            <TreePine className="h-6 w-6" />
            <span className="text-sm font-medium">Scroll to explore</span>
          </div>
        </div> */}
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
              Building trust through transparency in tree restoration efforts with cutting-edge verification technology
              for sustainable reforestation
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="premium-card p-12 rounded-3xl group hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold">For NGOs</h3>
              </div>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Submit and track your tree restoration projects with transparent verification processes, real-time
                reforestation impact measurement, and community engagement tools.
              </p>
              <Button size="lg" className="w-full h-14 text-lg" onClick={() => router.push("/signup")}>
                Join as NGO Partner
              </Button>
            </div>

            <div className="premium-card p-12 rounded-3xl group hover:scale-105 transition-all duration-500">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-semibold">For Verifiers</h3>
              </div>
              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                Verify reforestation claims, build your professional reputation, and contribute to authentic tree
                restoration impact tracking while earning rewards.
              </p>
              <Button
                variant="outline"
                size="lg"
                className="w-full h-14 text-lg bg-transparent hover:bg-slate-50"
                onClick={() => router.push("/signup")}
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
          <Image src="/forest-biodiversity.jpg" alt="Forest biodiversity" fill className="object-cover" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="text-5xl font-semibold text-center mb-20">Reforestation in Action</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: "/tree-planting-volunteers.jpg",
                title: "Tree Plantation",
                description: "Community-driven tree planting initiatives with verified saplings and growth monitoring",
                impact: "25,000 trees planted",
              },
              {
                image: "/forest-restoration-area.jpg",
                title: "Forest Restoration",
                description:
                  "Restoring degraded forest areas through native species reforestation and soil rehabilitation",
                impact: "500 hectares restored",
              },
              {
                image: "/nursery-saplings.jpg",
                title: "Nursery Development",
                description: "Establishing tree nurseries for sustainable sapling production and community engagement",
                impact: "50 nurseries established",
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
                  <h3 className="text-xl font-semibold mb-3 text-black">{project.title}</h3>
                  <p className="text-black/80 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-green-600 via-emerald-600 to-lime-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="max-w-5xl mx-auto text-center relative">
          <h2 className="text-5xl font-semibold mb-8 text-white">Ready to Make an Impact?</h2>
          <p className="text-xl text-white/90 mb-16 leading-relaxed max-w-3xl mx-auto">
            Join our community of tree restoration champions and verified impact creators. Together, we're building a
            greener future through transparent reforestation efforts.
          </p>
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-white/90 text-xl px-16 py-8 h-auto rounded-2xl font-semibold group relative z-10"
            onClick={() => router.push("/signup")}
          >
            <span className="mr-4">Start Your Journey</span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  )
}
