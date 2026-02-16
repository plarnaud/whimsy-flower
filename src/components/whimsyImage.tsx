import Image, { ImageProps } from "next/image";
import { defaultBlurDataURL } from "@/lib/blurDataUrl";

type WhimsyImageProps = Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  blurDataURL?: string;
  creds?: string;
};

// Next.js Image with a default blurred placeholder and optional credit overlay.
export default function WhimsyImage({
  blurDataURL,
  creds,
  ...props
}: WhimsyImageProps) {
  const { alt, fill, ...rest } = props;
  const wrapperClassName = fill
    ? "relative block w-full h-full"
    : "relative inline-block";

  return (
    <span className={wrapperClassName}>
      <Image
        placeholder="blur"
        blurDataURL={blurDataURL ?? defaultBlurDataURL}
        alt={alt}
        fill={fill}
        {...rest}
      />
      {creds ? (
        <span className="pointer-events-none absolute right-2 bottom-2 text-xs font-semibold uppercase tracking-[0.08em] text-white drop-shadow">
          {creds}
        </span>
      ) : null}
    </span>
  );
}
