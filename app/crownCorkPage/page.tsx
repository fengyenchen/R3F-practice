"use client";

import CrownCork from "./CrownCork";
import Link from "next/link";
import Menu from "./Menu";

export default function CrownCorkPage() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-background flex flex-col items-center justify-between">

      <CrownCork />

      <div className="z-10 w-full py-8 md:bg-white/5 md:border-b md:border-white/10 flex items-center justify-between px-6 md:px-12 pointer-events-auto">
        <Link
          href="/crownCorkPage"
          className="text-2xl md:text-3xl font-bold text-white font-serif tracking-wide"
        >
          NTUMaker
        </Link>
        <Menu />
      </div>

      <div className="z-10 w-full flex flex-col justify-start items-start text-sm md:text-lg font-bold text-white font-serif leading-relaxed px-6 md:px-12 py-8 pointer-events-auto">
        <span className="text-xl md:text-2xl block mb-1 text-neutral-100">Build. Learn. Share.</span>
        <p className="font-sans font-normal text-neutral-400 text-xs md:text-sm">
          致力於推廣創客文化，共同探索創造的樂趣。
        </p>
      </div>

    </main>
  );
}