"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea, Toggle } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";
import type { HomeContent } from "@/lib/types";

export default function HomeManagementPage() {
  const [data, setData] = useState<HomeContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/pages/home");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          showToast("Failed to load home page content.");
        }
      } catch (error) {
        showToast("Error loading home page content.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/pages/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showToast("Home page content updated successfully");
      } else {
        showToast("Failed to save changes.");
      }
    } catch (error) {
      showToast("Error saving changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateSection = (section: keyof HomeContent, field: string, value: any) => {
    if (!data) return;
    setData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [section]: { ...(prev[section] as any), [field]: value },
      };
    });
  };

  if (isLoading) {
    return <div className="p-8 text-neutral-500">Loading content...</div>;
  }

  if (!data) {
    return <div className="p-8 text-red-500">Failed to load content. Please make sure the database is seeded.</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 font-display">Home Page</h2>
          <p className="text-neutral-500 mt-1">Manage the content and visibility of home page sections.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      {/* Hero Section */}
      <SectionCard
        title="Hero Section"
        headerAction={
          <Toggle
            checked={data.hero.isVisible}
            onChange={(v) => updateSection("hero", "isVisible", v)}
            label={data.hero.isVisible ? "Visible" : "Hidden"}
          />
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Headline">
            <Input value={data.hero.headline} onChange={(e) => updateSection("hero", "headline", e.target.value)} />
          </FormGroup>
          <FormGroup label="Badge Text (Optional)">
            <Input value={data.hero.badgeText || ""} onChange={(e) => updateSection("hero", "badgeText", e.target.value)} />
          </FormGroup>
        </div>
        <FormGroup label="Subheadline">
          <Textarea value={data.hero.subheadline} onChange={(e) => updateSection("hero", "subheadline", e.target.value)} />
        </FormGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Primary CTA Text">
            <Input value={data.hero.primaryCtaText} onChange={(e) => updateSection("hero", "primaryCtaText", e.target.value)} />
          </FormGroup>
          <FormGroup label="Primary CTA Link">
            <Input value={data.hero.primaryCtaLink} onChange={(e) => updateSection("hero", "primaryCtaLink", e.target.value)} />
          </FormGroup>
        </div>
      </SectionCard>

      {/* Intro Section */}
      <SectionCard
        title="Intro Section"
        headerAction={
          <Toggle
            checked={data.intro.isVisible}
            onChange={(v) => updateSection("intro", "isVisible", v)}
            label={data.intro.isVisible ? "Visible" : "Hidden"}
          />
        }
      >
        <FormGroup label="Heading">
          <Input value={data.intro.heading} onChange={(e) => updateSection("intro", "heading", e.target.value)} />
        </FormGroup>
        <FormGroup label="Body Paragraph">
          <Textarea value={data.intro.body} onChange={(e) => updateSection("intro", "body", e.target.value)} />
        </FormGroup>
        
        {/* Simple mock for Stats Array */}
        <FormGroup label="Stats Grid (Read-only array preview for now)">
          <div className="grid grid-cols-2 gap-4">
            {data.intro.statsItems.map((stat, i) => (
              <div key={i} className="flex gap-2">
                <Input value={stat.value} readOnly className="w-1/3 bg-neutral-100" />
                <Input value={stat.label} readOnly className="flex-1 bg-neutral-100" />
              </div>
            ))}
          </div>
        </FormGroup>
      </SectionCard>

      {/* Why Choose Us Section */}
      <SectionCard
        title="Why Choose Us Section"
        headerAction={
          <Toggle
            checked={data.whyChooseUs.isVisible}
            onChange={(v) => updateSection("whyChooseUs", "isVisible", v)}
            label={data.whyChooseUs.isVisible ? "Visible" : "Hidden"}
          />
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Heading">
            <Input value={data.whyChooseUs.heading} onChange={(e) => updateSection("whyChooseUs", "heading", e.target.value)} />
          </FormGroup>
          <FormGroup label="Subheading">
            <Input value={data.whyChooseUs.subheading} onChange={(e) => updateSection("whyChooseUs", "subheading", e.target.value)} />
          </FormGroup>
        </div>
      </SectionCard>

      {/* CTA Section */}
      <SectionCard
        title="Call to Action Band"
        headerAction={
          <Toggle
            checked={data.cta.isVisible}
            onChange={(v) => updateSection("cta", "isVisible", v)}
            label={data.cta.isVisible ? "Visible" : "Hidden"}
          />
        }
      >
        <FormGroup label="Heading">
          <Input value={data.cta.heading} onChange={(e) => updateSection("cta", "heading", e.target.value)} />
        </FormGroup>
        <FormGroup label="Subheading">
          <Textarea value={data.cta.subheading} onChange={(e) => updateSection("cta", "subheading", e.target.value)} />
        </FormGroup>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Button Text">
            <Input value={data.cta.buttonText} onChange={(e) => updateSection("cta", "buttonText", e.target.value)} />
          </FormGroup>
          <FormGroup label="Button Link">
            <Input value={data.cta.buttonLink} onChange={(e) => updateSection("cta", "buttonLink", e.target.value)} />
          </FormGroup>
        </div>
      </SectionCard>
      
      <div className="pb-10 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
