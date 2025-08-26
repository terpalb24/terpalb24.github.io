import { allAlbums } from "content-collections";
import { CalendarHeartIcon, MapPinIcon } from "lucide-react";
import { Fragment } from "react";
import HeaderSection from "@/components/header-section";
import { getSingleAlbum } from "@/lib/collection";
import { renderDate } from "@/lib/date";
import { getTitle } from "@/lib/title";
import type { SlugParams } from "@/types/page";
import GalleryContents from "./_components/gallery-contents";

export default async function AlbumDetails({ params }: SlugParams) {
  const { slug } = await params;
  const album = getSingleAlbum(slug);

  return (
    <Fragment>
      <HeaderSection title={album.title}>
        <div className="mx-auto mt-4 text-lg max-w-xl">
          {/** biome-ignore lint/security/noDangerouslySetInnerHtml: save markdown content */}
          <div dangerouslySetInnerHTML={{ __html: album.html }} />
          <div className="flex items-center justify-center font-bold uppercase text-sm mt-4 gap-6 flex-wrap text-secondary">
            <span className="flex gap-1 items-center">
              <MapPinIcon />
              <span>{album.location}</span>
            </span>
            <span className="flex gap-1 items-center">
              <CalendarHeartIcon />
              <span>{renderDate(album.date)}</span>
            </span>
          </div>
        </div>
      </HeaderSection>
      <div className="container py-12">
        <GalleryContents images={album.contents} />
      </div>
    </Fragment>
  );
}
export async function generateMetadata({ params }: SlugParams) {
  const { slug } = await params;
  const album = getSingleAlbum(slug);
  return {
    title: getTitle(album.title),
    openGraph: {
      images: [
        {
          url: album.cover.src,
          width: album.cover.width,
          height: album.cover.height,
        },
      ],
    },
  };
}
export function generateStaticParams() {
  return allAlbums.map((album) => ({
    slug: album._meta.directory,
  }));
}
