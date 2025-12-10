import EditApplication from "@/components/admin/applications/EditApplication"; // Re-trigger build
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditApplication />
        </Suspense>
    );
}
