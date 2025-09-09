import { AuthProvider } from '@/hooks/use-auth';

export default function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
