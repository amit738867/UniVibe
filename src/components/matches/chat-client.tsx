'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockChatMessages } from '@/lib/data';
import { cn } from '@/lib/utils';

type User = {
    id: number;
    name: string;
    avatar: string;
    isOnline: boolean;
}

type ChatClientProps = {
    user: User;
}

export default function ChatClient({ user }: ChatClientProps) {
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message = {
      id: messages.length + 1,
      sender: 'me' as const,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)]">
      <header className="flex items-center gap-4 border-b p-3 sticky top-16 bg-background/95 z-10 md:top-16">
        <Link href="/matches" className="md:hidden">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <div className="relative">
            <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="person face" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {user.isOnline && (
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 border-2 border-background" />
            )}
        </div>
        <h2 className="font-semibold font-headline text-lg">{user.name}</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn('flex items-end gap-2', msg.sender === 'me' ? 'justify-end' : 'justify-start')}
          >
            {msg.sender === 'them' && <Avatar className="h-8 w-8"><AvatarImage src={user.avatar} data-ai-hint="person face"/></Avatar>}
            <div
              className={cn(
                'max-w-xs md:max-w-md rounded-2xl px-4 py-2',
                msg.sender === 'me'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-secondary text-secondary-foreground rounded-bl-none'
              )}
            >
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="border-t p-3 bg-background sticky bottom-16 md:bottom-0">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 rounded-full h-10 w-10">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </footer>
    </div>
  );
}
