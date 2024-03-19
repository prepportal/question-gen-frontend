import Image from "next/image";
import React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: "600", subsets: ["latin"] });

import { Github, Linkedin, TwitterIcon } from "lucide-react";

export const CreatorSection = () => {
  return (
    <div className="flex items-center justify-center mt-9 pb-7 lg:pb-0">
      <div className=" h-[17.3rem] w-[19rem] md:h-[19rem] md:w-[25rem] rounded-lg p-2 space-y-5">
        <p
          className={cn(
            "  font-semibold text-center text-3xl",
            poppins.className
          )}
        >
          An app by -{" "}
        </p>
        <div className=" justify-center items-center flex">
          <Image
            src="https://avatars.githubusercontent.com/u/142530956?s=200&v=4"
            alt="logo"
            width={100}
            height={100}
            className="shadow-2xl"
          />
        </div>
        <p className=" text-center text-zinc-500 text-muted-foreground text-xl">
          PrepPortal
        </p>

        <div className="flex justify-center items-center gap-x-8">
          <Link href="https://twitter.com/akas__h" target="_blank">
            <TwitterIcon className=" h-8 w-8 text-yellow-500/60" />
          </Link>

          <Link href="https://github.com/prepportal" target="_blank">
            <Github className=" h-8 w-8 text-yellow-500/60" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/akashrchandran/"
            target="_blank"
          >
            <Linkedin className=" h-8 w-8 text-yellow-500/60" />
          </Link>
        </div>
      </div>
    </div>
  );
};
