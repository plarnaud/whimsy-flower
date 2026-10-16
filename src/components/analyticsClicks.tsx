"use client";

import { useEffect } from "react";

import { handleTrackedClick } from "@/lib/analytics";

/** Installs the site-wide click tracking once; renders nothing. */
export default function AnalyticsClicks() {
  useEffect(() => {
    document.addEventListener("click", handleTrackedClick, { capture: true });
    return () => document.removeEventListener("click", handleTrackedClick, { capture: true });
  }, []);
  return null;
}
