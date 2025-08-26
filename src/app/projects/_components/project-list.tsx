"use client";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useMemo, useState } from "react";
import Button from "@/components/button";
import HeaderSection from "@/components/header-section";
import ProjectItem from "@/components/project-item";
import { getSemester } from "@/lib/utils";
import type { ProjectWithRelation } from "@/types/project";

interface Props {
  projects: ProjectWithRelation[];
  semesters: number[];
}
export default function ProjectList({ projects, semesters }: Props) {
  const [currentSemester, setCurrentSemester] = useState<number | null>(null);

  const filteredProjects = useMemo(() => {
    if (currentSemester) {
      return projects.filter(
        (project) => getSemester(project.code) === currentSemester,
      );
    }
    return projects;
  }, [currentSemester, projects]);

  return (
    <Fragment>
      <HeaderSection
        title="Our Projects"
        subtitle="Explore the innovative projects developed by TERPAL B 24 students"
      >
        <div className="mt-8 flex gap-4 items-center justify-center flex-wrap">
          <Button
            color={currentSemester === null ? "primary" : "white"}
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentSemester(null);
            }}
          >
            All Semesters
          </Button>
          {semesters.map((smt) => (
            <Button
              key={smt}
              color={currentSemester === smt ? "primary" : "white"}
              href={`#`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentSemester(smt);
              }}
            >
              Semester {smt}
            </Button>
          ))}
        </div>
      </HeaderSection>
      <main className="container py-12">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSemester}
            className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12"
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
            {filteredProjects.map((data) => (
              <ProjectItem key={data._meta.directory} project={data} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </Fragment>
  );
}
