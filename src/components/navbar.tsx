"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WhimsyImage from "./whimsyImage";
import PillButton from "./pillButton";
import { siteConfig } from "@/lib/siteConfig";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navH, setNavH] = useState(0);
  const [hasShadow, setHasShadow] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Weddings", href: "/weddings" },
    { label: "Events", href: "/events" },
    { label: "Editorial & Brands", href: "/brands" },
    { label: "About", href: "/about" },
    { label: "Inquire", href: "/inquire" },
  ];

  // Measure navbar height so the menu/backdrop start below it.
  // A ResizeObserver keeps the value fresh when the nav's height settles
  // after mount (logo/font loading, mobile browser chrome); a one-shot
  // measurement goes stale and the open menu overlaps the navbar.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const measure = () => setNavH(nav.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    try {
      // border-box so padding/border changes are caught too
      observer.observe(nav, { box: "border-box" });
    } catch {
      observer.observe(nav);
    }
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Handle body scroll when menu is open; re-measure on open so the menu
  // always aligns with the navbar's current height.
  useEffect(() => {
    if (isOpen && navRef.current) {
      setNavH(navRef.current.getBoundingClientRect().height);
    }
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 0);
    };

    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Backdrop (always under the fixed navbar) */}
      <div
        className={`fixed left-0 right-0 bottom-0 bg-black/30 z-110 transition-opacity duration-300
          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        style={{ top: navH }}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Shadow layer behind the navbar */}
      <div
        className={` fixed top-0 left-0 w-full h-[136px] pointer-events-non transition-shadow duration-300 z-115
                    ${
                      hasShadow
                        ? "shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                        : "shadow-none"
                    }
                `}
      />

      {/* Slide-out menu (always under the fixed navbar) */}
      <aside
        id="wf-nav-menu"
        className={`
          fixed left-0 bottom-0 z-120 bg-background
          w-full lg:w-[485px]
          transform
          ${
            isOpen
              ? "visible translate-y-0 lg:translate-y-0 lg:translate-x-0 [transition:transform_300ms_ease-out,visibility_0s]"
              : "invisible -translate-y-full lg:translate-y-0 lg:-translate-x-full [transition:transform_300ms_ease-out,visibility_0s_300ms]"
          }
        `}
        style={{ top: navH }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Menu content: vertical spacing scales with viewport height so
            short windows compress the gaps instead of flattening the list
            against the logo block; gap-6 keeps a floor between the two. */}
        <div className="bg-(--clover)/25 h-full flex flex-col justify-between gap-6 overflow-y-auto">
          <ul className="flex flex-col gap-[clamp(1.25rem,3.5dvh,3rem)] pl-6 md:pl-12 pt-[clamp(1.5rem,4dvh,4rem)] lg:pt-8 italic uppercase text-[18px] tracking-[-0.04em] items-start">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="pb-6 shrink-0">
            <div className="w-full pl-6 md:pl-12 pb-[clamp(1rem,2.5dvh,2rem)]">
              <Image
                src="/logotype-yellow.svg"
                alt="Whimsy Flower"
                width={220}
                height={64}
                className="h-[clamp(2.5rem,6dvh,4rem)] w-auto mb-[clamp(0.75rem,2dvh,1.5rem)]"
                sizes="220px"
                priority
              />
              <div className="flex gap-6 mb-4">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Whimsy Flower on Instagram"
                  className="relative inline-flex after:absolute after:-inset-3 after:content-['']"
                >
                  <WhimsyImage
                    src="/instagram-logo.svg"
                    alt="Instagram"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
              </div>
              <span className="italic uppercase text-[14px] tracking-[-0.04em]">
                ©{siteConfig.copyrightYear} Whimsy Flower, llc
              </span>
            </div>
            <div className="w-full h-2 border-y-[1.5px] border-(--olive)/50"></div>
          </div>
        </div>
      </aside>

      {/* Fixed top navbar (kept above everything) */}
      <nav
        ref={navRef}
        className="fixed top-0 py-2 w-full z-130 bg-background transition-shadow duration-300"
      >
        <div className="grid grid-cols-3 w-full border-y-[1.5px] border-(--clover) py-2 px-4 sm:px-8 lg:px-12 items-center">
          {/* Toggle button */}
          <button
            className={`order-3 md:order-1 justify-self-end md:justify-self-start flex flex-col justify-center gap-3 min-h-12 relative duration-300 transform transition-all
              ${isOpen ? "rotate-45" : ""} cursor-pointer`}
            onClick={() => setIsOpen((v) => !v)}
            aria-controls="wf-nav-menu"
            aria-expanded={isOpen}
            aria-label="Open menu"
          >
            <div
              className={`w-12 h-0.5 bg-(--dark-green) rounded-full transform transition-all
                ${isOpen ? "rotate-90 translate-y-3.5" : ""}`}
            />
            <div
              className={`w-12 h-0.5 bg-(--dark-green) rounded-full transform transition-all
                ${isOpen ? "scale-0" : "scale-100"}`}
            />
            <div
              className={`w-12 h-0.5 bg-(--dark-green) rounded-full transform transition-all
                ${isOpen ? "-translate-y-3.5" : ""}`}
            />
          </button>

          {/* Center logo */}
          <Link href="/" className="order-2 w-[59px] justify-self-center">
            <Image
              src="/wf-logo.webp"
              alt="Whimsy Flower's logo, representing the owner with a bouquet with a black dog walking by her side"
              width={80}
              height={80}
              className="w-[80px] h-auto"
              priority
            />
          </Link>

          {/* Right actions */}
          <div className="order-1 md:order-3">
            <div className="hidden md:flex items-center gap-6 justfiy-self-start md:justify-self-end">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Whimsy Flower on Instagram"
                className="relative inline-flex after:absolute after:-inset-3.5 after:content-['']"
              >
                <WhimsyImage
                  src="/instagram-logo.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="min-w-5 h-5 w-5"
                />
              </a>
              <Link href="/inquire">
                <PillButton label="Inquire" className="" />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full border-t-[1.5px] border-(--clover) mt-1.5"></div>
      </nav>
    </>
  );
};

export default Navbar;
