import { Heart, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AiMatchDialog from './ai-match-dialog';

type ActionButtonsProps = {
  onDislike: () => void;
  onLike: () => void;
};

export default function ActionButtons({ onDislike, onLike }: ActionButtonsProps) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <Button
        variant="outline"
        size="icon"
        className="h-16 w-16 rounded-full border-2 border-primary/50 text-primary/80 hover:bg-primary/10 hover:text-primary"
        onClick={onDislike}
      >
        <X className="h-8 w-8" />
      </Button>

      <AiMatchDialog />
      
      <Button
        variant="outline"
        size="icon"
        className="h-16 w-16 rounded-full border-2 border-accent text-accent hover:bg-accent/10"
        onClick={onLike}
      >
        <Heart className="h-8 w-8" />
      </Button>
    </div>
  );
}
