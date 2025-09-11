
'use client';

import { motion } from 'framer-motion';

type SignUpProgressBarProps = {
  currentStep: number;
  totalSteps: number;
};

export default function SignUpProgressBar({ currentStep, totalSteps }: SignUpProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md px-4">
      <div className="relative h-2 w-full rounded-full bg-secondary">
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'easeInOut', duration: 0.5 }}
        />
      </div>
      <p className="text-right text-xs text-muted-foreground mt-1">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
