"use client";

import { useState } from "react";
import { EmbeddableSimulator } from "@/components/embeddable-simulator";

import { CreditScore } from "@/lib/types";

export default function Home() {
  const [, setScore] = useState<CreditScore>();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <EmbeddableSimulator onScoreChange={setScore} />
      </div>
    </div>
  );
}
