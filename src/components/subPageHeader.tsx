import WhimsyImage from "./whimsyImage";

type SubPageHeaderProps = {
  title: string;
  imgSrc: string;
  imgAlt: string;
};

export default function SubPageHeader({
  title,
  imgSrc,
  imgAlt,
}: SubPageHeaderProps) {
  return (
    <section
      id="hero"
      className="w-full h-52 lg:h-82 relative flex items-center justify-center border-b-[1.5px] border-(--clover) mb-2"
    >
      <div className="absolute top-0 left-0 -z-90 w-full h-full opacity-33 overflow-hidden">
        <WhimsyImage
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="100vw"
          priority
          className="absolute left-0 right-0 -translate-y-2 -z-100  object-cover"
        />
      </div>
      <h1 className="font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--dark-olive) text-center">
        {title}
      </h1>
    </section>
  );
}
