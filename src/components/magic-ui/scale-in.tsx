import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScaleInProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  delay?: number;
}

export function ScaleIn({ 
  children, 
  className, 
  scale = 0.8,
  delay = 0 
}: ScaleInProps) {
  return (
    <motion.div
      initial={{ scale, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
} 