"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";

const Navbar = () => {
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "bg-background dark:bg-[#1F1F1F] fixed top-0 items-center w-full p-6 flex flex-row justify-between",
        scrolled && "borer-b shadow-sm"
      )}
    >
      <Logo />
      <ModeToggle />
    </div>
  );
};

export default Navbar;
