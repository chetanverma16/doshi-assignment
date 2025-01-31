export interface CreditScore {
  score: number;
  range: ScoreRange;
}

export type ScoreRange = "Poor" | "Fair" | "Good" | "VeryGood" | "Excellent";

export interface CreditFactors {
  creditUtilization: number; // 0-100%
  paymentHistory: boolean; // true for on-time, false for missed
  newCreditApplications: number;
  creditAge: number; // in years
  debtToIncomeRatio: number; // 0-100%
}

export interface SimulatorProps {
  onScoreChange?: (score: CreditScore) => void;
  className?: string;
  locale?: string;
}
