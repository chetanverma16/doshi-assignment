"use client";

import { useAtom } from "jotai";
import {
  themeAtom,
  type ThemeConfig,
  type ScoreRange,
} from "@/lib/atoms/theme";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ThemeConfigPage() {
  const [theme, setTheme] = useAtom(themeAtom);
  const [localTheme, setLocalTheme] = useState<ThemeConfig>(theme);

  const handleScoreRangeChange = (
    index: number,
    field: keyof ScoreRange,
    value: string | number
  ) => {
    const newRanges = [...localTheme.scoreRanges];
    if (field === "color") {
      // Don't validate on color picker change since it always returns valid hex
      newRanges[index] = {
        ...newRanges[index],
        [field]: value.toString(),
      };
    } else {
      newRanges[index] = {
        ...newRanges[index],
        [field]: field === "label" ? value : Number(value),
      };
    }
    setLocalTheme({ ...localTheme, scoreRanges: newRanges });
  };

  const handleFontChange = (value: "Inter" | "Geist") => {
    setLocalTheme({
      ...localTheme,
      fonts: {
        primary: value,
      },
    });
  };

  const handleSave = () => {
    setTheme(localTheme);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Theme Configuration</h1>

      <div className="space-y-8">
        {/* Score Ranges Configuration */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Score Ranges</h2>
          <div className="space-y-4">
            {localTheme.scoreRanges.map((range, index) => (
              <div key={index} className="grid grid-cols-5 gap-4 items-center">
                <div>
                  <Label>Label</Label>
                  <Input
                    value={range.label}
                    onChange={(e) =>
                      handleScoreRangeChange(index, "label", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Min Score</Label>
                  <Input
                    type="number"
                    value={range.min}
                    onChange={(e) =>
                      handleScoreRangeChange(index, "min", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Max Score</Label>
                  <Input
                    type="number"
                    value={range.max}
                    onChange={(e) =>
                      handleScoreRangeChange(index, "max", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Color</Label>
                  <Input
                    type="color"
                    value={range.color}
                    onChange={(e) =>
                      handleScoreRangeChange(index, "color", e.target.value)
                    }
                    className="w-full h-10"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fonts Configuration */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Fonts</h2>
          <div className="grid grid-cols-1 gap-8">
            <div>
              <Label>Primary Font</Label>
              <Select
                value={localTheme.fonts.primary}
                onValueChange={handleFontChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Geist">Geist</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button onClick={handleSave} className="mt-8">
          Save Changes
        </Button>
      </div>
    </div>
  );
}
