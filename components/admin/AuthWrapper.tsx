// components/admin/AuthWrapper.tsx
'use client'

import { useEffect, useState } from 'react';
import { authClient, useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function AdminAuthWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                const session = await useSession();

                if (!session.data) {
                    router.push('/sign-in');
                    return;
                }

                const canViewDashboard = await authClient.admin.hasPermission({
                    userId: session.data.user.id,
                    permissions: {
                        dashboard: ["view"],
                    },
                });

                if (!canViewDashboard.data) {
                    toast.error("You do not have permission to view this page");
                    router.push('/sign-in');
                    return;
                }

                setIsAuthorized(true);
            } catch (error) {
                router.push('/sign-in');
            } finally {
                setIsLoading(false);
            }
        };

        checkPermissions();
    }, [router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthorized) {
        return null;
    }

    return <>{children}</>;
}