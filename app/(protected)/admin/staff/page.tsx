import StaffManagement from "@/components/admin/staff/StaffManagement";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StaffManagement />
        </Suspense>
    );
}
