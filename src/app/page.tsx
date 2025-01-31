"use client";

import { useState } from "react";
import { EmbeddableSimulator } from "@/components/embeddable-simulator";

import { CreditScore } from "@/lib/types";
import Link from "next/link";
import { themeAtom } from "@/lib/atoms/theme";
import { useAtom } from "jotai";

export default function Home() {
  const [, setScore] = useState<CreditScore>();
  const [theme] = useAtom(themeAtom);

  return (
    <div
      style={{
        fontFamily: theme.fonts.primary,
      }}
      className="min-h-screen p-8 mx-auto max-w-3xl flex flex-col gap-10"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Credit Score SDK</h1>
        <Link className="text-gray-700 hover:text-gray-900" href="/theme">
          Theme Config
        </Link>
      </div>
      <EmbeddableSimulator onScoreChange={setScore} />
    </div>
  );
}
