'use client';

import AppLayout from '@/components/app-layout';
import ProfileClient from '@/components/profile/profile-client';

export default function ProfilePage() {
  return (
    <AppLayout>
        <div className="container mx-auto max-w-4xl py-4 md:py-8 px-2 sm:px-4">
            <ProfileClient />
        </div>
    </AppLayout>
  );
}
