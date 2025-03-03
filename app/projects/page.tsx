import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

// Sample data - replace with actual projects
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce application with user authentication, product catalog, and payment processing.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    team: ["Student 1", "Student 2", "Student 3"],
  },
  {
    id: 2,
    title: "Task Management System",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    technologies: ["Next.js", "Firebase", "Tailwind CSS"],
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    team: ["Student 4", "Student 5", "Student 6"],
  },
  {
    id: 3,
    title: "Mobile Learning App",
    description: "A cross-platform mobile application for interactive learning with quizzes and progress tracking.",
    technologies: ["React Native", "Express", "PostgreSQL"],
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    team: ["Student 7", "Student 8", "Student 9"],
  },
  {
    id: 4,
    title: "Smart Home Dashboard",
    description: "An IoT dashboard for monitoring and controlling smart home devices with data visualization.",
    technologies: ["Vue.js", "Python", "MQTT", "Chart.js"],
    image: "/placeholder.svg?height=200&width=400",
    link: "#",
    team: ["Student 10", "Student 11", "Student 12"],
  },
]

export default function ProjectsPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Team Projects</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Explore the innovative projects developed by TERPAL B 24 students
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden flex flex-col">
            <div className="aspect-video relative">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="object-cover w-full h-full"
              />
            </div>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{project.description}</p>
              <div className="mt-4">
                <p className="font-medium">Team Members:</p>
                <p className="text-sm text-muted-foreground">{project.team.join(", ")}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  View Project <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

