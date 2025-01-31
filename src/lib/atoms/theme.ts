import { atomWithStorage } from "jotai/utils";

export interface ScoreRange {
  min: number;
  max: number;
  label: string;
  color: string;
}

export interface ThemeConfig {
  scoreRanges: ScoreRange[];
  fonts: {
    primary: string;
  };
}

// Default theme configuration
const defaultTheme: ThemeConfig = {
  scoreRanges: [
    { min: 300, max: 579, label: "Poor", color: "#FF4B55" },
    { min: 580, max: 669, label: "Fair", color: "#FFA726" },
    { min: 670, max: 739, label: "Good", color: "#66BB6A" },
    { min: 740, max: 850, label: "Excellent", color: "#2E7D32" },
  ],
  fonts: {
    primary: "Inter",
  },
};

// Create atom with local storage persistence
export const themeAtom = atomWithStorage<ThemeConfig>(
  "doshi-theme-config",
  defaultTheme
);

// Helper function to get score range based on score value
export const getScoreRange = (
  score: number,
  ranges: ScoreRange[]
): ScoreRange | undefined => {
  return ranges.find((range) => score >= range.min && score <= range.max);
};
