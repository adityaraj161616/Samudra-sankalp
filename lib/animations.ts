"use client"

import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

// Register GSAP plugins (SplitText is a premium plugin, so we'll simulate it)
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

// Simulate SplitText functionality for demo purposes
class MockSplitText {
  chars: HTMLElement[]

  constructor(element: string | Element, options: { type: string }) {
    const el = typeof element === "string" ? document.querySelector(element) : element
    if (!el) {
      this.chars = []
      return
    }

    const text = el.textContent || ""
    el.innerHTML = ""

    this.chars = text.split("").map((char) => {
      const span = document.createElement("span")
      span.textContent = char === " " ? "\u00A0" : char
      span.style.display = "inline-block"
      el.appendChild(span)
      return span
    })
  }
}

export const animations = {
  // Enhanced fade in animation
  fadeIn: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out", ...options },
    )
  },

  // Slide in from left with bounce
  slideInLeft: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -60, rotationY: -15 },
      { opacity: 1, x: 0, rotationY: 0, duration: 0.8, ease: "back.out(1.7)", ...options },
    )
  },

  // Slide in from right with bounce
  slideInRight: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 60, rotationY: 15 },
      { opacity: 1, x: 0, rotationY: 0, duration: 0.8, ease: "back.out(1.7)", ...options },
    )
  },

  // Video mask reveal effect
  videoMaskReveal: (element: string | Element, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) : element
    if (!el) return null

    // Create mask effect
    gsap.set(el, {
      clipPath: "circle(0% at 50% 50%)",
      opacity: 1,
    })

    return gsap.to(el, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.5,
      ease: "power2.out",
      ...options,
    })
  },

  // Enhanced typewriter effect with cursor
  typewriter: (element: string | Element, text: string, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) : element
    if (!el) return null

    // Add cursor
    const cursor = document.createElement("span")
    cursor.className = "typewriter-cursor"
    cursor.textContent = "|"

    const tl = gsap.timeline()

    // Type text
    tl.to(el, {
      duration: text.length * 0.08,
      text: text,
      ease: "none",
      ...options,
      onComplete: () => {
        el.appendChild(cursor)
        // Blink cursor
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        })
      },
    })

    return tl
  },

  // Split text reveal with stagger
  splitTextReveal: (element: string | Element, options?: gsap.TweenVars) => {
    if (typeof window === "undefined") return null

    const split = new MockSplitText(element, { type: "chars" })

    return gsap.fromTo(
      split.chars,
      {
        opacity: 0,
        y: 100,
        rotationX: -90,
        transformOrigin: "50% 50% -50px",
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: "back.out(1.7)",
        ...options,
      },
    )
  },

  // Glitch effect for text
  glitchText: (element: string | Element, options?: gsap.TweenVars) => {
    const el = typeof element === "string" ? document.querySelector(element) : element
    if (!el) return null

    const originalText = el.textContent || ""
    el.setAttribute("data-text", originalText)
    el.classList.add("glitch")

    const tl = gsap.timeline({ repeat: 2, ...options })

    // Glitch sequence
    tl.to(el, { duration: 0.1, skewX: 70, ease: "power2.inOut" })
      .to(el, { duration: 0.04, skewX: 0, ease: "power2.inOut" })
      .to(el, { duration: 0.04, opacity: 0 })
      .to(el, { duration: 0.04, opacity: 1 })
      .to(el, { duration: 0.04, x: -20 })
      .to(el, { duration: 0.04, x: 0 })

    return tl
  },

  // Typewriter → Glitch → Settle sequence
  typewriterGlitchSettle: (element: string | Element, text: string, options?: gsap.TweenVars) => {
    const tl = gsap.timeline(options)

    // Phase 1: Typewriter
    tl.add(animations.typewriter(element, text, { duration: text.length * 0.05 }))

    // Phase 2: Glitch (after typewriter completes)
    tl.add(animations.glitchText(element, { delay: 0.5 }), "-=0.2")

    // Phase 3: Settle (smooth final state)
    tl.to(element, {
      scale: 1,
      rotation: 0,
      skewX: 0,
      opacity: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    })

    return tl
  },

  // Enhanced button hover with ripple effect
  buttonHover: (element: string | Element) => {
    const el = typeof element === "string" ? document.querySelector(element) : element
    if (!el) return

    el.addEventListener("mouseenter", (e) => {
      gsap.to(el, {
        scale: 1.05,
        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        duration: 0.3,
        ease: "power2.out",
      })

      // Create ripple effect
      const ripple = document.createElement("span")
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `

      const rect = el.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = (e as MouseEvent).clientX - rect.left - size / 2 + "px"
      ripple.style.top = (e as MouseEvent).clientY - rect.top - size / 2 + "px"

      el.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    })

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        scale: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        duration: 0.3,
        ease: "power2.out",
      })
    })
  },

  // Enhanced card hover with 3D tilt
  cardHover: (element: string | Element) => {
    const el = typeof element === "string" ? document.querySelector(element) : element
    if (!el) return

    el.addEventListener("mouseenter", () => {
      gsap.to(el, {
        y: -8,
        rotationX: 5,
        rotationY: 5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 1000,
      })
    })

    el.addEventListener("mouseleave", () => {
      gsap.to(el, {
        y: 0,
        rotationX: 0,
        rotationY: 0,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        duration: 0.4,
        ease: "power2.out",
      })
    })

    // Add mouse move tilt effect
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const mouseX = (e as MouseEvent).clientX
      const mouseY = (e as MouseEvent).clientY

      const rotateX = (mouseY - centerY) / 10
      const rotateY = (centerX - mouseX) / 10

      gsap.to(el, {
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.2,
        ease: "power2.out",
      })
    })
  },

  // Split layout reveal for dashboard transitions
  splitLayoutReveal: (leftElement: string | Element, rightElement: string | Element, options?: gsap.TweenVars) => {
    const tl = gsap.timeline(options)

    // Slide in from opposite sides
    tl.fromTo(
      leftElement,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.8, ease: "power2.out" },
    ).fromTo(
      rightElement,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6",
    )

    return tl
  },

  // Page transition animations
  pageTransition: {
    enter: (element: string | Element) => {
      return gsap.fromTo(
        element,
        { opacity: 0, x: 100, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "power2.out" },
      )
    },
    exit: (element: string | Element) => {
      return gsap.to(element, {
        opacity: 0,
        x: -100,
        scale: 0.95,
        duration: 0.4,
        ease: "power2.in",
      })
    },
  },

  // Floating animation for elements
  float: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.to(element, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      ...options,
    })
  },

  // Pulse animation
  pulse: (element: string | Element, options?: gsap.TweenVars) => {
    return gsap.to(element, {
      scale: 1.05,
      duration: 1,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      ...options,
    })
  },

  // Stagger animation for lists
  staggerIn: (elements: string | NodeList | Element[], options?: gsap.TweenVars) => {
    return gsap.fromTo(
      elements,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        ...options,
      },
    )
  },
}

// Add CSS for ripple animation
if (typeof window !== "undefined") {
  const style = document.createElement("style")
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `
  document.head.appendChild(style)
}

export default animations
