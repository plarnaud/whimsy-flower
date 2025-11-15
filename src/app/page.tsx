import Image from "next/image";
import HorizontalList, { ImageItem } from "@/components/horizontalList";
import PillButton from "@/components/pillButton";
import ServicesButton from "@/components/servicesButton";
import FollowUsSection from "@/components/followUs";
import Footer from "@/components/footer";
import Link from "next/link";
import GalleryButton, { FeaturedGallery } from "@/components/galleryButton";
import Navbar from "@/components/navbar";

export default function Home() {
  const homeLanderImages: ImageItem[] = [
    { src: "/brand01.jpg", alt: "Brand 01" },
    { src: "/brand02.jpg", alt: "Brand 02" },
    { src: "/brand03.jpg", alt: "Brand 03" },
    { src: "/brand03.jpg", alt: "Brand 03" },
  ];

  const featuredGalleries: FeaturedGallery[] = [
    {
      // Gallery 1
      imgSrc: "/brand01.jpg",
      imgAlt: "Gallery Image",
      coupleName: "Alice & Bob",
      galleryName: "Spring Wedding",
      location: "Napa Valley, CA",
      href: "/",
    },
    {
      // Gallery 2
      imgSrc: "/brand01.jpg",
      imgAlt: "Gallery Image",
      coupleName: "Alice & Bob",
      galleryName: "Spring Wedding",
      location: "Napa Valley, CA",
      href: "/",
    },
    {
      // Gallery 3
      imgSrc: "/brand01.jpg",
      imgAlt: "Gallery Image",
      coupleName: "Alice & Bob",
      galleryName: "Spring Wedding",
      location: "Napa Valley, CA",
      href: "/",
    },
  ];

  return (
    <div className="">
      <main className="">
        <Navbar />

        {/* Home Lander Section */}

        <section id="home-lander" className="mt-36">
          <HorizontalList
            className="px-2 my-4 h-2/3 min-h-[640px] gap-2"
            items={homeLanderImages}
          ></HorizontalList>
          <div className="relative w-full overflow-hidden">
            <div className="absolute top-0 left-0 -z-100 w-full h-full bg-[url('/home-lander-section-bg.png')] bg-cover bg-center opacity-[.165]"></div>

            <div className="w-full h-full py-16 sm:py-24 px-6 flex flex-col justify-center items-center text-center ">
              <h1 className="text-[18px] tracking-[-0.04em] uppercase">
                Bespoke wedding and event floral designer
              </h1>
              <h2 className="py-6 font-title sm:text-[64px] sm:leading-[72px] text-[48px] leading-16 text-(--faded-green) ">
                Timeless Floral Design
              </h2>
              <span className="max-w-[644px] py-6 text-[14px] leading-6">
                Welcome to Whimsy Flower, where years of floral expertise and a
                foundation in the visual arts come together to create a truly
                distinctive experience. Our journey is all about infusing
                flowers with feelings of love, sympathy, and pure fun.
              </span>
              <h3 className="uppercase">Artful, design-driven florals</h3>
              <PillButton label="Contact us!" className="mt-12"></PillButton>
            </div>
          </div>
        </section>

        {/* Meet Whimsy Section */}

        <section id="meet-whimsy">
          <div className="my-16 sm:my-12 lg:sm-16 flex flex-col md:flex-row gap-6 justify-center items-center px-6 sm:px-12">
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                non congue augue. Proin vestibulum, magna eget placerat
                scelerisque, ante neque dapibus nisl, at mattis lorem neque eget
                ipsum. Nulla ut libero tincidunt, mattis nibh et, fringilla
                nisi.
              </p>
              <p className="max-w-[477px] pt-6 text-[14px] leading-6">
                Proin ultrices purus at pretium dictum. Nam velit tellus,
                sodales ac dolor nec, rutrum ultricies nisi. Aenean commodo elit
                a vehicula egestas. Donec ac euismod purus, ut tempus neque.
                Mauris vel consectetur turpis, et consequat ligula. Fusce
                euismod congue dictum.
              </p>
              <PillButton
                label={"More about Whimsy Flower"}
                className="mt-12"
              ></PillButton>
            </div>
          </div>
        </section>

        {/* Services Section */}

        <section id="services" className="px-6 md:px-12 lg:px-16 pb-16">
          <div className="text-(--dark-green)">
            <h2 className="font-title text-5xl text-(--dark-olive) leading-16 text-center sm:text-left">
              Our Services
            </h2>
            <div className="flex flex-col sm:grid sm:grid-cols-3 items-stretch justify-stretch w-full pt-6 gap-6">
              <ServicesButton
                label={"Weddings"}
                imgSrc={"/brand01.jpg"}
                imgAlt={"make sure to put an alt"}
                href={"/home"}
                className=""
              ></ServicesButton>
              <ServicesButton
                label={"Events"}
                imgSrc={"/brand01.jpg"}
                imgAlt={"make sure to put an alt"}
                href={"/home"}
                className=""
              ></ServicesButton>
              <ServicesButton
                label={"Workshops"}
                imgSrc={"/brand01.jpg"}
                imgAlt={"make sure to put an alt"}
                href={"/home"}
                className=""
              ></ServicesButton>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}

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
                    <img src="/brides.png" alt="" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-background rounded-lg px-6 md:px-12 py-12 text-(--dark-blush)">
              <h2 className="uppercase w-full text-center mb-12">
                See what our couples are saying
              </h2>
              <div className="relative flex flex-col md:grid md:grid-cols-2 lg:grid-cols-[repeat(2,429px)] gap-6 items-center md:mb-12">
                <img
                  src="/brand01.jpg"
                  alt=""
                  className="object-cover aspect-[0.68] rounded-lg"
                />
                <div className="flex flex-col gap-6 items-center text-center text-[14px]">
                  <h3 className="text-(--blush) text-[32px] leading-auto tracking-[-0.04em]">
                    Molly made our wildest dreams into reality
                  </h3>
                  <p className="text-[14px] leading-6">
                    Even though I think I’m good friends with Arnaud and love
                    Arnaud and Molly very much, Molly flat out refused to be the
                    florist for our wedding for no other reason besides having a
                    strong disdain for my fashion choices. We begged, we cried,
                    but Molly simply would not hear any of it. She told us ‘a
                    mustard colored hat with a red shirt and brown shoes?
                    Unthinkable. I simply will not stoop to your level.’ So now
                    here we are, wishing Molly had been the florist for our
                    wedding but we had to settle.
                  </p>
                  <span className="text-(--blush) text-[14px]">
                    Maria & Braedon
                  </span>
                  <PillButton
                    label={"See more testimonials"}
                    color="maroon1"
                    className="mt-6 text-[16px]"
                  ></PillButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="featured-galleries">
          <div className="flex flex-col justify-center items-center py-16 px-6 md:px-12 lg:px-16">
            <h2 className="text-[18px] tracking-[-0.04em] uppercase">
              See our recent work
            </h2>
            <h3 className="py-6 font-title text-(--dark-olive) text-[64px] leading-[72px] tracking-[-0.04em] text-center">
              Featured Galleries
            </h3>
            <ul className="flex flex-col sm:grid sm:grid-cols-3 pt-6 gap-12 sm:gap-6">
              {featuredGalleries.map((item, i) => (
                <li key={i}>
                  <GalleryButton gallery={item} className=""></GalleryButton>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FollowUsSection />

        <Footer />
      </main>
    </div>
  );
} //0.6791666667
