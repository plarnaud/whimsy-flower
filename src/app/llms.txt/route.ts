import { galleries } from "@/data/galleries";
import { siteConfig, siteUrl } from "@/lib/siteConfig";

export const dynamic = "force-static";

/* Plain-text overview for AI crawlers (llms.txt convention). */
export function GET() {
  const galleryLines = galleries
    .map(
      (gallery) =>
        `- [${gallery.title}](${siteUrl}/galleries/${gallery.slug}): ${gallery.coupleNames}'s wedding florals${
          gallery.photographer ? `, photographed by ${gallery.photographer}` : ""
        }`,
    )
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description} Led by ${siteConfig.founder.name}, ${siteConfig.founder.jobTitle.toLowerCase()}.

Studio: ${siteConfig.location.locality}, ${siteConfig.location.region}. Service area: ${siteConfig.serviceArea.join(", ")}.
Full-service wedding commissions begin at $8,000.

## Pages
- [Weddings](${siteUrl}/weddings): Hudson Valley wedding floral design, how we work, investment, and questions
- [Private Events](${siteUrl}/events): showers, floral workshops, flower bars, and intimate celebrations
- [Editorial & Brands](${siteUrl}/brands): floral styling for shops, brands, and businesses from Albany to Manhattan
- [About](${siteUrl}/about): Molly, founder and creative director
- [Inquire](${siteUrl}/inquire): begin a conversation

## Wedding galleries
${galleryLines}

## Elsewhere
- Instagram: ${siteConfig.social.instagram}
- TikTok: ${siteConfig.social.tiktok}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
