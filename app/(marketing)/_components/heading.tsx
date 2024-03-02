"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
        <span className=" leading-normal"> Write, plan, share.</span> <br />{" "}
        With <span className="underline">Jotion</span> at your side.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium text-center">
        Jotion is the connected workspace where <br /> better, faster work
        happens.
      </h3>

      <div className="w-full justify-center items-center flex">
        {isLoading && <Spinner />}
        {isAuthenticated && !isLoading && (
          <>
            <Button asChild>
              <Link href={"/documents"}>
                Enter Jotion
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </>
        )}

        {!isAuthenticated && !isLoading && (
          <>
            <SignInButton mode="modal">
              <Button asChild>
                <Link href={"/"}>Get Jotion free</Link>
              </Button>
            </SignInButton>
          </>
        )}
      </div>
    </div>
  );
};

export default Heading;
