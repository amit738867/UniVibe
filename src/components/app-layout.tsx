import type { ReactNode } from 'react';
import Header from '@/components/header';
import BottomNav from '@/components/bottom-nav';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <BottomNav />
    </div>
  );
}
