import type { Metadata } from "next";
import { Fragment } from "react";
import HeaderSection from "@/components/header-section";
import LecturerItem from "@/components/lecturer-item";
import { listLecturers } from "@/lib/collection";
import { getTitle } from "@/lib/title";

export const metadata: Metadata = {
  title: getTitle("Our Lecturers"),
  description: "Meet the dedicated faculty members who guide TERPAL B 24",
};
export default function Lecturers() {
  const lecturers = listLecturers();
  return (
    <Fragment>
      <HeaderSection
        title="Our Lecturers"
        subtitle="Meet the dedicated faculty members who guide TERPAL B 24"
      />
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {lecturers.map((data) => (
            <LecturerItem key={data._meta.path} lecutrer={data} />
          ))}
        </div>
      </div>
    </Fragment>
  );
}
