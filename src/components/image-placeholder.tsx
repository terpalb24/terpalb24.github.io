import ExportedImage, {
  type ExportedImageProps,
} from "next-image-export-optimizer";
import Placeholder from "@/assets/placeholder.jpg";

export interface ImagePlaceholderProps extends Omit<ExportedImageProps, "src"> {
  src?: ExportedImageProps["src"];
}
export default function ImagePlaceholder({
  src,
  ...rest
}: ImagePlaceholderProps) {
  return (
    <ExportedImage src={src || Placeholder} placeholder="blur" {...rest} />
  );
}
