"use client";

import { useState } from "react";
import { seoData } from "@/lib/dummy-data/seo";
import type { SEOFields } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea, Toggle } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

type PageKey = keyof typeof seoData;

export default function SeoManagementPage() {
  const [data, setData] = useState(seoData);
  const [activeTab, setActiveTab] = useState<PageKey>("home");
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setIsSaving(false);
    showToast("SEO configuration saved globally");
  };

  const updateField = (field: keyof SEOFields, value: any) => {
    setData((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [field]: value,
      }
    }));
  };

  const currentSeo = data[activeTab];

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 font-display">SEO & Meta Options</h2>
          <p className="text-neutral-500 mt-1">Manage global scripts and per-page meta data.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left column: Global & Page selector */}
        <div className="flex flex-col gap-6">
          <SectionCard title="Global Settings">
            <FormGroup label="Google Analytics ID">
              <Input placeholder="G-XXXXXXXXXX" />
            </FormGroup>
            <FormGroup label="<head> Scripts" description="e.g. Google Tag Manager">
              <Textarea placeholder="<!-- Google Tag Manager -->..." rows={4} />
            </FormGroup>
            <div className="mt-2 text-xs text-neutral-500 p-3 bg-neutral-100 rounded-lg border border-neutral-200">
              <span className="font-semibold text-neutral-700">Notice:</span> sitemap.xml and robots.txt are generated dynamically based on your Next.js configuration.
            </div>
          </SectionCard>
          
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden p-2 flex flex-col gap-1">
            <p className="text-xs font-semibold text-neutral-500 px-3 pt-2 pb-1 uppercase tracking-wider">Page Selector</p>
            {(Object.keys(data) as PageKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === key 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                <span className="capitalize">{key}</span> Page
              </button>
            ))}
          </div>
        </div>

        {/* Right column: Per-page fields */}
        <div className="lg:col-span-2">
          <SectionCard title={`Editing: ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Page`}>
            
            <div className="flex gap-4 mb-6 pb-6 border-b border-neutral-100">
              <div className="flex-1">
                <Toggle 
                  label="No-Index (Hide from Search Engines)" 
                  checked={currentSeo.noIndex || false}
                  onChange={(c) => updateField("noIndex", c)}
                />
              </div>
              <div className="flex-1">
                <Toggle 
                  label="No-Follow (Hide Links)" 
                  checked={currentSeo.noFollow || false}
                  onChange={(c) => updateField("noFollow", c)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-8">
              <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest text-primary-600 mb-2">Standard Meta</h4>
              <FormGroup label="Meta Title">
                <Input 
                  value={currentSeo.metaTitle} 
                  onChange={(e) => updateField("metaTitle", e.target.value)} 
                />
              </FormGroup>
              <FormGroup label="Meta Description">
                <Textarea 
                  value={currentSeo.metaDescription} 
                  onChange={(e) => updateField("metaDescription", e.target.value)}
                  rows={3}
                />
              </FormGroup>
              <FormGroup label="Canonical URL">
                <Input 
                  value={currentSeo.canonicalUrl || ""} 
                  onChange={(e) => updateField("canonicalUrl", e.target.value)} 
                  placeholder="https://apexconsulting.com/..."
                />
              </FormGroup>
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-bold text-neutral-900 uppercase tracking-widest text-primary-600 mb-2">Social / OpenGraph Meta</h4>
              
              <FormGroup label="OG Title (Optional)">
                <Input 
                  value={currentSeo.ogTitle || ""} 
                  onChange={(e) => updateField("ogTitle", e.target.value)}
                  placeholder="Defaults to Meta Title"
                />
              </FormGroup>
              <FormGroup label="OG Description (Optional)">
                <Textarea 
                  value={currentSeo.ogDescription || ""} 
                  onChange={(e) => updateField("ogDescription", e.target.value)}
                  rows={2}
                  placeholder="Defaults to Meta Description"
                />
              </FormGroup>
              <FormGroup label="Social Share Image URL">
                <Input 
                  value={currentSeo.ogImage || ""} 
                  onChange={(e) => updateField("ogImage", e.target.value)}
                  placeholder="https://.../og-image.jpg"
                />
              </FormGroup>
            </div>

          </SectionCard>
        </div>
        
      </div>
    </div>
  );
}
