"use client";

import { useState, useEffect, useRef } from "react";
import PillButton from "./pillButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navH, setNavH] = useState(0);
  const [hasShadow, setHasShadow] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

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
        <div className="bg-(--pale-yellow)/25 h-full flex flex-col justify-between">
          <ul className="flex flex-col gap-12 pl-12 pt-16 lg:pt-8 italic uppercase text-[18px] tracking-[-0.04em] items-start">
            <li>
              <a href="#" className="block text-lg ">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg">
                Portfolio
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block text-lg">
                Inquire
              </a>
            </li>
          </ul>

          <div className="pb-6">
            <div className="w-full pl-12 pb-8">
              <img
                src="/logotype-yellow.svg"
                alt="Whimsy Flower"
                className="h-16 mb-6"
              />
              <div className="flex gap-6 mb-4">
                <a href="">
                  <img src="/instagram-logo.svg" alt="Instagram logo" />
                </a>
                <a href="">
                  <img src="/tiktok-logo.svg" alt="TikTok logo" />
                </a>
              </div>
              <span className="italic uppercase text-[14px] tracking-[-0.04em]">
                ©2025 Whimsy Flower, llc
              </span>
            </div>
            <div className="w-full h-2 border-y-[1.5px] border-(--faded-green)/50"></div>
          </div>
        </div>
      </aside>

      {/* Fixed top navbar (kept above everything) */}
      <nav
        ref={navRef}
        className="fixed top-0 py-2 w-full z-130 bg-background transition-shadow duration-300"
      >
        <div className="grid grid-cols-3 w-full border-y-[1.5px] border-(--pale-yellow) py-2 px-12 items-center">
          {/* Toggle button */}
          <button
            className={`order-3 md:order-1 justify-self-end md:justify-self-start flex flex-col gap-3 relative duration-300 transform transition-all
              ${isOpen ? "rotate-45" : ""}`}
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
          <button className="order-2 w-[59px] justify-self-center">
            <img
              src="wf-logo.png"
              alt="Whimsy Flower's logo, representing the owner with a bouquet with a black dog walking by her side"
            />
          </button>

          {/* Right actions */}
          <div className="order-1 md:order-3">
            <div className="hidden md:flex items-center gap-6 justfiy-self-start md:justify-self-end">
              <a href="">
                <img
                  src="/instagram-logo.svg"
                  alt="Instagram logo"
                  className="min-w-5"
                />
              </a>
              <a href="">
                <img
                  src="/tiktok-logo.svg"
                  alt="TikTok logo"
                  className="min-w-5"
                />
              </a>
              <PillButton label="Inquire" className="" />
            </div>
          </div>
        </div>
        <div className="w-full h-px bg-(--pale-yellow) mt-1.5"></div>
      </nav>
    </>
  );
};

export default Navbar;
