import type { Album } from "content-collections";
import Link from "next/link";
import { renderDate } from "@/lib/date";
import ImageHoverable from "./image-hoverable";

interface Props {
  album: Album;
}
export default function AlbumItem({ album }: Props) {
  return (
    <Link className="group" href={`/albums/${album._meta.directory}`}>
      <ImageHoverable
        src={album.cover}
        alt={`Foto ${album.title}`}
        className="aspect-video"
        loading="lazy"
        width={720}
      />
      <div className="pt-6 space-y-4">
        <h3 className="text-4xl leading-normal font-black">{album.title}</h3>
        <div
          className={`flex items-center font-bold uppercase text-sm mt-2 gap-2 flex-wrap group-odd:text-primary group-even:text-secondary`}
        >
          <span>{album.location}</span>
          <span>•</span>
          <span>{renderDate(album.date)}</span>
        </div>
      </div>
    </Link>
  );
}
