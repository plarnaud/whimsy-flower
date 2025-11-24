import Image, { ImageProps } from "next/image";
import { defaultBlurDataURL } from "@/lib/blurDataUrl";

type BlurImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  blurDataURL?: string;
};

// Next.js Image with a default blurred placeholder for quicker perceived loading.
export default function BlurImage({
  blurDataURL,
  ...props
}: BlurImageProps) {
  const { alt, ...rest } = props;

  return (
    <Image
      placeholder="blur"
      blurDataURL={blurDataURL ?? defaultBlurDataURL}
      alt={alt}
      {...rest}
    />
  );
}
