'use client';

import * as React from 'react';
import { SendHorizonal } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { messages as initialMessages } from '@/lib/data';
import type { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MessagesPage() {
    const [messages, setMessages] = React.useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = React.useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([
                ...messages,
                {
                    id: String(messages.length + 1),
                    sender: 'user',
                    text: newMessage.trim(),
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }
            ]);
            setNewMessage('');
        }
    };

  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1">
      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
                <AvatarImage src="https://placehold.co/100x100.png" />
                <AvatarFallback>ER</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>Dr. Evelyn Reed</CardTitle>
                <CardDescription>Replying about: Biology Meeting</CardDescription>
            </div>
        </CardHeader>
        <ScrollArea className="flex-1">
        <CardContent className="flex-1 space-y-4 p-6">
            {messages.map((message) => (
                <div
                key={message.id}
                className={cn(
                    'flex items-end gap-2',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                )}
                >
                {message.sender === 'teacher' && (
                    <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" />
                    <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                )}
                <div
                    className={cn(
                    'max-w-xs rounded-lg p-3 text-sm md:max-w-md',
                    message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary'
                    )}
                >
                    <p>{message.text}</p>
                    <p className={cn("text-xs mt-1", message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{message.timestamp}</p>
                </div>
                 {message.sender === 'user' && (
                    <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" />
                    <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                )}
                </div>
          ))}
        </CardContent>
        </ScrollArea>
        <CardFooter className="border-t pt-6">
          <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <Input 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1" />
            <Button type="submit" size="icon">
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
