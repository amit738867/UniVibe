'use client';

import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { suggestMatchesAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { SuggestedMatchesOutput } from '@/ai/flows/ai-suggested-matches';

type AiMatchDialogProps = {
    onMatchesFound?: (matches: SuggestedMatchesOutput) => void;
}

export default function AiMatchDialog({ onMatchesFound }: AiMatchDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [interests, setInterests] = useState('Hiking, Coffee, Indie Music');
  const [suggestedMatches, setSuggestedMatches] = useState<string[]>([]);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    setSuggestedMatches([]);
    try {
      const result = await suggestMatchesAction({
        location: 'Main Campus',
        academicCompatibility: 'Similar majors',
        sharedInterests: interests,
        desiredNumberOfMatches: 5,
        profileDescription: 'A student looking for new friends or a partner.',
      });

      if (result.matches && result.matches.length > 0) {
        setSuggestedMatches(result.matches);
        if(onMatchesFound) {
            onMatchesFound(result);
            setIsOpen(false);
             toast({
              title: 'New Matches Found!',
              description: 'We\'ve found some new people for you to meet.',
            });
        }
      } else {
        toast({
          title: 'No Matches Found',
          description: 'The AI couldn\'t find anyone new right now. Try different interests!',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'An Error Occurred',
        description: 'Something went wrong while getting suggestions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-20 w-20 rounded-full border-2 border-primary bg-primary/10 text-primary hover:bg-primary/20"
        >
          <Sparkles className="h-8 w-8" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center gap-2">
            <Sparkles className="text-primary" />
            AI Smart Matching
          </DialogTitle>
          <DialogDescription>
            Tell us what you're looking for, and our AI will find potential matches for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interests" className="text-right">
              Interests
            </Label>
            <Input
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Coding, Hiking, Art"
            />
          </div>
        </div>
        {suggestedMatches.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Here's who we found:</h4>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {suggestedMatches.map((match, index) => (
                <li key={index}>{match}</li>
              ))}
            </ul>
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Find Matches'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
