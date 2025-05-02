import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BlurIn({ children, className, delay = 0 }: BlurInProps) {
  return (
    <motion.div
      initial={{ filter: "blur(10px)", opacity: 0 }}
      animate={{ filter: "blur(0px)", opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
} 