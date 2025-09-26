"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Calendar, MapPin, Users, Target, DollarSign, TreePine, Leaf, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ProjectFormData {
  title: string
  description: string
  category: string
  location: string
  startDate: string
  endDate: string
  budget: string
  targetTrees: string
  participants: string
  objectives: string[]
  methodology: string
  expectedOutcomes: string
  sustainabilityPlan: string
}

const projectCategories = [
  { value: "forest-restoration", label: "Forest Restoration", icon: TreePine },
  { value: "urban-forestry", label: "Urban Forestry", icon: Leaf },
  { value: "nursery-development", label: "Nursery Development", icon: Sprout },
  { value: "agroforestry", label: "Agroforestry", icon: TreePine },
  { value: "watershed-restoration", label: "Watershed Restoration", icon: Leaf },
  { value: "community-forestry", label: "Community Forestry", icon: Users },
]

const commonObjectives = [
  "Carbon Sequestration",
  "Biodiversity Conservation",
  "Soil Erosion Prevention",
  "Water Conservation",
  "Community Livelihood",
  "Air Quality Improvement",
  "Wildlife Habitat Creation",
  "Climate Change Mitigation",
]

export default function NewProjectPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProjectFormData>({
    title: "",
    description: "",
    category: "",
    location: "",
    startDate: "",
    endDate: "",
    budget: "",
    targetTrees: "",
    participants: "",
    objectives: [],
    methodology: "",
    expectedOutcomes: "",
    sustainabilityPlan: "",
  })

  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleObjective = (objective: string) => {
    const updated = selectedObjectives.includes(objective)
      ? selectedObjectives.filter((obj) => obj !== objective)
      : [...selectedObjectives, objective]
    setSelectedObjectives(updated)
    setFormData((prev) => ({ ...prev, objectives: updated }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to projects page
    router.push("/ngo/projects")
  }

  const selectedCategory = projectCategories.find((cat) => cat.value === formData.category)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.push("/ngo/projects")} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
              <p className="text-gray-600">Start a new tree restoration initiative</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TreePine className="h-5 w-5 text-green-600" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Western Ghats Forest Restoration Initiative"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Project Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select project category" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectCategories.map((category) => {
                        const Icon = category.icon
                        return (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {category.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="location">Location *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="e.g., Karnataka, India"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your tree restoration project, its goals, and expected impact..."
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    required
                    rows={4}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Timeline & Targets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Timeline & Targets
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="targetTrees">Target Trees to Plant *</Label>
                  <div className="relative mt-1">
                    <TreePine className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="targetTrees"
                      type="number"
                      placeholder="e.g., 10000"
                      value={formData.targetTrees}
                      onChange={(e) => handleInputChange("targetTrees", e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="participants">Expected Participants</Label>
                  <div className="relative mt-1">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="participants"
                      type="number"
                      placeholder="e.g., 50"
                      value={formData.participants}
                      onChange={(e) => handleInputChange("participants", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="budget">Project Budget (₹) *</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="budget"
                      type="number"
                      placeholder="e.g., 1500000"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project Objectives */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Project Objectives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Select Primary Objectives *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                {commonObjectives.map((objective) => (
                  <div
                    key={objective}
                    onClick={() => toggleObjective(objective)}
                    className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                      selectedObjectives.includes(objective)
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                    }`}
                  >
                    <div className="text-sm font-medium text-center">{objective}</div>
                  </div>
                ))}
              </div>
              {selectedObjectives.length > 0 && (
                <div className="mt-4">
                  <Label>Selected Objectives:</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedObjectives.map((objective) => (
                      <Badge key={objective} variant="secondary" className="bg-green-100 text-green-800">
                        {objective}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Methodology & Planning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                Methodology & Planning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="methodology">Implementation Methodology *</Label>
                <Textarea
                  id="methodology"
                  placeholder="Describe your approach: site preparation, species selection, planting techniques, maintenance schedule..."
                  value={formData.methodology}
                  onChange={(e) => handleInputChange("methodology", e.target.value)}
                  required
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="expectedOutcomes">Expected Outcomes *</Label>
                <Textarea
                  id="expectedOutcomes"
                  placeholder="Describe the expected environmental, social, and economic outcomes..."
                  value={formData.expectedOutcomes}
                  onChange={(e) => handleInputChange("expectedOutcomes", e.target.value)}
                  required
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="sustainabilityPlan">Long-term Sustainability Plan *</Label>
                <Textarea
                  id="sustainabilityPlan"
                  placeholder="How will you ensure the long-term success and maintenance of this project?"
                  value={formData.sustainabilityPlan}
                  onChange={(e) => handleInputChange("sustainabilityPlan", e.target.value)}
                  required
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/ngo/projects")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
            >
              {isSubmitting ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
