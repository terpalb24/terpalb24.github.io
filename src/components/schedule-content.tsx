import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import type {CollectionEntry} from "astro:content";
import React, {useMemo} from "react";

interface Props {
    items: CollectionEntry<"schedule">[];
    subjects: CollectionEntry<"subject">[];
    lecturers: CollectionEntry<"lecturer">[];
}


const ScheduleContent: React.FC<Props> = ({items, subjects, lecturers}) => {
    const defaultValue = useMemo(() => {
        const currentDate = new Date();
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek - 1 > items.length - 1) {
            return items[0].id;
        }
        return items[dayOfWeek - 1].id
    }, []);

    return (<Tabs defaultValue={defaultValue} className="w-full">
        <TabsList className="mb-8 mx-auto flex items-center justify-start flex-wrap h-auto space-y-1">
            {items.map((item) => (
                <TabsTrigger key={item.id} value={item.id} className="px-4">{item.data.title}</TabsTrigger>
            ))}
        </TabsList>

        {items.map(({id, data}) => (
            <TabsContent key={id} value={id}>
                <Card className="shadow-none">
                    <CardHeader>
                        <CardTitle className="text-xl">Jadwal Hari {data.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Time</TableHead>
                                    <TableHead>Code</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Lecturer</TableHead>
                                    <TableHead>Room</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.items.map((item, index) => {
                                    const subject = subjects.find(it => it.id === item.subjectCode.id);
                                    let lecturer: CollectionEntry<"lecturer"> | undefined = undefined;
                                    if (item.type === "theory") {
                                        lecturer = lecturers.find(it => it.id === subject?.data.theory.id);
                                    } else {
                                        lecturer = lecturers.find(it => it.id === subject?.data.practice?.id);
                                    }
                                    return (
                                        <TableRow key={index}>
                                            <TableCell className="w-36">{item.startAt} - {item.endAt}</TableCell>
                                            <TableCell className="font-mono w-16">{subject?.data.code}</TableCell>
                                            <TableCell className="font-medium">{subject?.data.title}</TableCell>
                                            <TableCell>{lecturer?.data.name}</TableCell>
                                            <TableCell>{item.room}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
        ))}
    </Tabs>);
}
export default ScheduleContent;