import WhimsyImage from "@/components/whimsyImage";
import HorizontalList, { ImageItem } from "@/components/horizontalList";
import { OpenContactFormButton } from "@/components/pillButton";
import ServicesButton from "@/components/servicesButton";
import GalleryButton, { FeaturedGallery } from "@/components/galleryButton";
import MeetWhimsy from "@/components/meetWhimsy";
import { featuredGalleries as featuredGalleryData } from "@/data/galleries";
import PageScaffold from "@/components/pageScaffold";
import TestimonialsSection from "@/components/testimonialsSection";
import Link from "next/link";

export default function Home() {
  const homeLanderImages: ImageItem[] = [
    {
      src: "/home-carousel/natalia-david.webp",
      alt: "Brand 06",
      creds: "Photo by Natalia David",
    },
    {
      src: "/home-carousel/lindsey-finn.webp",
      alt: "Brand 05",
      creds: "Photo by Lindsey Finn",
    },
    {
      src: "/home-carousel/gleb-freeman-photography.webp",
      alt: "Brand 03",
      creds: "Photo by Gleb Freeman Photography",
    },
    {
      src: "/home-carousel/julia-mcguire.webp",
      alt: "Brand 04",
      creds: "Photo by Julia McGuire",
    },
    {
      src: "/home-carousel/talea-erich.webp",
      alt: "Brand 07",
      creds: "Photo by Talea Erich",
    },
    {
      src: "/home-carousel/chelsea-jessica.webp",
      alt: "Brand 01",
      creds: "Photo by Chelsea Jessica",
    },
    {
      src: "/home-carousel/cjstudios.webp",
      alt: "Brand 02",
      creds: "Photo by CJ Studios",
    },
  ];

  const featuredGalleries: FeaturedGallery[] = featuredGalleryData.map(
    (gallery) => ({
      imgSrc: gallery.coverImage,
      imgAlt: gallery.coverAlt,
      coupleName: gallery.coupleNames,
      galleryName: gallery.title,
      location: gallery.location,
      href: `/galleries/${gallery.slug}`,
    }),
  );

  return (
    <PageScaffold followUsModifiers="bg-(--clover)/25">
      <HeroSection images={homeLanderImages} />

      <MeetWhimsy />

      <ServicesSection />

      <section id="testimonials" className="relative bg-(--blush)/25">
        <div className="absolute z-[-1] top-0 left-0 w-full h-[25%] bg-(--blush)/25"></div>
        <div className=" w-full py-16 px-6 md:px-12 lg:px-16 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center pb-6">
            <span className="uppercase text-background font-bold text-[18px] tracking-[-0.04em]">
              Featured On
            </span>
            <ul className="py-4 flex gap-8 ">
              <li className="w-[124px]">
                <Link href="#">
                  <WhimsyImage
                    src="/brides.webp"
                    alt="Brides logo"
                    width={124}
                    height={40}
                    className="w-full h-auto"
                    sizes="124px"
                  />
                </Link>
              </li>
            </ul>
          </div>
          <TestimonialsSection
            title="Molly made our wildest dreams into reality"
            text="Even though I think I’m good friends with Arnaud and love Arnaud and Molly very much, Molly flat out refused to be the florist for our wedding for no other reason besides having a strong disdain for my fashion choices. We begged, we cried, but Molly simply would not hear any of it. She told us ‘a mustard colored hat with a red shirt and brown shoes? Unthinkable. I simply will not stoop to your level.’ So now here we are, wishing Molly had been the florist for our wedding but we had to settle."
            coupleName="Maria & Braedon"
          />
        </div>
      </section>

      <FeaturedGalleries galleries={featuredGalleries} />
    </PageScaffold>
  );
}

type HeroSectionProps = { images: ImageItem[] };
/* Home Lander Section */
function HeroSection({ images }: HeroSectionProps) {
  return (
    <section id="home-lander">
      <HorizontalList
        className="px-2 mt-2 mb-4 lg:h-[640px] h-[480px] gap-2"
        items={images}
      ></HorizontalList>
      <div className="relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 -z-100 w-full h-full opacity-[.165]">
          <WhimsyImage
            src="/home-lander-section-bg.webp"
            alt="Home Lander Background"
            fill
            sizes=""
            className="absolute left-0 right-0 -z-100 object-cover object-center"
          />
        </div>

        <div className="w-full h-full py-16 sm:py-24 px-6 flex flex-col justify-center items-center text-center ">
          <h1 className="text-[18px] tracking-[-0.04em] uppercase">
            Bespoke wedding and event floral designer
          </h1>
          <h2 className="py-6 font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--olive) ">
            Timeless Floral Design
          </h2>
          <span className="max-w-[644px] py-6 text-[14px] leading-6">
            Welcome to Whimsy Flower, where years of floral expertise and a
            foundation in the visual arts come together to create a truly
            distinctive experience. Our journey is all about infusing flowers
            with feelings of love, sympathy, and pure fun.
          </span>
          <h3 className="uppercase">Artful, design-driven florals</h3>
          <OpenContactFormButton />
        </div>
      </div>
    </section>
  );
}

/* Services Section */
function ServicesSection() {
  return (
    <section id="services" className="px-6 md:px-12 lg:px-16 pb-16">
      <div className="text-(--dark-green)">
        <h2 className="font-title text-5xl text-(--dark-olive) leading-16 text-center sm:text-left">
          Our Services
        </h2>
        <div className="flex flex-col sm:grid sm:grid-cols-3 items-stretch justify-stretch w-full pt-6 gap-6">
          <ServicesButton
            label={"Weddings"}
            imgSrc={"/services/weddings.webp"}
            imgAlt={"Weddings service"}
            href={"/weddings"}
            className=""
          ></ServicesButton>
          <ServicesButton
            label={"Events"}
            imgSrc={"/services/events.webp"}
            imgAlt={"Events service"}
            href={"/events"}
            className=""
          ></ServicesButton>
          <ServicesButton
            label={"Workshops"}
            imgSrc={"/services/workshops.webp"}
            imgAlt={"Workshops service"}
            href={"/workshops"}
            className=""
          ></ServicesButton>
        </div>
      </div>
    </section>
  );
}

type FeaturesGalleriesProps = { galleries: FeaturedGallery[] };
/* Featured Galleries Section */
function FeaturedGalleries({ galleries }: FeaturesGalleriesProps) {
  return (
    <section id="featured-galleries">
      <div className="flex flex-col justify-stretch items-stretch text-center py-16 px-6 md:px-12 lg:px-16">
        <h2 className="text-[18px] tracking-[-0.04em] uppercase">
          See our recent work
        </h2>
        <h3 className="py-6 font-title text-(--dark-olive) text-[clamp(48px,6vw,64px)] leading-[clamp(56px,7vw,72px)] tracking-[-0.04em] text-center">
          Featured Galleries
        </h3>
        <ul className="flex flex-col sm:grid sm:grid-cols-3 pt-6 gap-12 sm:gap-6">
          {galleries.map((item, i) => (
            <li key={i}>
              <GalleryButton gallery={item} className=""></GalleryButton>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
