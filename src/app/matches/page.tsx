import Link from 'next/link';
import { mockMatches } from '@/lib/data';
import AppLayout from '@/components/app-layout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function MatchesPage() {
  return (
    <AppLayout>
      <div className="container mx-auto max-w-2xl py-4 md:py-8 h-full px-2 sm:px-4">
        <h1 className="text-2xl md:text-3xl font-headline font-bold mb-4 sm:mb-6 px-2 sm:px-0">Matches</h1>
        <Card className="p-2">
          <div className="space-y-1">
            {mockMatches.map((match) => (
              <Link href={`/matches/${match.id}`} key={match.id} className="block">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={match.avatar} alt={match.name} data-ai-hint="person face"/>
                      <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {match.isOnline && (
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold font-headline text-base">{match.name}</h2>
                      <p className="text-xs text-muted-foreground">{match.lastMessageTime}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{match.lastMessage}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
