'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/discover', label: 'Discover', icon: Flame },
  { href: '/matches', label: 'Matches', icon: MessageCircle },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="container grid h-16 grid-cols-3 items-center justify-items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href === '/matches' && pathname.startsWith('/matches'));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-lg transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'
              )}
            >
              <link.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
