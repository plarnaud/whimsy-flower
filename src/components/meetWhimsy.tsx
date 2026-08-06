import Image from "next/image";

type MeetWhimsyProps = {
  className?: string;
  contentClassName?: string;
};

export default function MeetWhimsy({
  className = "",
  contentClassName = "px-6 sm:px-12",
}: MeetWhimsyProps) {
  return (
    <section id="meet-whimsy" className={`${className}`}>
      <div
        className={`py-16 sm:py-12 lg:sm-16 flex flex-col md:flex-row gap-6 justify-center items-center ${contentClassName}`}
      >
        <div className="relative aspect-square md:aspect-auto md:h-[686px] w-full sm:w-[477px] flex justify-center items-center">
          <Image
            src="/whimsy-about-pic.webp"
            alt="Molly, founder and creative director of Whimsy Flower"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="w-full sm:w-[477px] justify-center text-center md:text-left">
          <h2 className="text-[18px] tracking-[-0.04em] uppercase">
            The vision behind the studio
          </h2>
          <h3 className="py-6 font-title text-[clamp(48px,6vw,64px)] leading-[clamp(64px,7vw,72px)] text-(--pale-yellow) ">
            Meet the Creative Director
          </h3>
          <p className="max-w-[477px] pt-6 text-[14px] leading-6 ">
            I&apos;m Molly, founder and creative director of Whimsy Flower. I
            created the studio with the belief that the most memorable floral
            design begins by listening. Every commission starts with
            understanding the people, place, and purpose behind it, allowing
            each design to feel deeply connected to its setting rather than
            simply placed within it.
          </p>
          <p className="max-w-[477px] pt-6 text-[14px] leading-6">
            Working with a select number of clients each year allows me to be
            hands-on through every stage of the creative process, from the
            earliest concepts to the final installation. The result is a highly
            personal experience and floral work that reflects not only your
            vision, but the feeling you want to leave behind.
          </p>
        </div>
      </div>
    </section>
  );
}
