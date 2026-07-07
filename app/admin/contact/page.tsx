"use client";

import { useState } from "react";
import { contactData } from "@/lib/dummy-data/contact";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

export default function ContactManagementPage() {
  const [data, setData] = useState(contactData);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSaving(false);
    showToast("Contact details updated successfully");
  };

  const updateAddress = (field: keyof typeof data.address, val: string) => {
    setData((p) => ({ ...p, address: { ...p.address, [field]: val } }));
  };

  const updateHours = (day: keyof typeof data.businessHours, val: string) => {
    setData((p) => ({ ...p, businessHours: { ...p.businessHours, [day]: val } }));
  };

  const updateSocial = (platform: keyof typeof data.socialLinks, val: string) => {
    setData((p) => ({ ...p, socialLinks: { ...p.socialLinks, [platform]: val } }));
  };

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
              <Textarea value={data.mapEmbedUrl} onChange={e => setData(p => ({ ...p, mapEmbedUrl: e.target.value }))} rows={2} />
            </FormGroup>
          </SectionCard>

          <SectionCard title="Contact Methods">
            <FormGroup label="Primary Email">
              <Input type="email" value={data.email} onChange={e => setData(p => ({ ...p, email: e.target.value }))} />
            </FormGroup>
            {/* Displaying first phone for mock purposes */}
            <FormGroup label="Primary Phone">
              <div className="flex gap-2">
                <Input value={data.phones[0].label} className="w-1/3" readOnly />
                <Input value={data.phones[0].number} onChange={e => {
                  const newPhones = [...data.phones];
                  newPhones[0].number = e.target.value;
                  setData(p => ({ ...p, phones: newPhones }));
                }} />
              </div>
            </FormGroup>
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
            {(Object.keys(data.socialLinks) as Array<keyof typeof data.socialLinks>).map(platform => (
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
    </div>
  );
}
