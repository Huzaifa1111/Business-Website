"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { ToastProvider } from "./ToastContext";

export function AdminClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Check mock auth in localStorage
    const authStatus = localStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
      if (isLoginPage) {
        // Redirect away from login if already authed
        router.push("/admin");
      }
    } else {
      setIsAuthenticated(false);
      if (!isLoginPage) {
        // Redirect to login if trying to access dashboard
        router.push("/admin/login");
      }
    }
    setIsAuthChecking(false);
  }, [pathname, isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  // Prevent flash of content while checking auth on client side
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
      </div>
    );
  }

  // Render just the page content if it's the login page
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Render the full dashboard shell
  if (!isAuthenticated) return null; // Will redirect via useEffect

  // Generate a page title based on the pathname
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
