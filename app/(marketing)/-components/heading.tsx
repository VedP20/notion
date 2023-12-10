"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Heading = () => {
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">
        Write, plan, share. <br /> With{" "}
        <span className="underline">Jotion</span> at your side.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium text-center">
        Jotion is the connected workspace where <br /> better, faster work
        happens.
      </h3>
      <Button>
        Enter Jotion
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

export default Heading;
