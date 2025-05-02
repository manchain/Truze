import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RotateInProps {
  children: React.ReactNode;
  className?: string;
  angle?: number;
  delay?: number;
}

export function RotateIn({ 
  children, 
  className, 
  angle = 45,
  delay = 0 
}: RotateInProps) {
  return (
    <motion.div
      initial={{ rotate: angle, opacity: 0 }}
      animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
} 