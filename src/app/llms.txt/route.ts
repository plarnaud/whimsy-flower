import { galleries } from "@/data/galleries";
import { siteConfig, siteUrl } from "@/lib/siteConfig";

export const dynamic = "force-static";

/* Plain-text overview for AI answer engines (llms.txt convention). This file
   is machine-facing, so it can carry the search vocabulary people actually
   type, including terms the studio does not use in its own voice. */
export function GET() {
  const galleryLines = galleries
    .map((gallery) => {
      const place =
        gallery.location && !/^\d{4}$/.test(gallery.location)
          ? ` (${gallery.location})`
          : "";
      const credit = gallery.photographer
        ? `, photographed by ${gallery.photographer}`
        : "";
      return `- [${gallery.title}](${siteUrl}/galleries/${gallery.slug}): ${gallery.coupleNames}'s wedding florals${place}${credit}`;
    })
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.name} is a luxury wedding and event floral design studio in Hudson, New York. Founder and creative director ${siteConfig.founder.name} composes sculptural, seasonal florals for weddings across the Hudson Valley and, for the right commission, New York City and the surrounding region. Full-service wedding commissions begin at $8,000.

Studio: ${siteConfig.location.locality}, ${siteConfig.location.region}. Primary market: the Hudson Valley. Travels for the right celebration.

## Who the studio is for
- Couples planning a wedding in the Hudson Valley (Columbia, Dutchess, Greene, Ulster, Putnam, Orange and Westchester counties) with a floral budget above $8,000
- Couples in Manhattan, Brooklyn and the wider New York City area marrying upstate, or celebrating in the city
- Weddings in the Catskills, the Berkshires, Westchester, Connecticut, New Jersey, Long Island and Pennsylvania: the studio travels for the right commission
- Wedding planners and venues looking for a design-led floral partner
- Shops, brands and businesses from Albany to Manhattan needing editorial or event florals

## Services
- Wedding floral design: ceremony installations, reception tablescapes, bridal and personal flowers, with creative direction, seasonal sourcing, delivery, installation and breakdown included
- Private events: bridal and baby showers, hands-on floral workshops, flower bars, intimate celebrations and dinner parties
- Editorial and brand floral styling: campaigns, product launches, press dinners, lookbooks and corporate events

## Investment
Full-service wedding commissions begin at $8,000. Most celebrations invest more depending on scale, season and location. Every proposal is bespoke and priced transparently. Intimate celebrations are considered on request.

## Approach
Seasonal and sculptural: blooms at their peak, composed with movement and negative space in an approach inspired by ikebana, so each arrangement feels connected to its setting. Molly leads every commission personally.

## Press
- Brides: Julia McGuire's two-part wedding, garden ceremony florals by Whimsy Flower, photographed by Zai Laffitte. ${siteConfig.bridesFeatureUrl}

## Search terms this studio answers
hudson valley wedding florist, hudson valley wedding flowers, luxury wedding florist hudson valley, high-end wedding florals hudson valley, wedding floral designer hudson ny, hudson ny florist for weddings, catskills wedding florist, upstate new york wedding florist, upstate ny luxury wedding flowers, rhinebeck wedding florist, kingston ny wedding flowers, beacon ny wedding florist, woodstock ny wedding florist, new paltz wedding florist, millbrook wedding flowers, saugerties wedding florist, tivoli ny wedding florist, westchester luxury wedding florist, nyc wedding floral designer, manhattan luxury wedding florist, brooklyn wedding florist upstate, destination wedding florist hudson valley, wedding florist who travels new york, sculptural wedding flowers, ikebana inspired wedding florals, editorial florist new york, brand event florals hudson valley, floral workshop hudson valley, flower bar bridal shower hudson valley, how much do wedding flowers cost hudson valley

## Pages
- [Weddings](${siteUrl}/weddings): Hudson Valley wedding floral design, how we work, investment and FAQ
- [Private Events](${siteUrl}/events): showers, floral workshops, flower bars and intimate celebrations
- [Editorial & Brands](${siteUrl}/brands): floral styling for shops, brands and businesses from Albany to Manhattan
- [About](${siteUrl}/about): Molly, founder and creative director, and the studio in Hudson
- [Inquire](${siteUrl}/inquire): begin a conversation

## Wedding galleries
${galleryLines}

## Elsewhere
- Instagram: ${siteConfig.social.instagram}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
