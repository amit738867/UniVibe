
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, MessageCircle, User, LogOut, Download } from 'lucide-react';
import { UniVibeLogo } from '@/components/icons';
import ModeToggle from '@/components/mode-toggle';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useAuth } from '@/hooks/use-auth';
import { usePWA } from '@/hooks/use-pwa';
import { Button } from './ui/button';

const navLinks = [
  { href: '/discover', label: 'Discover', icon: Flame },
  { href: '/matches', label: 'Matches', icon: MessageCircle },
];

export default function Header() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const { canInstall, installPWA } = usePWA();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <Link href="/discover" className="flex items-center gap-2">
            <UniVibeLogo className="h-7 w-7 text-primary" />
            <span className="hidden font-headline text-xl font-bold text-primary sm:inline-block">
              UniVibe
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-4 mx-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-primary/5 hover:text-primary'
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          {canInstall && (
            <Button size="sm" variant="outline" onClick={installPWA} className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Install App</span>
            </Button>
          )}
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 cursor-pointer">
                <AvatarImage src={user?.photoURL ?? "https://picsum.photos/seed/user/100/100"} alt="My profile" />
                <AvatarFallback>{user?.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{user?.displayName ?? 'My Account'}</DropdownMenuLabel>
              <DropdownMenuLabel className="font-normal text-xs text-muted-foreground -mt-2">{user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/profile">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
