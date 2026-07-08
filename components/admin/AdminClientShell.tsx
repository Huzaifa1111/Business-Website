"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ToastProvider } from "./ToastContext";
import { SessionProvider, useSession, signOut } from "next-auth/react";

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/admin/login" || pathname === "/admin/signup";
  const isLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && isLoginPage) {
        router.push("/admin");
      } else if (!isAuthenticated && !isLoginPage) {
        router.push("/admin/login");
      }
    }
  }, [isLoading, isAuthenticated, isLoginPage, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/admin/login" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) return null;

  const lastSegment = pathname.split("/").pop() || "";
  const pageTitle = pathname === "/admin" 
    ? "Dashboard" 
    : lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1) + " Management";

  return (
    <ToastProvider>
      <div className="min-h-screen bg-neutral-50 flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          setIsOpen={setSidebarOpen} 
          onLogout={handleLogout} 
        />
        
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar 
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
            pageTitle={pageTitle}
          />
          
          <main className="flex-1 p-6 lg:p-8 overflow-auto">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}

export function AdminClientShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ShellInner>{children}</ShellInner>
    </SessionProvider>
  );
}
