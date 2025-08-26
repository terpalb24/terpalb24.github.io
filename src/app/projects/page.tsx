import type { Metadata } from "next";
import { listProjects } from "@/lib/collection";
import { getTitle } from "@/lib/title";
import { getSemester } from "@/lib/utils";
import ProjectList from "./_components/project-list";

export const metadata: Metadata = {
  title: getTitle("Our Projects"),
  description:
    "Explore the innovative projects developed by TERPAL B 24 students",
};
export default function Projects() {
  const projects = listProjects();
  const semesters = projects.map((data) => {
    return getSemester(data.code);
  });
  const uniqueSemesters = [...new Set(semesters)];
  const sortedSemesters = uniqueSemesters.sort((a, b) => a - b);

  return <ProjectList projects={projects} semesters={sortedSemesters} />;
}
