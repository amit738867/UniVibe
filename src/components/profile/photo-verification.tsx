'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck, Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verifyPhotoAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type Photo = {
  id: number;
  url: string;
  isVerified: boolean;
};

type PhotoVerificationProps = {
  photo: Photo;
  onVerificationResult: (isGenuine: boolean) => void;
};

export function PhotoVerification({ photo, onVerificationResult }: PhotoVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      // In a real app, you would get a data URI from a file upload.
      // Here, we simulate it.
      const simulatedDataUri = `data:image/jpeg;base64,simulated_base64_string_for_${photo.id}`;
      
      const result = await verifyPhotoAction({ photoDataUri: simulatedDataUri });

      if (result.isGenuine) {
        toast({
          title: 'Photo Verified!',
          description: `Confidence: ${(result.confidence * 100).toFixed(0)}%`,
        });
        onVerificationResult(true);
      } else {
        toast({
          title: 'Verification Failed',
          description: result.reason || 'The photo could not be verified.',
          variant: 'destructive',
        });
        onVerificationResult(false);
      }
    } catch (error) {
      toast({
        title: 'Verification Error',
        description: 'An unexpected error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="relative group aspect-square">
      <Image
        src={photo.url}
        alt={`User photo ${photo.id}`}
        width={400}
        height={400}
        className="rounded-lg object-cover w-full h-full"
        data-ai-hint="person lifestyle"
      />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        {!photo.isVerified && !isVerifying && (
          <Button onClick={handleVerify} variant="secondary" size="sm">
            Verify with AI
          </Button>
        )}
      </div>

      {isVerifying && (
        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
        </div>
      )}

      {photo.isVerified && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-2 right-2 bg-background rounded-full p-1">
                <ShieldCheck className="h-6 w-6 text-green-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>AI Verified Photo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
