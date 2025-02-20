'use client'


import { Npc } from "@/cwn/npc";
import React from "react";

export default function Home() {
  let npc = new Npc("hat-man");

  function regenNpc() {
    npc = new Npc("tomato");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <p>{npc.Name}</p>
        <p>
          {npc.MainStrength.title} - {npc.MainStrength.description}
        </p>
        <button onClick={regenNpc}>new</button>
      </main>
    </div>
  );
}
