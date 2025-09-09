
import AppLayout from '@/components/app-layout';

export default function ProtectedRoutesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AppLayout>{children}</AppLayout>;
}
