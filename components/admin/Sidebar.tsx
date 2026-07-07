"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: "📊" },
  { label: "Home Management", href: "/admin/home", icon: "🏠" },
  { label: "About Management", href: "/admin/about", icon: "🏢" },
  { label: "Services Management", href: "/admin/services", icon: "⚙️" },
  { label: "Contact Management", href: "/admin/contact", icon: "📞" },
  { label: "Media Library", href: "/admin/media", icon: "🖼️" },
  { label: "SEO Settings", href: "/admin/seo", icon: "🔍" },
  { label: "Settings", href: "/admin/settings", icon: "🔧" },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

export function Sidebar({ isOpen, setIsOpen, onLogout }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [pathname, isMobile, setIsOpen]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-neutral-900/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen bg-neutral-950 text-neutral-300 flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : isMobile ? "-translate-x-full" : "w-20"
        } overflow-hidden`}
      >
        {/* Logo area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800">
          <Link
            href={"/admin" as any}
            className={`flex items-center gap-3 transition-opacity ${
              !isOpen && !isMobile ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
              A.
            </div>
            <span className="font-bold text-white tracking-wide uppercase text-sm">
              Apex Admin
            </span>
          </Link>

          {!isOpen && !isMobile && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-sm">
                A.
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href as any}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary-600 text-white"
                    : "hover:bg-neutral-800 hover:text-white"
                } ${!isOpen && !isMobile ? "justify-center" : ""}`}
                title={!isOpen && !isMobile ? item.label : undefined}
              >
                <span className="text-lg">{item.icon}</span>
                <span
                  className={`text-sm font-medium whitespace-nowrap ${
                    !isOpen && !isMobile ? "hidden" : "block"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-3 border-t border-neutral-800">
          <button
            onClick={onLogout}
            className={`flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors ${
              !isOpen && !isMobile ? "justify-center" : ""
            }`}
            title={!isOpen && !isMobile ? "Logout" : undefined}
          >
            <span className="text-lg">🚪</span>
            <span
              className={`text-sm font-medium whitespace-nowrap ${
                !isOpen && !isMobile ? "hidden" : "block"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
