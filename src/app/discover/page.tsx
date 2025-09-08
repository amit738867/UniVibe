import AppLayout from '@/components/app-layout';
import DiscoverClient from '@/components/discover/discover-client';

export default function DiscoverPage() {
  return (
    <AppLayout>
      <div className="container mx-auto max-w-2xl py-4 md:py-8">
        <DiscoverClient />
      </div>
    </AppLayout>
  );
}
