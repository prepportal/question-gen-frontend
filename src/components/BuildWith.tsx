"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: "600", subsets: ["latin"] });

const BuildWith = () => {
  return (
    <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
      <h2
        className={`${cn(
          "my-[6rem]",
          poppins.className
        )}}my-6 text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-400`}
      >
        Build on Tech Stack
      </h2>
      <div className="w-full inline-flex flex-nowrap">
        <ul className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
          <li>
            <Image
              alt="MySQL Azure"
              src="/mysql.svg"
              width={130}
              height={130}
            />
          </li>
          <li>
            <Image alt="nextjs" src="/nextjs.png" width={130} height={130} />
          </li>

          <li>
            <Image
              alt="tailwind"
              src="/tailwind.png"
              width={130}
              height={130}
            />
          </li>
          <li className="flex items-center gap-2">
            <Image
              alt="nextauth"
              src="/nextauth.png"
              width={120}
              height={120}
            />
          </li>
          <li className="flex items-center gap-2">
            <Image alt="openai" src="/openai.png" width={120} height={120} />
          </li>

          <li className="flex items-center gap-2">
            <Image
              alt="react query"
              src="/react-query.png"
              width={120}
              height={120}
            />
          </li>
          <li className="flex items-center gap-2">
            <Image alt="primsa" src="/prisma.png" width={120} height={120} />
          </li>
          <li className="flex items-center gap-2">
            <Image
              alt="typescript"
              src="/typescript.png"
              width={120}
              height={120}
            />
          </li>
        </ul>
        <ul
          className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
          aria-hidden={true}
        >
          <li>
            <Image
              alt="MySQL Azure"
              src="/mysql.svg"
              width={130}
              height={130}
            />
          </li>
          <li>
            <Image alt="nextjs" src="/nextjs.png" width={130} height={130} />
          </li>

          <li>
            <Image
              alt="tailwind"
              src="/tailwind.png"
              width={130}
              height={130}
            />
          </li>
          <li className="flex items-center gap-2">
            <Image
              alt="nextauth"
              src="/nextauth.png"
              width={120}
              height={120}
            />
          </li>
          <li className="flex items-center gap-2">
            <Image alt="openai" src="/openai.png" width={120} height={120} />
          </li>

          <li className="flex items-center gap-2">
            <Image
              alt="react query"
              src="/react-query.png"
              width={120}
              height={120}
            />
          </li>
          <li className="flex items-center gap-2">
            <Image alt="primsa" src="/prisma.png" width={120} height={120} />
          </li>
          <li className="flex items-center gap-2">
            <Image
              alt="typescript"
              src="/typescript.png"
              width={120}
              height={120}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BuildWith;
