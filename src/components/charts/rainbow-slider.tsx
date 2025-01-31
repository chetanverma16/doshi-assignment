import { motion } from "framer-motion";

interface RainbowSliderProps {
  colors: string[];
  range: [number, number];
  value: number;
}

const RainbowSlider = ({ colors, range, value }: RainbowSliderProps) => {
  const [min, max] = range;
  const progress = (value - min) / (max - min);

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${colors.join(",")})`,
        backgroundSize: "100% 100%",
      }}
      className="relative h-2 w-full bg-gray-200 dark:bg-gray-800 rounded-full"
    >
      <motion.div
        initial={{ left: 0 }}
        animate={{ left: `${progress * 100}%` }}
        transition={{ duration: 0.2 }}
        className="absolute h-full"
      >
        <div className="absolute top-0 left-0 h-full w-1 bg-white dark:bg-gray-950" />
      </motion.div>
    </div>
  );
};

export default RainbowSlider;
