import { allAlbums } from "content-collections";
import type { Metadata } from "next";
import { getTitle } from "@/lib/title";
import AlbumList from "./_components/album-list";

export const metadata: Metadata = {
  title: getTitle("Albums"),
  description: "Photos of memories from our class activities",
};
export default async function Albums() {
  const albums = allAlbums;
  albums.sort((a, b) => b.date.getTime() - a.date.getTime());

  const years = albums.map((album) => album.date.getFullYear());
  const uniqueYears = [...new Set(years)];

  return <AlbumList albums={albums} years={uniqueYears} />;
}
