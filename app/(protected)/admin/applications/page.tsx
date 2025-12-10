import ApplicationsList from "@/components/admin/applications/ApplicationsList";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ApplicationsList />
        </Suspense>
    );
}
