"use client";

import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import React from "react";
import Logo from "./logo";
import { ModeToggle } from "@/components/ui/mode-toggle";

import { Authenticated, useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  return (
    <div
      className={cn(
        "bg-background dark:bg-[#1F1F1F] fixed top-0 items-center w-full p-6 flex z-50",
        scrolled && "borer-b shadow-sm"
      )}
    >
      <Logo />

      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button variant={"ghost"} size={"sm"}>
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size={"sm"}>Get Jotion Free</Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            {/* <Button variant={"ghost"} size={"sm"} asChild>
              <Link href={"/"}>Enter Jotion</Link>
            </Button> */}
            <UserButton afterSignOutUrl="/" />
          </>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
