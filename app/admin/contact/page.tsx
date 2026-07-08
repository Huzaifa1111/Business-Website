"use client";

import { useState, useEffect } from "react";
import type { ContactInfo } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

export default function ContactManagementPage() {
  const [data, setData] = useState<ContactInfo | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/pages/contact");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          showToast("Failed to load contact page content.");
        }
      } catch (error) {
        showToast("Error loading contact page content.");
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
      const res = await fetch("/api/pages/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showToast("Contact details updated successfully");
      } else {
        showToast("Failed to save changes.");
      }
    } catch (error) {
      showToast("Error saving changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateAddress = (field: keyof typeof data.address, val: string) => {
    setData((p) => (p ? { ...p, address: { ...p.address, [field]: val } } : null));
  };

  const updateHours = (day: keyof typeof data.businessHours, val: string) => {
    setData((p) => (p ? { ...p, businessHours: { ...p.businessHours, [day]: val } } : null));
  };

  const updateSocial = (platform: keyof typeof data.socialLinks, val: string) => {
    setData((p) => (p ? { ...p, socialLinks: { ...p.socialLinks, [platform]: val } } : null));
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
          <h2 className="text-2xl font-bold text-neutral-900 font-display">Contact Info</h2>
          <p className="text-neutral-500 mt-1">Manage physical locations, digital contacts, and social links.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <SectionCard title="Hero Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Eyebrow">
            <Input 
              value={data.hero?.eyebrow || ""} 
              onChange={(e) => setData(p => p ? ({ ...p, hero: { ...p.hero, eyebrow: e.target.value } }) : null)} 
            />
          </FormGroup>
          <FormGroup label="Heading">
            <Input 
              value={data.hero?.heading || ""} 
              onChange={(e) => setData(p => p ? ({ ...p, hero: { ...p.hero, heading: e.target.value } }) : null)} 
            />
          </FormGroup>
        </div>
        <FormGroup label="Subheading">
          <Textarea 
            value={data.hero?.subheading || ""} 
            onChange={(e) => setData(p => p ? ({ ...p, hero: { ...p.hero, subheading: e.target.value } }) : null)} 
            rows={2}
          />
        </FormGroup>
      </SectionCard>

      <SectionCard title="Form Section text">
        <FormGroup label="Heading">
          <Input 
            value={data.form?.heading || ""} 
            onChange={(e) => setData(p => p ? ({ ...p, form: { ...p.form, heading: e.target.value } }) : null)} 
          />
        </FormGroup>
        <FormGroup label="Subheading">
          <Textarea 
            value={data.form?.subheading || ""} 
            onChange={(e) => setData(p => p ? ({ ...p, form: { ...p.form, subheading: e.target.value } }) : null)} 
            rows={2}
          />
        </FormGroup>
      </SectionCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-6">
          <SectionCard title="Primary Address">
            <FormGroup label="Street">
              <Input value={data.address.street} onChange={e => updateAddress("street", e.target.value)} />
            </FormGroup>
            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="City">
                <Input value={data.address.city} onChange={e => updateAddress("city", e.target.value)} />
              </FormGroup>
              <FormGroup label="State / Province">
                <Input value={data.address.state} onChange={e => updateAddress("state", e.target.value)} />
              </FormGroup>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormGroup label="Postal Code">
                <Input value={data.address.postalCode} onChange={e => updateAddress("postalCode", e.target.value)} />
              </FormGroup>
              <FormGroup label="Country">
                <Input value={data.address.country} onChange={e => updateAddress("country", e.target.value)} />
              </FormGroup>
            </div>
            <FormGroup label="Map Embed URL" description="Src URL for Google Maps iframe">
              <Textarea value={data.mapEmbedUrl} onChange={e => setData(p => p ? ({ ...p, mapEmbedUrl: e.target.value }) : null)} rows={2} />
            </FormGroup>
          </SectionCard>

          <SectionCard title="Contact Methods">
            <FormGroup label="Primary Email">
              <Input type="email" value={data.email} onChange={e => setData(p => p ? ({ ...p, email: e.target.value }) : null)} />
            </FormGroup>
            
            {data.phones.map((phone, i) => (
              <FormGroup key={i} label={`Phone ${i+1}`}>
                <div className="flex gap-2">
                  <Input 
                    value={phone.label} 
                    className="w-1/3" 
                    onChange={e => {
                      const newPhones = [...data.phones];
                      newPhones[i].label = e.target.value;
                      setData(p => p ? ({ ...p, phones: newPhones }) : null);
                    }} 
                  />
                  <Input 
                    value={phone.number} 
                    onChange={e => {
                      const newPhones = [...data.phones];
                      newPhones[i].number = e.target.value;
                      setData(p => p ? ({ ...p, phones: newPhones }) : null);
                    }} 
                  />
                  <Button variant="ghost" className="text-red-500 px-3" onClick={() => {
                    const newPhones = [...data.phones];
                    newPhones.splice(i, 1);
                    setData(p => p ? ({ ...p, phones: newPhones }) : null);
                  }}>X</Button>
                </div>
              </FormGroup>
            ))}
            <Button size="sm" variant="outline" onClick={() => {
              const newPhones = [...data.phones, { label: "New Phone", number: "+1" }];
              setData(p => p ? ({ ...p, phones: newPhones }) : null);
            }}>+ Add Phone</Button>
            
          </SectionCard>
        </div>

        <div className="flex flex-col gap-6">
          <SectionCard title="Business Hours">
            {(Object.keys(data.businessHours) as Array<keyof typeof data.businessHours>).map(day => (
              <FormGroup key={day} label={<span className="capitalize">{day}</span> as any}>
                <Input value={data.businessHours[day]} onChange={e => updateHours(day, e.target.value)} />
              </FormGroup>
            ))}
          </SectionCard>

          <SectionCard title="Social Links">
            {(["linkedin", "twitter", "facebook", "instagram", "youtube"] as Array<keyof typeof data.socialLinks>).map(platform => (
              <FormGroup key={platform} label={<span className="capitalize">{platform}</span> as any}>
                <Input 
                  value={data.socialLinks[platform] || ""} 
                  onChange={e => updateSocial(platform, e.target.value)} 
                  placeholder={`https://${platform}.com/...`}
                />
              </FormGroup>
            ))}
          </SectionCard>
        </div>
      </div>
      
      <div className="pb-10 flex justify-end">
        <Button onClick={handleSave} disabled={isSaving} size="lg">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
