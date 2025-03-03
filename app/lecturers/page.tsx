import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, BookOpen } from "lucide-react"

// Sample data - replace with actual lecturers
const lecturers = [
  {
    id: 1,
    name: "Dr. John Smith",
    position: "Head of Software Engineering",
    specialization: "Software Architecture, Cloud Computing",
    email: "john.smith@example.com",
    phone: "+62 812-3456-7890",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 2,
    name: "Prof. Sarah Johnson",
    position: "Professor of Database Systems",
    specialization: "Database Design, Data Mining",
    email: "sarah.johnson@example.com",
    phone: "+62 812-7654-3210",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 3,
    name: "Dr. Michael Brown",
    position: "Associate Professor",
    specialization: "Algorithms, Machine Learning",
    email: "michael.brown@example.com",
    phone: "+62 813-2345-6789",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 4,
    name: "Ms. Emily Williams",
    position: "Lecturer",
    specialization: "Web Development, UI/UX Design",
    email: "emily.williams@example.com",
    phone: "+62 813-9876-5432",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 5,
    name: "Mr. David Davis",
    position: "Lecturer",
    specialization: "Mobile Development, IoT",
    email: "david.davis@example.com",
    phone: "+62 814-1234-5678",
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: 6,
    name: "Prof. Jennifer Wilson",
    position: "Professor of Project Management",
    specialization: "Software Project Management, Agile Methodologies",
    email: "jennifer.wilson@example.com",
    phone: "+62 814-8765-4321",
    image: "/placeholder.svg?height=150&width=150",
  },
]

export default function LecturersPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Lecturers</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Meet the dedicated faculty members who guide TERPAL B 24
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lecturers.map((lecturer) => (
          <Card key={lecturer.id} className="overflow-hidden">
            <div className="flex justify-center pt-6">
              <div className="relative h-32 w-32 rounded-full overflow-hidden">
                <img
                  src={lecturer.image || "/placeholder.svg"}
                  alt={lecturer.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <CardHeader className="text-center">
              <CardTitle>{lecturer.name}</CardTitle>
              <p className="font-medium text-primary">{lecturer.position}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Specialization:</p>
                <p className="text-sm text-muted-foreground">{lecturer.specialization}</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{lecturer.email}</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{lecturer.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">Office Hours: Mon-Fri, 10:00-14:00</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

