import { Card, CardHeader, CardTitle } from "@/components/ui/card"

// Sample data - replace with actual class members
const members = [
  {
    id: 1,
    name: "Muhammad Maulana Yusuf",
    role: "Class Leader",
    image: "/yusup2.png?height=100&width=100",
  },
  {
    id: 2,
    name: "Student Name 2",
    role: "Secretary",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Student Name 3",
    role: "Treasurer",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Student Name 4",
    role: "Student",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Student Name 5",
    role: "Student",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Student Name 6",
    role: "Student",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 7,
    name: "Student Name 7",
    role: "Student",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 8,
    name: "Student Name 8",
    role: "Student",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function MembersPage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Class Members</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Meet the talented students of TERPAL B 24
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="aspect-square relative">
              <img src={member.image || "/placeholder.svg"} alt={member.name} className="object-cover w-full h-full" />
            </div>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{member.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}

