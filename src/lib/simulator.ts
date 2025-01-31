import { CreditFactors, CreditScore, ScoreRange } from "./types";

const SCORE_RANGES = {
  Poor: { min: 300, max: 579 },
  Fair: { min: 580, max: 669 },
  Good: { min: 670, max: 739 },
  VeryGood: { min: 740, max: 799 },
  Excellent: { min: 800, max: 850 },
};

const WEIGHTS = {
  creditUtilization: 0.3,
  paymentHistory: 0.35,
  creditAge: 0.15,
  newCreditApplications: 0.1,
  debtToIncomeRatio: 0.1,
};

export class CreditSimulator {
  private calculateUtilizationScore(utilization: number): number {
    // Clamp utilization between 0 and 100
    const clampedUtilization = Math.max(0, Math.min(100, utilization));
    // Lower utilization is better, with optimal being under 30%
    if (clampedUtilization <= 30) {
      return 100;
    } else if (clampedUtilization <= 50) {
      return 80;
    } else if (clampedUtilization <= 75) {
      return 60;
    } else {
      return 40;
    }
  }

  private calculatePaymentHistoryScore(onTime: boolean): number {
    return onTime ? 100 : 40;
  }

  private calculateCreditAgeScore(years: number): number {
    // Clamp years to non-negative values
    const clampedYears = Math.max(0, years);
    if (clampedYears >= 7) return 100;
    if (clampedYears >= 5) return 90;
    if (clampedYears >= 3) return 80;
    if (clampedYears >= 1) return 70;
    return 60;
  }

  private calculateNewCreditScore(applications: number): number {
    // Clamp applications to non-negative values
    const clampedApps = Math.max(0, applications);
    if (clampedApps === 0) return 100;
    if (clampedApps === 1) return 90;
    if (clampedApps === 2) return 80;
    if (clampedApps === 3) return 70;
    return 60;
  }

  private calculateDebtToIncomeScore(ratio: number): number {
    // Clamp ratio between 0 and 100
    const clampedRatio = Math.max(0, Math.min(100, ratio));
    if (clampedRatio <= 30) return 100;
    if (clampedRatio <= 40) return 90;
    if (clampedRatio <= 50) return 80;
    if (clampedRatio <= 60) return 70;
    return 60;
  }

  private getScoreRange(score: number): ScoreRange {
    if (score >= SCORE_RANGES.Excellent.min) return "Excellent";
    if (score >= SCORE_RANGES.VeryGood.min) return "VeryGood";
    if (score >= SCORE_RANGES.Good.min) return "Good";
    if (score >= SCORE_RANGES.Fair.min) return "Fair";
    return "Poor";
  }

  calculateScore(factors: CreditFactors): CreditScore {
    const scores = {
      utilization: this.calculateUtilizationScore(factors.creditUtilization),
      payment: this.calculatePaymentHistoryScore(factors.paymentHistory),
      age: this.calculateCreditAgeScore(factors.creditAge),
      newCredit: this.calculateNewCreditScore(factors.newCreditApplications),
      debtToIncome: this.calculateDebtToIncomeScore(factors.debtToIncomeRatio),
    };

    const weightedScore =
      scores.utilization * WEIGHTS.creditUtilization +
      scores.payment * WEIGHTS.paymentHistory +
      scores.age * WEIGHTS.creditAge +
      scores.newCredit * WEIGHTS.newCreditApplications +
      scores.debtToIncome * WEIGHTS.debtToIncomeRatio;

    // Map the 0-100 score to the 300-850 range
    const finalScore = Math.round(300 + (weightedScore * 550) / 100);
    const range = this.getScoreRange(finalScore);

    return {
      score: finalScore,
      range,
    };
  }
}
