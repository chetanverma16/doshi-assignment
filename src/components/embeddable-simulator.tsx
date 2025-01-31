import { useEffect, useCallback } from "react";
import { CreditScoreSimulator } from "./credit-simulator";
import { CreditScore } from "@/lib/types";

interface EmbeddableSimulatorProps {
  onScoreChange?: (score: CreditScore) => void;
  className?: string;
}

export function EmbeddableSimulator({
  onScoreChange,
  className,
}: EmbeddableSimulatorProps) {
  // Memoize the score change handler
  const handleScoreChange = useCallback(
    (score: CreditScore) => {
      onScoreChange?.(score);
      // Send score updates to parent window if in iframe
      if (window !== window.parent) {
        window.parent.postMessage(
          {
            type: "SCORE_UPDATE",
            score,
          },
          "*"
        );
      }
    },
    [onScoreChange]
  );

  useEffect(() => {
    // Handle postMessage communication for iframe embedding
    const handleMessage = (event: MessageEvent) => {
      console.log("message", event);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={className}>
      <CreditScoreSimulator onScoreChange={handleScoreChange} />
    </div>
  );
}
