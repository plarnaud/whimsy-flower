import WhimsyImage from "@/components/whimsyImage";
import { featuredGalleries, galleries } from "@/data/galleries";
import { getInstagramPosts } from "@/lib/instagram";
import { siteConfig } from "@/lib/siteConfig";
import { blurFor } from "@/lib/blur";

type FollowUsSectionProps = {
  className?: string;
};

/* Three-column grid of the six latest Instagram posts, each linking to the
   post itself. Until an access token is configured (docs/INSTAGRAM.md), the
   grid shows six wedding covers linking to the profile instead. */
export default async function FollowUsSection({
  className = "",
}: FollowUsSectionProps) {
  const posts = await getInstagramPosts(6);
  const live = posts !== null;

  // Featured covers already appear above this section on the home page, so
  // lead with the other weddings.
  const fallback = [
    ...galleries.filter((g) => !g.featured),
    ...featuredGalleries,
  ]
    .slice(0, 6)
    .map((gallery) => ({
      id: gallery.slug,
      href: siteConfig.social.instagram,
      src: gallery.coverImage,
      alt: gallery.coverAlt,
      blur: blurFor(gallery.coverImage),
    }));

  const tiles: Array<{ id: string; href: string; src: string; alt: string; blur?: string }> =
    posts ?? fallback;

  return (
    <section
      id="follow-us"
      className={`flex flex-col py-16 px-6 md:px-12 lg:px-16 gap-6 ${className}`}
    >
      <h2 className="font-title text-(--dark-olive) text-[48px] leading-16 tracking-[-0.04em]">
        Follow us
      </h2>
      <ul className="grid grid-cols-3 gap-3 sm:gap-6">
        {tiles.map((tile) => (
          <li key={tile.id}>
            <a
              href={tile.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                live
                  ? `Open this post on Instagram: ${tile.alt}`
                  : "Whimsy Flower on Instagram"
              }
              className="relative block aspect-square rounded-lg overflow-hidden"
            >
              <WhimsyImage
                src={tile.src}
                alt={tile.alt}
                blurDataURL={tile.blur}
                fill
                sizes="(min-width: 1024px) 30vw, 33vw"
                className="object-cover"
                unoptimized={live}
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
