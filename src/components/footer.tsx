import Link from "next/link";
import WhimsyImage from "@/components/whimsyImage";
import { siteConfig } from "@/lib/siteConfig";

interface FooterLinks {
  label: string;
  href: string;
}

export default function FollowUsSection() {
  const followUsImages: FooterLinks[] = [
    { label: "Home", href: "/" },
    { label: "Weddings", href: "/weddings" },
    { label: "Events", href: "/events" },
    { label: "Editorial & Brands", href: "/brands" },
    { label: "About", href: "/about" },
    { label: "Inquire", href: "/inquire" },
  ];

  return (
    <section id="footer">
      <div className="flex flex-col items-center justify-center uppercase w-full pt-16 pb-6">
        <Link href={"/"} className="flex w-full justify-center px-8">
          <WhimsyImage
            src="/logotype.svg"
            alt="Whimsy Flower wordmark"
            width={364}
            height={90}
            className="w-full max-w-[364px] h-auto"
            sizes="(min-width: 768px) 364px, 70vw"
          />
        </Link>

        <span className="text-(--dark-olive) text-[14px] pt-3">
          ©{siteConfig.copyrightYear} {siteConfig.legalName}
        </span>
        <span className="text-(--dark-olive) text-[14px] pt-1 px-6 text-center">
          Hudson, New York
        </span>
        <span className="text-(--dark-olive) text-[14px] pt-1 px-6 text-center">
          Serving the Hudson Valley and beyond
        </span>

        <ul className="flex flex-wrap justify-center w-full px-8 sm:px-16 lg:px-[212px] pt-16 italic text-[18px] tracking-[-0.04em]">
          {followUsImages.map((item, i) => (
            <li key={i} className="mx-8 mb-6">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <div className="w-full h-2 border-y-[1.5px] border-(--pale-yellow)"></div>
      </div>
    </section>
  );
}
