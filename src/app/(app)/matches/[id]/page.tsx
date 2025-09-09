'use client';

import ChatClient from '@/components/matches/chat-client';
import { mockMatches } from '@/lib/data';
import { notFound } from 'next/navigation';


export default function ChatPage({ params }: { params: { id: string } }) {
  const user = mockMatches.find(m => m.id.toString() === params.id);

  if (!user) {
    notFound();
  }

  return (
      <ChatClient user={user} />
  );
}
