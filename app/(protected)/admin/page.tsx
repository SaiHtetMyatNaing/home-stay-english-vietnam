"use client";
import dynamic from "next/dynamic";

const AdminDashboard = dynamic(() => import("@/components/admin/admin-app"), {
  ssr: false, // Required to avoid react-router related errors
});

export default function Page() {
  return <AdminDashboard />;
}