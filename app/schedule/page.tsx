import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data - replace with actual schedule
const schedule = {
  monday: [
    { time: "08:00 - 09:40", subject: "Software Engineering", lecturer: "Dr. Smith", room: "Lab 101" },
    { time: "10:00 - 11:40", subject: "Database Systems", lecturer: "Prof. Johnson", room: "Room 203" },
    { time: "13:00 - 14:40", subject: "Web Development", lecturer: "Ms. Williams", room: "Lab 102" },
  ],
  tuesday: [
    { time: "08:00 - 09:40", subject: "Algorithm Analysis", lecturer: "Dr. Brown", room: "Room 205" },
    { time: "10:00 - 11:40", subject: "Mobile Development", lecturer: "Mr. Davis", room: "Lab 103" },
  ],
  wednesday: [
    { time: "08:00 - 09:40", subject: "Software Testing", lecturer: "Dr. Miller", room: "Lab 101" },
    { time: "10:00 - 11:40", subject: "Project Management", lecturer: "Prof. Wilson", room: "Room 204" },
    { time: "13:00 - 14:40", subject: "Cloud Computing", lecturer: "Ms. Moore", room: "Lab 104" },
  ],
  thursday: [
    { time: "08:00 - 09:40", subject: "Artificial Intelligence", lecturer: "Dr. Taylor", room: "Room 206" },
    { time: "10:00 - 11:40", subject: "Data Structures", lecturer: "Prof. Anderson", room: "Lab 105" },
  ],
  friday: [
    { time: "08:00 - 09:40", subject: "Computer Networks", lecturer: "Dr. Thomas", room: "Room 207" },
    { time: "10:00 - 11:40", subject: "Cybersecurity", lecturer: "Mr. Jackson", room: "Lab 106" },
    { time: "13:00 - 14:40", subject: "Team Project", lecturer: "Prof. White", room: "Lab 107" },
  ],
}

export default function SchedulePage() {
  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Class Schedule</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">Weekly timetable for TERPAL B 24</p>
      </div>

      <Tabs defaultValue="monday" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="monday">Monday</TabsTrigger>
          <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
          <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
          <TabsTrigger value="thursday">Thursday</TabsTrigger>
          <TabsTrigger value="friday">Friday</TabsTrigger>
        </TabsList>

        {Object.entries(schedule).map(([day, classes]) => (
          <TabsContent key={day} value={day}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">{day.charAt(0).toUpperCase() + day.slice(1)} Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Lecturer</TableHead>
                      <TableHead>Room</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classes.map((classItem, index) => (
                      <TableRow key={index}>
                        <TableCell>{classItem.time}</TableCell>
                        <TableCell className="font-medium">{classItem.subject}</TableCell>
                        <TableCell>{classItem.lecturer}</TableCell>
                        <TableCell>{classItem.room}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

