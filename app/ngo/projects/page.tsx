"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Search, Filter, Calendar, MapPin, Users, Target, ArrowLeft, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock project data
const mockProjects = [
  {
    id: 1,
    title: "Forest Restoration Initiative",
    description: "Large-scale forest restoration project in the Western Ghats focusing on native species recovery.",
    location: "Western Ghats, Karnataka",
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    participants: 25,
    budget: "₹15,00,000",
    progress: 65,
    category: "Forest Conservation",
  },
  {
    id: 2,
    title: "Urban Tree Plantation Drive",
    description: "Community-driven tree plantation to improve urban air quality and reduce heat islands.",
    location: "Delhi NCR",
    status: "Planning",
    startDate: "2024-03-01",
    endDate: "2024-08-30",
    participants: 40,
    budget: "₹8,50,000",
    progress: 20,
    category: "Urban Forestry",
  },
  {
    id: 3,
    title: "Community Nursery Development",
    description: "Systematic development of community nurseries for native species propagation.",
    location: "Rajasthan Villages",
    status: "Completed",
    startDate: "2023-10-01",
    endDate: "2024-01-31",
    participants: 60,
    budget: "₹5,75,000",
    progress: 100,
    category: "Nursery Development",
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [projects] = useState(mockProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-2 md:gap-4 w-full sm:w-auto">
              <Button
                variant="ghost"
                onClick={() => router.push("/ngo/dashboard")}
                className="flex items-center gap-2 text-sm md:text-base p-2 md:p-3"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Button>
              <div className="flex-1 sm:flex-none">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Projects</h1>
                <p className="text-gray-600 text-sm md:text-base">Manage your forest restoration projects</p>
              </div>
            </div>
            <Button
              onClick={() => router.push("/ngo/projects/new")}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto text-sm md:text-base"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-10 md:h-11"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48 h-10 md:h-11">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
                    {project.title}
                  </CardTitle>
                  <Badge className={`${getStatusColor(project.status)} text-xs font-medium flex-shrink-0`}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 md:space-y-4">
                <p className="text-gray-600 text-sm line-clamp-3">{project.description}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm">
                      {new Date(project.startDate).toLocaleDateString()} -{" "}
                      {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm">{project.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="text-xs md:text-sm">Budget: {project.budget}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent text-xs md:text-sm h-8 md:h-9"
                    onClick={() => router.push(`/ngo/projects/${project.id}`)}
                  >
                    <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent text-xs md:text-sm h-8 md:h-9"
                    onClick={() => router.push(`/ngo/projects/${project.id}/edit`)}
                  >
                    <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-8 md:py-12 px-4">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Target className="h-10 w-10 md:h-12 md:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by creating your first project"}
            </p>
            <Button
              onClick={() => router.push("/ngo/projects/new")}
              className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Project
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
