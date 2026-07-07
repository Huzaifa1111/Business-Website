"use client";

import { useState } from "react";
import { aboutData } from "@/lib/dummy-data/about";
import type { TeamMember } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

export default function AboutManagementPage() {
  const [data, setData] = useState(aboutData);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSaving(false);
    showToast("About page content updated successfully");
  };

  const removeMember = (id: string) => {
    setData((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.id !== id)
    }));
    showToast("Team member removed", "error");
  };

  const addMember = () => {
    const newMember: TeamMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Member",
      role: "Job Title",
      bio: "Enter a brief biography here."
    };
    setData((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember]
    }));
    showToast("New team member added to list");
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 font-display">About Page</h2>
          <p className="text-neutral-500 mt-1">Manage company overview, mission, values, and team members.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <SectionCard title="Company Overview">
        <FormGroup label="Heading">
          <Input 
            value={data.overview.heading} 
            onChange={(e) => setData(p => ({ ...p, overview: { ...p.overview, heading: e.target.value } }))} 
          />
        </FormGroup>
        <FormGroup label="Overview Body">
          <Textarea 
            value={data.overview.body} 
            onChange={(e) => setData(p => ({ ...p, overview: { ...p.overview, body: e.target.value } }))} 
            rows={5}
          />
        </FormGroup>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Mission">
          <FormGroup label="Heading">
            <Input 
              value={data.mission.heading} 
              onChange={(e) => setData(p => ({ ...p, mission: { ...p.mission, heading: e.target.value } }))} 
            />
          </FormGroup>
          <FormGroup label="Statement">
            <Textarea 
              value={data.mission.statement} 
              onChange={(e) => setData(p => ({ ...p, mission: { ...p.mission, statement: e.target.value } }))} 
            />
          </FormGroup>
        </SectionCard>

        <SectionCard title="Vision">
          <FormGroup label="Heading">
            <Input 
              value={data.vision.heading} 
              onChange={(e) => setData(p => ({ ...p, vision: { ...p.vision, heading: e.target.value } }))} 
            />
          </FormGroup>
          <FormGroup label="Statement">
            <Textarea 
              value={data.vision.statement} 
              onChange={(e) => setData(p => ({ ...p, vision: { ...p.vision, statement: e.target.value } }))} 
            />
          </FormGroup>
        </SectionCard>
      </div>

      <SectionCard 
        title="Team Members" 
        description="Manage the core team shown on the about page."
        headerAction={<Button onClick={addMember} size="sm" variant="outline">+ Add Member</Button>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.teamMembers.map((member) => (
            <div key={member.id} className="border border-neutral-200 p-4 rounded-xl flex gap-4 bg-neutral-50 relative group">
              <div className="w-16 h-16 rounded-lg bg-neutral-200 flex items-center justify-center flex-shrink-0 text-xl">
                👤
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-neutral-900 truncate">{member.name}</p>
                <p className="text-sm text-neutral-500 mb-2 truncate">{member.role}</p>
                <div className="flex gap-2">
                  <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">Edit</button>
                  <button 
                    onClick={() => removeMember(member.id)}
                    className="text-xs font-semibold text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          {data.teamMembers.length === 0 && (
            <div className="col-span-full py-8 text-center text-neutral-500 text-sm">
              No team members added. Click &quot;+ Add Member&quot; to begin.
            </div>
          )}
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
