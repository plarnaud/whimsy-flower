import { brandProjects } from "@/data/brandProjects";
import { galleries } from "@/data/galleries";
import { siteConfig, siteUrl } from "@/lib/siteConfig";

export const dynamic = "force-static";

/* Plain-text overview for AI answer engines (llms.txt convention). Every
   statement here is taken from the site's own pages and data, so answer
   engines quote what visitors read; keep it in step with the copy. */
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

  const brandLines = brandProjects
    .map((project) => {
      const credit = project.photographer
        ? `, photographed by ${project.photographer}`
        : "";
      return `- [${project.brandName}: ${project.title}](${siteUrl}/brands/${project.slug}): ${project.metaDescription.replace(/\.$/, "")}${credit}`;
    })
    .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.name} is a floral design studio in Hudson, New York, led by founder and creative director ${siteConfig.founder.name}. It designs wedding and event florals across the Hudson Valley, the Catskills, New York City, and beyond, and editorial and brand florals from Albany to Manhattan. Full-service wedding commissions begin at $8,000.

Studio: ${siteConfig.location.locality}, New York. Serving the Hudson Valley and beyond.

## Services
- Weddings: full-service wedding floral design. On the day, the team handles the complete installation: ceremony architecture, reception tablescape, and personal flowers. Full-service events typically include personals, ceremony decor, cocktail hour, reception, installations, and more.
- Private events: flower bars, custom engagements (proposals), bridal showers, rehearsal dinners, birthdays and intimate dinner parties.
- Editorial and brands: floral design for shops, brands, and businesses: sculptural installations, atmospheric set design, and editorial styling for product launches, press dinners, campaign shoots and corporate gatherings.

## How a wedding works
1. The initial consultation: a phone call or video meeting about the setting, the season and the atmosphere. Molly leads every wedding personally.
2. Creative direction: a "first draft" design proposal; after a deposit, an official design doc with custom design boards, a seasonal floral palette, mock ups and a detailed design plan.
3. Sourcing and planning: seasonal sourcing from local growers, venue walkthroughs and a production plan coordinated with the planner and venue.
4. Final design meeting: two months before the wedding date; the final payment is due after it.
5. Day of execution: complete installation by the team.
6. The reveal and breakdown: a discreet breakdown; locally grown blooms the couple does not keep are composted and hard-good rentals are picked up to eliminate single use items.

## Investment
Full-service wedding commissions begin at $8,000, with most celebrations investing more depending on scale, season, and location. Every proposal is built for the couple and priced transparently. Intimate celebrations are welcome.

## Good to know
- Where does Whimsy Flower design weddings? The studio is in Hudson, New York, and designs weddings throughout the Hudson Valley and beyond for the right celebration.
- When to reach out: as soon as you have a date and a venue. The studio takes on a limited number of weddings each season, and peak dates from May through October are reserved well in advance.
- Planners, venues and photographers: the studio coordinates directly with your planner and venue on timing and logistics, and with your photographer so the florals are in place before the first frame.
- Approach: seasonal, artful and unique. Blooms at their peak, composed with movement and negative space, so each arrangement feels connected to its setting rather than placed within it.

## Press
- Brides: Julia & Jackie's wedding, florals by Whimsy Flower, photographed by Zai Laffitte. ${siteConfig.bridesFeatureUrl}

## Pages
- [Weddings](${siteUrl}/weddings): Hudson Valley wedding floral design, the process, investment and FAQ
- [Private Events](${siteUrl}/events): flower bars, custom engagements, bridal showers, rehearsal dinners and more
- [Editorial & Brands](${siteUrl}/brands): floral design for brands, campaigns and corporate events
- [About](${siteUrl}/about): Molly, founder and creative director, and the studio in Hudson
- [Inquire](${siteUrl}/inquire): the inquiry form

## Wedding galleries
${galleryLines}

## Brand projects
${brandLines}

## Elsewhere
- Instagram: ${siteConfig.social.instagram}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
