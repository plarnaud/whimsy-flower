"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import WhimsyImage from "./whimsyImage";
import PillButton from "./pillButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navH, setNavH] = useState(0);
  const [hasShadow, setHasShadow] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Weddings", href: "/weddings" },
    { label: "Events", href: "/events" },
    { label: "About", href: "/about" },
    { label: "Inquire", href: "/inquire" },
  ];

  // Measure navbar height so the menu/backdrop start below it
  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        setNavH(navRef.current.getBoundingClientRect().height);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Handle body scroll when menu is open
  useEffect(() => {
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
          transition-transform duration-300 ease-out
          transform
          ${
            isOpen
              ? "translate-y-0 lg:translate-y-0 lg:translate-x-0"
              : "-translate-y-full lg:translate-y-0 lg:-translate-x-full"
          }
        `}
        style={{ top: navH }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Menu content */}
        <div className="bg-(--clover)/25 h-full flex flex-col justify-between">
          <ul className="flex flex-col gap-8 md:gap-12 pl-6 md:pl-12 pt-12 md:pt-16 lg:pt-8 italic uppercase text-[18px] tracking-[-0.04em] items-start">
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

          <div className="pb-6">
            <div className="w-full pl-6 md:pl-12 pb-6 md:pb-8">
              <Image
                src="/logotype-yellow.svg"
                alt="Whimsy Flower"
                width={220}
                height={64}
                className="h-16 w-auto mb-6"
                sizes="220px"
                priority
              />
              <div className="flex gap-6 mb-4">
                <a href="">
                  <WhimsyImage
                    src="/instagram-logo.svg"
                    alt="Instagram logo"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
                <a href="">
                  <WhimsyImage
                    src="/tiktok-logo.svg"
                    alt="TikTok logo"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </a>
              </div>
              <span className="italic uppercase text-[14px] tracking-[-0.04em]">
                ©2025 Whimsy Flower, llc
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
            className={`order-3 md:order-1 justify-self-end md:justify-self-start flex flex-col gap-3 relative duration-300 transform transition-all
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
              <a href="">
                <WhimsyImage
                  src="/instagram-logo.svg"
                  alt="Instagram logo"
                  width={20}
                  height={20}
                  className="min-w-5 h-5 w-5"
                />
              </a>
              <a href="">
                <WhimsyImage
                  src="/tiktok-logo.svg"
                  alt="TikTok logo"
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
        <div className="w-full h-[1.5px] bg-(--clover) mt-1.5"></div>
      </nav>
    </>
  );
};

export default Navbar;
