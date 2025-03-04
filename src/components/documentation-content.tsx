import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"

const DocumentationContent = () => {
    return (
        <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="photos">Photos</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="photos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Card key={item} className="overflow-hidden">
                            <div className="aspect-video relative">
                                <img
                                    src={`/placeholder.svg?height=200&width=300`}
                                    alt={`Class photo ${item}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg">Class Activity {item}</CardTitle>
                                <p className="text-sm text-muted-foreground">March 2024</p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="videos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2, 3, 4].map((item) => (
                        <Card key={item} className="overflow-hidden">
                            <div className="aspect-video relative bg-muted flex items-center justify-center">
                                <div className="text-muted-foreground">Video Placeholder {item}</div>
                            </div>
                            <CardHeader className="p-4">
                                <CardTitle className="text-lg">Class Video {item}</CardTitle>
                                <p className="text-sm text-muted-foreground">Project Presentation</p>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="events">
                <div className="space-y-6">
                    {[1, 2, 3].map((item) => (
                        <Card key={item}>
                            <CardHeader>
                                <CardTitle>Class Event {item}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">
                                    Description of the event, including date, location, and participants. This section
                                    can include
                                    details about special class activities, field trips, or guest lectures.
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
}
export default DocumentationContent;