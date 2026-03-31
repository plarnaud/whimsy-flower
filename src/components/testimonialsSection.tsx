import Link from "next/link";

import PillButton from "@/components/pillButton";
import WhimsyImage from "@/components/whimsyImage";

type TestimonialsSectionProps = {
  title: string;
  text: string;
  coupleName: string;
};

export default function TestimonialsSection({
  title,
  text,
  coupleName,
}: TestimonialsSectionProps) {
  return (
    <div className="bg-background rounded-lg px-6 md:px-12 py-12 text-(--dark-rose)">
      <h2 className="uppercase w-full text-center mb-12">
        See what our couples are saying
      </h2>
      <div className="relative flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[repeat(2,429px)] gap-6 items-center md:mb-12">
        <div className="relative w-full aspect-[0.68] rounded-lg overflow-hidden">
          <WhimsyImage
            src="/testimonials/testimonial-julia-mcguire.webp"
            alt="Testimonial couple"
            fill
            sizes="(min-width: 1024px) 429px, (min-width: 768px) 50vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 items-center text-center text-[14px]">
          <h3 className="text-(--blush) text-[32px] leading-auto tracking-[-0.04em]">
            {title}
          </h3>
          <p className="text-[14px] leading-6">{text}</p>
          <span className="text-(--blush) text-[14px]">{coupleName}</span>
          <PillButton
            label={"See more testimonials"}
            color="maroon1"
            className="mt-6 text-[16px]"
          ></PillButton>
        </div>
      </div>
    </div>
  );
}

export function SmallTestimonialSection({
  title,
  text,
  coupleName,
}: TestimonialsSectionProps) {
  return (
    <div className="bg-background rounded-lg px-6 md:px-12 py-12 text-(--dark-rose)">
      <div className="relative flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[repeat(2,429px)] gap-6 items-center">
        <div className="relative w-full aspect-[0.68] rounded-lg overflow-hidden">
          <WhimsyImage
            src="/testimonials/testimonial-julia-mcguire.webp"
            alt="Testimonial couple"
            fill
            sizes="(min-width: 1024px) 429px, (min-width: 768px) 50vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 items-center text-center text-[14px]">
          <h3 className="text-(--blush) text-[32px] leading-auto tracking-[-0.04em]">
            {title}
          </h3>
          <p className="text-[14px] leading-6">{text}</p>
          <span className="text-(--blush) text-[14px]">{coupleName}</span>
        </div>
      </div>
    </div>
  );
}
