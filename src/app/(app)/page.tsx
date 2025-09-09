
'use client';

import { motion } from 'framer-motion';
import { Sparkles, Users, Compass } from 'lucide-react';
import { UniVibeLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const features = [
    {
        icon: <Compass className="h-8 w-8 text-primary" />,
        title: 'Discover People',
        description: 'Swipe through profiles of students on your campus and find new connections.',
    },
    {
        icon: <Sparkles className="h-8 w-8 text-primary" />,
        title: 'AI-Powered Matches',
        description: 'Let our smart AI suggest compatible matches based on your interests and personality.',
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: 'Build Your Circle',
        description: 'Whether you\'re looking for friends or a relationship, UniVibe helps you connect.',
    },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-background text-foreground">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-0 h-72 w-72 animate-flare-1 rounded-full bg-primary/20 opacity-90 blur-[120px] filter"></div>
        <div className="absolute right-1/4 bottom-0 h-72 w-72 animate-flare-2 rounded-full bg-accent/20 opacity-90 blur-[120px] filter"></div>
      </div>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <UniVibeLogo className="h-24 w-24 text-primary" />
            </motion.div>

            <motion.h1
              className="mt-6 text-5xl md:text-7xl font-bold font-headline text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            >
              UniVibe
            </motion.h1>

            <motion.p
              className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              Find your spark on campus. Connect with classmates, discover new friends, and maybe even find love.
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              <Button
                size="lg"
                className="h-14 px-10 text-lg font-bold bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
                onClick={() => router.push('/login')}
              >
                Get Started
              </Button>
            </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-headline font-bold text-center mb-4">Why UniVibe?</h2>
                    <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                        Tired of endless swiping with no results? We use smart technology to help you make meaningful connections on campus.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-6 bg-background/50 rounded-lg shadow-lg border border-border"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-headline font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* Visuals Section */}
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true, amount: 0.5 }}
                     transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl font-headline font-bold mb-4">Beautiful Profiles, Real Connections</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        Showcase your personality with customizable profiles. Add your interests, your major, and photos that show who you really are. Our focus is on helping you find genuine connections that go beyond the screen.
                    </p>
                    <Button onClick={() => router.push('/login')} variant="outline">Join the Vibe</Button>
                </motion.div>
                <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true, amount: 0.5 }}
                     transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Image src="https://picsum.photos/600/400" alt="App Screenshot" width={600} height={400} className="rounded-lg shadow-2xl" data-ai-hint="app screenshot"/>
                </motion.div>
            </div>
        </section>

         {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
            <p className="text-muted-foreground">&copy; {new Date().getFullYear()} UniVibe. Find your people.</p>
        </footer>
      </main>
    </div>
  );
}
