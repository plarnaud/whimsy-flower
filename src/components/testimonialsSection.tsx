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
  imgSrc = "/testimonials/testimonial-julia-mcguire.webp",
  imgAlt = "Julia and Jackie kiss on a garden lawn among drifts of white delphinium set into the grass, her veil trailing behind",
}: TestimonialsSectionProps & { imgSrc?: string; imgAlt?: string }) {
  return (
    <div className="bg-background rounded-lg px-6 md:px-12 py-12 text-(--dark-rose)">
      <h2 className="uppercase w-full text-center mb-12">
        See what our clients are saying
      </h2>
      <div className="relative flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[repeat(2,429px)] gap-6 items-center md:mb-12">
        <div className="relative w-full aspect-[0.68] rounded-lg overflow-hidden">
          <WhimsyImage
            src={imgSrc}
            alt={imgAlt}
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
          {/* Each wedding gallery carries its couple's words */}
          <PillButton
            label={"See more testimonials"}
            color="maroon1"
            href="/weddings"
            className="mt-6 text-[16px]"
          ></PillButton>
        </div>
      </div>
    </div>
  );
}

/* Long testimonials step the type down one notch so the column stays close
   to the photo's height; the photo then stretches to fill whatever remains.
   12px is the floor. */
function testimonialTypeClasses(text: string) {
  if (text.length > 1700) return "text-[12px] leading-5";
  if (text.length > 1200) return "text-[13px] leading-[22px]";
  return "text-[14px] leading-6";
}

export function SmallTestimonialSection({
  title,
  text,
  coupleName,
  imgSrc = "/testimonials/testimonial-julia-mcguire.webp",
  imgAlt = "Julia and Jackie kiss on a garden lawn among drifts of white delphinium set into the grass, her veil trailing behind",
}: TestimonialsSectionProps & { imgSrc?: string; imgAlt?: string }) {
  return (
    <div className="bg-background rounded-lg px-6 md:px-12 py-12 text-(--dark-rose)">
      {/* Desktop: the photo stretches to the row height, so the card padding
          above and below it always matches the text column. The minimum keeps
          the portrait proportion when the testimonial is short. */}
      <div className="relative flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[repeat(2,429px)] gap-6 items-center md:items-stretch">
        <div className="relative w-full aspect-[0.68] md:aspect-auto md:min-h-[480px] lg:min-h-[631px] rounded-lg overflow-hidden">
          <WhimsyImage
            src={imgSrc}
            alt={imgAlt}
            fill
            sizes="(min-width: 1024px) 429px, (min-width: 768px) 50vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 items-center justify-center text-center">
          <h3 className="text-(--blush) text-[32px] leading-auto tracking-[-0.04em]">
            {title}
          </h3>
          <p className={`${testimonialTypeClasses(text)} whitespace-pre-line`}>
            {text}
          </p>
          <span className="text-(--blush) text-[14px]">{coupleName}</span>
        </div>
      </div>
    </div>
  );
}
