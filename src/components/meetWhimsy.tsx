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
        className={`my-16 sm:my-12 lg:sm-16 flex flex-col md:flex-row gap-6 justify-center items-center ${contentClassName}`}
      >
        <div className="relative aspect-square md:aspect-auto md:h-[686px] w-full sm:w-[477px] flex justify-center items-center">
          <Image
            src="/brand01.jpg"
            alt="Left column"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="w-full sm:w-[477px] justify-center text-center md:text-left">
          <h2 className="text-[18px] tracking-[-0.04em] uppercase">
            Bespoke designs for weddings & events
          </h2>
          <h3 className="py-6 font-title text-[clamp(48px,6vw,64px)] leading-[clamp(64px,7vw,72px)] text-(--pale-yellow) ">
            Meet Whimsy
          </h3>
          <p className="max-w-[477px] pt-6 text-[14px] leading-6 ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non
            congue augue. Proin vestibulum, magna eget placerat scelerisque,
            ante neque dapibus nisl, at mattis lorem neque eget ipsum. Nulla ut
            libero tincidunt, mattis nibh et, fringilla nisi.
          </p>
          <p className="max-w-[477px] pt-6 text-[14px] leading-6">
            Proin ultrices purus at pretium dictum. Nam velit tellus, sodales ac
            dolor nec, rutrum ultricies nisi. Aenean commodo elit a vehicula
            egestas. Donec ac euismod purus, ut tempus neque. Mauris vel
            consectetur turpis, et consequat ligula. Fusce euismod congue
            dictum.
          </p>
        </div>
      </div>
    </section>
  );
}
