"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary"
}

const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  ({ className, size = "md", variant = "primary", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-12 w-12",
      md: "h-14 w-14",
      lg: "h-16 w-16",
    }

    const variantClasses = {
      primary: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl",
      secondary: "bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-lg hover:shadow-xl",
    }

    return (
      <Button
        ref={ref}
        className={cn(
          "fixed bottom-6 right-6 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 z-50",
          sizeClasses[size],
          variantClasses[variant],
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    )
  },
)
FAB.displayName = "FAB"

export { FAB }
