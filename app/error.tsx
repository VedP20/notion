"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 ">
      <h1 className="text-xl font-medium">Something went wrong</h1>
      <Button asChild>
        <Link href="/documents">Go Back</Link>
      </Button>
    </div>
  );
};

export default Error;
