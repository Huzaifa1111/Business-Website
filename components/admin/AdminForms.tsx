"use client";

import { ReactNode } from "react";

export function SectionCard({ title, description, children, headerAction }: { title: string; description?: string; children: ReactNode; headerAction?: ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden mb-6">
      <div className="px-6 py-5 border-b border-neutral-200 bg-neutral-50/50 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900">{title}</h3>
          {description && <p className="text-sm text-neutral-500 mt-0.5">{description}</p>}
        </div>
        {headerAction && <div>{headerAction}</div>}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

export function FormGroup({ label, description, htmlFor, children }: { label: string; description?: string; htmlFor?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 mb-5 last:mb-0">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-neutral-700">
        {label}
      </label>
      {description && <p className="text-xs text-neutral-500 mb-1">{description}</p>}
      {children}
    </div>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all ${props.className || ""}`}
    />
  );
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full px-4 py-3 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-900 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:bg-white transition-all resize-y min-h-[100px] ${props.className || ""}`}
    />
  );
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (checked: boolean) => void; label?: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-400 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
      </div>
      {label && <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">{label}</span>}
    </label>
  );
}
