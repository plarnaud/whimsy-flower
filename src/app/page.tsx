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
      alt: "Natalia and David's wedding florals",
      creds: "Photo by Thalia Photography",
    },
    {
      src: "/home-carousel/lindsey-finn.webp",
      alt: "Lindsey and Finn's wedding florals",
      creds: "Photo by Lindsey Finn",
    },
    {
      src: "/home-carousel/gleb-freeman-photography.webp",
      alt: "Wedding florals by Whimsy Flower",
      creds: "Photo by Gleb Freeman Photography",
    },
    {
      src: "/home-carousel/talea-erich.webp",
      alt: "Talea and Erich's wedding florals",
      creds: "Photo by Mackenzie Grace Creative",
    },
    {
      src: "/home-carousel/chelsea-jessica.webp",
      alt: "Chelsea and Jessica's wedding ceremony florals",
      creds: "Photo by Chelsea Jessica",
    },
    {
      src: "/home-carousel/cjstudios.webp",
      alt: "Wedding florals by Whimsy Flower",
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
            title="An absolute dream to work with from start to finish"
            text="Molly and the Whimsy team were an absolute dream to work with from start to finish! Molly completely understood my vision and executed it to perfection. Between the statement cascading ceremony install, thoughtful ikebana pieces, and focal point bar arrangement, the florals truly elevated all aspects of the day! I can’t recommend Whimsy enough to bring your dream florals to life!"
            coupleName="Lindsey & Finn"
            imgSrc="/Lindsey%20%26%20Fin%202025/Lindsey%2BFinnPreviews-39.webp"
            imgAlt="Lindsey and Finn's wedding florals"
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
            sizes="100vw"
            className="absolute left-0 right-0 -z-100 object-cover object-center"
          />
        </div>

        <div className="w-full h-full py-16 sm:py-24 px-6 flex flex-col justify-center items-center text-center ">
          <h1 className="text-[18px] tracking-[-0.04em] uppercase">
            Where flowers become the most memorable part of the room
          </h1>
          <h2 className="py-6 font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--olive) ">
            Timeless Floral Artistry
          </h2>
          <span className="max-w-[644px] py-6 text-[14px] leading-6">
            At Whimsy Flower, we approach every project as an opportunity to
            create something entirely original. From intimate weddings and
            private celebrations to editorial productions and brand
            experiences, our work is driven by thoughtful composition, seasonal
            beauty, and the belief that flowers can transform not only a space,
            but the way it is remembered.
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
            label={"Private Events"}
            imgSrc={"/services/events.webp"}
            imgAlt={"Private events service"}
            href={"/events"}
            className=""
          ></ServicesButton>
          <ServicesButton
            label={"Editorial & Brand Styling"}
            imgSrc={"/services/workshops.webp"}
            imgAlt={"Editorial and brand styling service"}
            href={"/brands"}
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
