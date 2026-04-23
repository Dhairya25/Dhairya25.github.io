"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ModeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("dp_mode");
    if (stored === "ide") {
      router.replace("/ide");
    } else if (stored === "terminal") {
      router.replace("/terminal");
    }
  }, [router]);

  return null;
}
