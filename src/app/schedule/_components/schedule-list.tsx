"use client";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useMemo, useState } from "react";
import Button from "@/components/button";
import HeaderSection from "@/components/header-section";
import ScheduleItem from "@/components/schedule-item";
import { getCurrentDay } from "@/lib/utils";
import type { ScheduleWithRelation } from "@/types/schedule";

interface Props {
  schedules: ScheduleWithRelation[];
}
export default function ScheduleList({ schedules }: Props) {
  const [selectedDay, setSelectedDay] = useState<number>(
    getCurrentDay(
      schedules.map((item) => item.parsedDay),
      schedules[0].parsedDay,
    ),
  );

  const currentSchedule = useMemo(() => {
    const find = schedules.find((item) => item.parsedDay === selectedDay);
    if (!find) return schedules[0];
    return find;
  }, [schedules, selectedDay]);

  return (
    <Fragment>
      <HeaderSection
        title="Class Schedule"
        subtitle="Weekly timetable for TERPAL B 24"
      >
        <div className="mt-8 flex gap-4 items-center justify-center flex-wrap">
          {schedules.map((item) => (
            <Button
              key={item.parsedDay}
              color={item.parsedDay === selectedDay ? "primary" : "white"}
              href={`#`}
              onClick={(e) => {
                e.preventDefault();
                setSelectedDay(item.parsedDay);
              }}
            >
              {item.title}
            </Button>
          ))}
        </div>
      </HeaderSection>
      <main className="container py-4 overflow-x-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSchedule.parsedDay}
            className="flex flex-col gap-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                visualDuration: 0.5,
                bounce: 0.2,
              },
            }}
            exit={{ opacity: 0, x: -50 }}
          >
            {currentSchedule.items.map((item) => (
              <ScheduleItem key={item.subjectCode + item.type} item={item} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </Fragment>
  );
}
