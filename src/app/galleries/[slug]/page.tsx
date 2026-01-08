import PageScaffold from "@/components/pageScaffold";
import { galleries, getGalleryBySlug } from "@/data/galleries";
import { notFound } from "next/navigation";

type GalleryPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return galleries.map(({ slug }) => ({ slug }));
}

export default function GalleryPage({ params }: GalleryPageProps) {
  const gallery = getGalleryBySlug(params.slug);

  if (!gallery) {
    return notFound();
  }

  return <PageScaffold />;
}
