import type React from "react";
import ImagePlaceholder, {
  type ImagePlaceholderProps,
} from "./image-placeholder";

interface Props extends ImagePlaceholderProps {
  hideOverlay?: boolean;
  children?: React.ReactNode;
}

export default function ImageHoverable({
  className,
  hideOverlay,
  children,
  ...rest
}: Props) {
  return (
    <div className="group">
      <figure
        className={`relative rounded-4xl overflow-hidden transition-all group-hover:scale-95 duration-300 group-hover:duration-500 ${className}`}
      >
        <ImagePlaceholder className="object-cover w-full h-full" {...rest} />
        {!hideOverlay && (
          <span className="bg-bg/40 group-hover:opacity-0 transition-all duration-300 absolute inset-0 pointer-events-none" />
        )}
        {children}
      </figure>
    </div>
  );
}
