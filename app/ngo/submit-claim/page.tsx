"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Camera, ArrowLeft, Upload, MapPin, Hash, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { mockProjects } from "@/lib/mock-data"

const claimTypes = [
  "Saplings Planted",
  "Waste Collected",
  "Coral Transplantation",
  "Beach Cleanup",
  "Water Quality Testing",
  "Marine Life Survey",
]

export default function SubmitClaimPage() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState("")
  const [claimType, setClaimType] = useState("")
  const [quantity, setQuantity] = useState("")
  const [notes, setNotes] = useState("")
  const [photos, setPhotos] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files)
      setPhotos((prev) => [...prev, ...newPhotos])
    }
  }

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    router.push("/ngo/confirmation")
  }

  const getUnit = (type: string) => {
    switch (type) {
      case "Saplings Planted":
        return "saplings"
      case "Waste Collected":
        return "kg"
      case "Coral Transplantation":
        return "fragments"
      case "Beach Cleanup":
        return "sq meters"
      case "Water Quality Testing":
        return "samples"
      case "Marine Life Survey":
        return "species"
      default:
        return "units"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-slate-600 hover:bg-slate-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Submit New Claim</h1>
                <p className="text-slate-600 text-sm">Document your conservation impact</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-6">
        <Card className="bg-white shadow-lg border-0">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl text-slate-900">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              Claim Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Project Selection */}
              <div className="space-y-2">
                <Label htmlFor="project" className="text-sm font-medium text-slate-700">
                  Select Project *
                </Label>
                <Select value={selectedProject} onValueChange={setSelectedProject} required>
                  <SelectTrigger className="h-12 bg-white border-slate-300">
                    <SelectValue placeholder="Choose a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        <div className="flex items-center gap-3 py-1">
                          <div className="w-10 h-10 relative rounded-md overflow-hidden">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{project.name}</div>
                            <div className="text-xs text-slate-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {project.location}
                            </div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Claim Type */}
              <div className="space-y-2">
                <Label htmlFor="claimType" className="text-sm font-medium text-slate-700">
                  Claim Type *
                </Label>
                <Select value={claimType} onValueChange={setClaimType} required>
                  <SelectTrigger className="h-12 bg-white border-slate-300">
                    <SelectValue placeholder="Select claim type" />
                  </SelectTrigger>
                  <SelectContent>
                    {claimTypes.map((type) => (
                      <SelectItem key={type} value={type} className="py-2">
                        <div className="font-medium">{type}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium text-slate-700">
                  Quantity * {claimType && <span className="text-blue-600">({getUnit(claimType)})</span>}
                </Label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="pl-10 h-12 bg-white border-slate-300"
                    required
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-slate-700">Photo/Video Proof</Label>
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-12 border-dashed border-2 hover:bg-blue-50 bg-white border-blue-300 text-blue-600"
                    onClick={() => document.getElementById("photo-upload")?.click()}
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    <span className="font-medium">Add Photo/Video Proof</span>
                  </Button>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                  {/* Photo Preview */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                            <img
                              src={URL.createObjectURL(photo) || "/placeholder.svg"}
                              alt={`Proof ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                            onClick={() => removePhoto(index)}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium text-slate-700">
                  Additional Notes
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Provide additional details about your conservation activity..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="resize-none bg-white border-slate-300"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={isSubmitting || !selectedProject || !claimType || !quantity}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting for Verification...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Submit for Verification
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
