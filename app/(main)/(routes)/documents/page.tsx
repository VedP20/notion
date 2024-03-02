"use client";

import React from "react";
import Image from "next/image";
import { PlusCircle } from "lucide-react";

import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";

const Documents = () => {
  const { user } = useUser();

  return (
    <div className="h-full flex flex-col items-center justify-center gap-3">
      <>
        <Image
          src={"/empty.png"}
          alt="image"
          height={300}
          width={300}
          className="dark:hidden"
        />
        <Image
          src={"/empty-dark.png"}
          alt="image"
          height={300}
          width={300}
          className="hidden dark:block"
        />

        <h2 className="text-lg font-medium">
          Welcome to {user?.firstName}&apos;s Jotion{" "}
        </h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create a note
        </Button>
      </>
    </div>
  );
};

export default Documents;