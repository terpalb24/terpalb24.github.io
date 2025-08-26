"use client";
import type { Album } from "content-collections";
import { AnimatePresence, motion } from "motion/react";
import { Fragment, useMemo, useState } from "react";
import AlbumItem from "@/components/album-item";
import Button from "@/components/button";
import HeaderSection from "@/components/header-section";

interface Props {
  albums: Album[];
  years: number[];
}
export default function AlbumList({ albums, years }: Props) {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const filteredAlbums = useMemo(() => {
    if (currentYear) {
      return albums.filter((album) => album.date.getFullYear() === currentYear);
    }
    return albums;
  }, [currentYear, albums]);

  return (
    <Fragment>
      <HeaderSection
        title="Class Albums"
        subtitle="Photos of memories from our class activities"
      >
        <div className="mt-8 flex gap-4 items-center justify-center flex-wrap">
          <Button
            color={currentYear === null ? "primary" : "white"}
            href={`#`}
            onClick={(e) => {
              e.preventDefault();
              setCurrentYear(null);
            }}
          >
            All Years
          </Button>
          {years.map((year) => (
            <Button
              key={year}
              color={currentYear === year ? "primary" : "white"}
              href={`#`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentYear(year);
              }}
            >
              {year}
            </Button>
          ))}
        </div>
      </HeaderSection>
      <main className="container py-12">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentYear}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
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
            {filteredAlbums.map((data) => (
              <AlbumItem key={data._meta.directory} album={data} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </Fragment>
  );
}
