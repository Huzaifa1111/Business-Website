import type { Metadata } from "next";
import { AdminClientShell } from "@/components/admin/AdminClientShell";

export const metadata: Metadata = {
  title: "Admin Dashboard | Apex Consulting Group",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminClientShell>{children}</AdminClientShell>;
}
