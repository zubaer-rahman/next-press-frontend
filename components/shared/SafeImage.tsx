"use client";

import { useState, useEffect, type SyntheticEvent } from "react";
import Image, { type ImageProps } from "next/image";

type SafeImageProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
  fallbackSrc?: string;
};

export default function SafeImage({
  src,
  alt,
  fallbackSrc = "/images/news_placeholder.png",
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }

    props.onError?.(event);
  };

  return (
    <Image
      {...props}
      unoptimized
      src={imgSrc}
      alt={alt}
      onError={handleError}
    />
  );
}
