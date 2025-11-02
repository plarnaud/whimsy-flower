import Link from "next/link";
import { ImageItem } from "@/components/horizontalList";

interface FooterLinks {
  label: string;
  href: string;
}

export default function FollowUsSection() {
  const followUsImages: FooterLinks[] = [
    { label: "Home", href: "/#" },
    { label: "Weddings", href: "/#" },
    { label: "Events", href: "/#" },
    { label: "About", href: "/#" },
    { label: "Contact", href: "/#" },
  ];

  return (
    <section id="footer">
      <div className="flex flex-col items-center justify-center uppercase w-full pt-16 pb-6">
        <Link href={"/"} className="flex w-full justify-center px-8">
          <img
            src="/logotype.svg"
            alt="Whimsy Flower wordmark"
            className="w-full max-w-[364px]"
          />
        </Link>

        <span className="text-(--dark-olive) text-[14px] pt-3">
          ©2025 Whimsy Flower, LLC
        </span>

        <ul className="flex flex-wrap justify-center w-full px-[212px] pt-16 italic text-[18px] tracking-[-0.04em]">
          {followUsImages.map((item, i) => (
            <li key={i} className="mx-8 mb-6">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <div className="w-full h-[7px] border-y-[1.5px] border-(--pale-yellow)"></div>
      </div>
    </section>
  );
}
