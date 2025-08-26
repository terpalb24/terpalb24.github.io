import { Fragment } from "react";
import type { LecturerWithRelations } from "@/types/lecturer";
import ImageHoverable from "./image-hoverable";

interface Props {
  lecutrer: LecturerWithRelations;
}
export default function LecturerItem({ lecutrer }: Props) {
  return (
    <div>
      <ImageHoverable
        src={lecutrer.photo}
        alt={lecutrer.name}
        className="aspect-square"
        width={350}
      />
      <div className="mt-6">
        <div className="text-sm font-bold">NIK: {lecutrer.nik}</div>
        <h3
          title={lecutrer.name}
          className="text-primary truncate text-2xl leading-normal font-black"
        >
          {lecutrer.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {lecutrer.specialization}
        </p>
        {lecutrer.subjects && lecutrer.subjects.length > 0 ? (
          <div className="flex flex-wrap gap-4 mt-2">
            {lecutrer.subjects.map(({ isPractice, isTheory, subject }) => {
              return (
                <div key={subject.code} className="flex gap-4">
                  <span
                    className="font-bold text-secondary"
                    title={`${subject.title} (${
                      isTheory && isPractice
                        ? "Teori & Praktikum"
                        : isTheory
                          ? "Teori"
                          : "Praktikum"
                    })`}
                  >
                    {subject.code}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
}
