import GalleryButton from "@/components/galleryButton";
import PageScaffold from "@/components/pageScaffold";
import { galleries } from "@/data/galleries";
import MeetWhimsy from "@/components/meetWhimsy";

export default function WeddingsPage() {
  return (
    <PageScaffold
      title="Weddings"
      fullHeightHero={false}
      sectionClassName="flex flex-col pt-40 px-0"
    >
      <div className="pt-12">
        <h2 className="text-[18px] tracking-[-0.04em] uppercase text-center sm:text-left">
          Galleries
        </h2>
        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8">
          {galleries.map((gallery) => (
            <li key={gallery.slug}>
              <GalleryButton
                gallery={{
                  imgSrc: gallery.coverImage,
                  imgAlt: gallery.coverAlt,
                  coupleName: gallery.coupleNames,
                  galleryName: gallery.title,
                  location: gallery.location,
                  href: `/galleries/${gallery.slug}`,
                }}
                showCTA={false}
              />
            </li>
          ))}
        </ul>
      </div>
      <MeetWhimsy className="bg-(--pale-yellow)/25" contentClassName="px-0" />
    </PageScaffold>
  );
}
