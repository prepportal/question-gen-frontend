"use client";

import Image from "next/image";

const BuildWith = () => {
  return (
    <div className="my-5">
      <div className="my-2 font-semibold">
        <h3 className="text-base font-semibold justify-self-center">Built with</h3>
        <div className="grid grid-cols-8 mx-auto">
          <div className="flex gap-2">
            <Image
              alt="planetscale"
              src="/planetscale.png"
              width={130}
              height={130}
            />
          </div>
          <div className="flex items-center gap-2">
            <Image alt="nextjs" src="/nextjs.png" width={130} height={130} />
          </div>
          <div className="flex items-center gap-2">
            <Image alt="tailwind" src="/tailwind.png" width={130} height={130} />
          </div>
          <div className="flex items-center gap-2">
            <Image alt="nextauth" src="/nextauth.png" width={120} height={120} />
          </div>
          <div className="flex items-center gap-2">
            <Image alt="openai" src="/openai.png" width={120} height={120} />
          </div>

          <div className="flex items-center gap-2">
            <Image
              alt="react query"
              src="/react-query.png"
              width={120}
              height={120}
            />
          </div>
          <div className="flex items-center gap-2">
            <Image alt="primsa" src="/prisma.png" width={120} height={120} />
          </div>
          <div className="flex items-center gap-2">
            <Image
              alt="typescript"
              src="/typescript.png"
              width={120}
              height={120}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildWith;
