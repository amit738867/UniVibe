import { AuthProvider } from '@/hooks/use-auth';
import { Toaster } from "@/components/ui/toaster"

export default function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
