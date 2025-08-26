"use client";
import type { StaticImageData } from "next/image";
import {
  type RenderImageContext,
  type RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Download from "yet-another-react-lightbox/plugins/download";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/thumbnails.css";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  ExpandIcon,
  PauseIcon,
  PlayIcon,
  ShrinkIcon,
  XIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import ExportedImage from "next-image-export-optimizer";
import { Fragment, useState } from "react";

interface Props {
  images: StaticImageData[];
}
export default function GalleryContents({ images }: Props) {
  const [index, setIndex] = useState(-1);
  return (
    <Fragment>
      <RowsPhotoAlbum
        photos={images}
        targetRowHeight={500}
        render={{ image: renderNextImage }}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Download]}
        thumbnails={{
          imageFit: "cover",
          padding: 0,
          border: 4,
          borderRadius: 12,
        }}
        render={{
          iconDownload: () => <DownloadIcon />,
          iconEnterFullscreen: () => <ExpandIcon />,
          iconExitFullscreen: () => <ShrinkIcon />,
          iconSlideshowPlay: () => <PlayIcon />,
          iconSlideshowPause: () => <PauseIcon />,
          iconClose: () => <XIcon />,
          iconZoomIn: () => <ZoomInIcon />,
          iconZoomOut: () => <ZoomOutIcon />,
          iconNext: () => <ChevronRightIcon className="size-8" />,
          iconPrev: () => <ChevronLeftIcon className="size-8" />,
        }}
      />
    </Fragment>
  );
}

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      className="w-full relative"
      style={{
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <ExportedImage
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder="blur"
      />
    </div>
  );
}
