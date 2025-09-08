'use client';

import { useState } from 'react';
import { Heart, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ModeToggle() {
  const [mode, setMode] = useState<'dating' | 'friends'>('dating');

  const toggleMode = () => {
    setMode((prev) => (prev === 'dating' ? 'friends' : 'dating'));
  };

  const isDating = mode === 'dating';

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleMode}
            className="relative flex h-9 w-20 items-center justify-center rounded-full bg-secondary p-1 shadow-inner"
            aria-label={`Switch to ${isDating ? 'Friends' : 'Dating'} mode`}
          >
            <span
              className={cn(
                'absolute left-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-background shadow-md transition-transform',
                !isDating && 'translate-x-11'
              )}
            >
              {isDating ? (
                <Heart className="h-4 w-4 text-accent" fill="hsl(var(--accent))" />
              ) : (
                <Users className="h-4 w-4 text-primary" />
              )}
            </span>
            <span className="sr-only">Current mode: {mode}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Switch to {isDating ? 'Friends' : 'Dating'} mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
