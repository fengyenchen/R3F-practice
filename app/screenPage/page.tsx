"use client";

import { useState } from "react";
import Screen from "./Screen";

export default function ScreenPage() {
  const [openImage, setOpenImage] = useState<string | null>(null);

  const [color, setColor] = useState<string>("green");
  const [alpha, setAlpha] = useState<string>("mid");

  const images = [
    { id: 1, src: "/screen_photo1.png" },
    { id: 2, src: "/screen_photo2.png" },
    { id: 3, src: "/screen_photo3.png" },
    { id: 4, src: "/screen_photo4.png" },
    { id: 5, src: "/screen_photo5.png" },
    { id: 6, src: "/screen_photo6.png" },
    { id: 7, src: "/screen_photo7.png" },
  ];

  const colors = ["green", "blue", "orange", "purple"];

  const allAlpha = ["low", "mid", "high"];

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#808080] flex items-center justify-center">
      {/* 3D */}
      <Screen color={color} alpha={alpha} />

      {/* 圖片側邊欄 */}
      <div className="absolute bottom-8 md:top-8 left-8 z-10 flex flex-row md:flex-col gap-4 bg-white/10 p-4 
                      rounded-xl border border-white/20 shadow-lg backdrop-blur-md
                      max-h-[calc(100vh-4rem)] max-w-[calc(100vw-4rem)] overflow-y-auto overflow-x-auto
                      scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img) => (
          <button
            key={img.id}
            onClick={() => setOpenImage(img.src)}
            className="group relative w-20 h-20 shrink-0 overflow-hidden rounded-lg border-2 border-white/50 hover:border-white transition shadow-md"
          >
            <img
              src={img.src}
              className="w-full h-full object-cover cursor-pointer transition"
            />
          </button>
        ))}
      </div>

      {/* 模型組合切換 */}
      <div className="absolute top-8 left-8 md:left-auto md:right-8 z-10 flex flex-col gap-4 bg-white/10 p-4 rounded-xl border border-white/20 shadow-lg backdrop-blur-md text-white text-sm max-w-[calc(100vw-4rem)] md:w-50">
        
        {/* 顏色選擇 */}
        <div className="w-full flex flex-row md:flex-col gap-4 md:gap-0">
          <p className="font-semibold mb-2 opacity-80">Color</p>
          <div className="flex flex-row gap-2 overflow-x-auto md:overflow-x-visible flex-nowrap md:flex-wrap scrollbar-none [&::-webkit-scrollbar]:hidden">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`px-3 py-1.5 rounded-md border capitalize transition text-xs shrink-0 cursor-pointer ${
                  color === c
                    ? "bg-white text-neutral-800 font-medium border-white"
                    : "bg-black/20 border-white/30 hover:border-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 透明度選擇 */}
        <div className="w-full flex flex-row md:flex-col gap-4 md:gap-0">
          <p className="font-semibold mb-2 opacity-80">Alpha</p>
          <div className="flex flex-row gap-2 overflow-x-auto md:overflow-x-visible flex-nowrap md:flex-wrap scrollbar-none [&::-webkit-scrollbar]:hidden">
            {allAlpha.map((a) => (
              <button
                key={a}
                onClick={() => setAlpha(a)}
                className={`px-3 py-1.5 rounded-md border capitalize transition text-xs shrink-0 cursor-pointer ${
                  alpha === a
                    ? "bg-white text-neutral-800 font-medium border-white"
                    : "bg-black/20 border-white/30 hover:border-white"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 圖片視窗 */}
      {openImage && (
        <div
          onClick={() => setOpenImage(null)}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <button
            onClick={() => setOpenImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light p-2 cursor-pointer"
          >
            ✕
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[85vw] max-h-[85vh] overflow-hidden bg-neutral-900 flex items-center justify-center"
          >
            <img
              src={openImage}
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>
        </div>
      )}
    </main>
  );
}