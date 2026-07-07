"use client";

import { useState } from "react";
import { homeData } from "@/lib/dummy-data/home";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea, Toggle } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

export default function HomeManagementPage() {
  const [data, setData] = useState(homeData);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    showToast("Home page content updated successfully");
  };

  const updateSection = (section: keyof typeof data, field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

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
