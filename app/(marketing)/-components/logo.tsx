import Image from "next/image";
import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center w-fit">
      <Image src={"/logo.svg"} alt="Logo" height={40} width={40} />
      <p className={cn("font-semibold mx-2", font.className)}>Jotion</p>
    </div>
  );
};

export default Logo;
