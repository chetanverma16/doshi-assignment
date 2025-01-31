import { useState, useEffect, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditSimulator } from "@/lib/simulator";
import { SimulatorProps, CreditFactors, CreditScore } from "@/lib/types";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { Separator } from "./ui/separator";
import RainbowSlider from "./charts/rainbow-slider";

const simulator = new CreditSimulator();

const initialFactors: CreditFactors = {
  creditUtilization: 30,
  paymentHistory: true,
  newCreditApplications: 0,
  creditAge: 2,
  debtToIncomeRatio: 25,
};

export function CreditScoreSimulator({ onScoreChange }: SimulatorProps) {
  const [factors, setFactors] = useState<CreditFactors>(initialFactors);
  const [score, setScore] = useState<CreditScore>(() =>
    simulator.calculateScore(initialFactors)
  );

  useEffect(() => {
    const newScore = simulator.calculateScore(factors);
    setScore(newScore);
    onScoreChange?.(newScore);
  }, [factors, onScoreChange]);

  const handleUtilizationChange = useCallback((value: number[]) => {
    setFactors((prev) => ({ ...prev, creditUtilization: value[0] }));
  }, []);

  const handlePaymentHistoryChange = useCallback((pressed: boolean) => {
    setFactors((prev) => ({ ...prev, paymentHistory: pressed }));
  }, []);

  const handleNewCreditChange = useCallback((value: string) => {
    const applications = Math.max(0, parseInt(value) || 0);
    setFactors((prev) => ({ ...prev, newCreditApplications: applications }));
  }, []);

  const handleCreditAgeChange = useCallback((value: number[]) => {
    setFactors((prev) => ({ ...prev, creditAge: value[0] }));
  }, []);

  const handleDebtToIncomeChange = useCallback((value: string) => {
    const ratio = Math.max(0, Math.min(100, parseFloat(value) || 0));
    setFactors((prev) => ({ ...prev, debtToIncomeRatio: ratio }));
  }, []);

  const getScoreColor = useCallback(() => {
    switch (score.range) {
      case "Excellent":
        return "text-green-600";
      case "VeryGood":
        return "text-emerald-500";
      case "Good":
        return "text-yellow-500";
      case "Fair":
        return "text-orange-500";
      case "Poor":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  }, [score.range]);

  return (
    <div className="flex flex-col gap-y-2 w-full p-4 mx-auto max-w-lg rounded-2xl shadow-[0px_4px_12px_0px_rgba(0,0,0,0.05)] border border-gray-200">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold">Credit Score Simulator</h1>
      </div>
      <Separator />
      <div className="w-full flex-col gap-y-2 my-4 p-6 border border-gray-200/60 shadow-lg rounded-2xl flex items-center justify-center">
        <div className="flex flex-col items-center">
          <NumberFlow
            className={cn("text-2xl font-bold", getScoreColor())}
            value={score.score}
          />
          <h2 className="text-xs text-gray-500">{score.range} Credit Score</h2>
        </div>

        <RainbowSlider
          colors={["#8B0000", "#DC143C", "#FF4500", "#FFD700", "#33CC33"]}
          range={[300, 850]}
          value={score.score}
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="flex items-center gap-x-2">
            <span>Credit Utilization</span>
            <div>
              <NumberFlow value={factors.creditUtilization} />%
            </div>
          </Label>
          <Slider
            value={[factors.creditUtilization]}
            onValueChange={handleUtilizationChange}
            max={100}
            step={1}
          />
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="space-y-2">
            <Label>Payment History</Label>
            <Toggle
              pressed={factors.paymentHistory}
              onPressedChange={handlePaymentHistoryChange}
              variant={factors.paymentHistory ? "success" : "danger"}
            >
              {factors.paymentHistory ? "On-time Payments" : "Missed Payments"}
            </Toggle>
          </div>

          <div className="space-y-2 w-full">
            <Label>New Credit Applications</Label>
            <Input
              type="number"
              min={0}
              value={factors.newCreditApplications}
              onChange={(e) => handleNewCreditChange(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Credit Age (Years: <NumberFlow value={factors.creditAge} />)
          </Label>
          <Slider
            value={[factors.creditAge]}
            onValueChange={handleCreditAgeChange}
            max={20}
            step={1}
          />
        </div>

        <div className="space-y-2">
          <Label>Debt-to-Income Ratio (%)</Label>
          <Input
            type="number"
            min={0}
            max={100}
            value={factors.debtToIncomeRatio}
            onChange={(e) => handleDebtToIncomeChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
