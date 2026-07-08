"use client";

import { useState, useEffect } from "react";
import type { TeamMember, AboutContent } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

export default function AboutManagementPage() {
  const [data, setData] = useState<AboutContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/pages/about");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          showToast("Failed to load about page content.");
        }
      } catch (error) {
        showToast("Error loading about page content.");
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
      const res = await fetch("/api/pages/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        showToast("About page content updated successfully");
      } else {
        showToast("Failed to save changes.");
      }
    } catch (error) {
      showToast("Error saving changes.");
    } finally {
      setIsSaving(false);
    }
  };

  const removeMember = (id: string) => {
    setData((prev) => prev ? ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.id !== id)
    }) : null);
    showToast("Team member removed", "error");
  };

  const addMember = () => {
    const newMember: TeamMember = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Member",
      role: "Job Title",
      bio: "Enter a brief biography here."
    };
    setData((prev) => prev ? ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember]
    }) : null);
    showToast("New team member added to list");
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
          <h2 className="text-2xl font-bold text-neutral-900 font-display">About Page</h2>
          <p className="text-neutral-500 mt-1">Manage company overview, mission, values, and team members.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <SectionCard title="Hero Section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Eyebrow">
            <Input 
              value={data.hero.eyebrow} 
              onChange={(e) => setData(p => p ? ({ ...p, hero: { ...p.hero, eyebrow: e.target.value } }) : null)} 
            />
          </FormGroup>
          <FormGroup label="Heading">
            <Input 
              value={data.hero.heading} 
              onChange={(e) => setData(p => p ? ({ ...p, hero: { ...p.hero, heading: e.target.value } }) : null)} 
            />
          </FormGroup>
        </div>
        <FormGroup label="Subheading">
          <Textarea 
            value={data.hero.subheading} 
            onChange={(e) => setData(p => p ? ({ ...p, hero: { ...p.hero, subheading: e.target.value } }) : null)} 
            rows={3}
          />
        </FormGroup>
      </SectionCard>

      <SectionCard title="Company Overview">
        <FormGroup label="Heading">
          <Input 
            value={data.overview.heading} 
            onChange={(e) => setData(p => p ? ({ ...p, overview: { ...p.overview, heading: e.target.value } }) : null)} 
          />
        </FormGroup>
        <FormGroup label="Overview Body">
          <Textarea 
            value={data.overview.body} 
            onChange={(e) => setData(p => p ? ({ ...p, overview: { ...p.overview, body: e.target.value } }) : null)} 
            rows={5}
          />
        </FormGroup>
      </SectionCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Mission">
          <FormGroup label="Heading">
            <Input 
              value={data.mission.heading} 
              onChange={(e) => setData(p => p ? ({ ...p, mission: { ...p.mission, heading: e.target.value } }) : null)} 
            />
          </FormGroup>
          <FormGroup label="Statement">
            <Textarea 
              value={data.mission.statement} 
              onChange={(e) => setData(p => p ? ({ ...p, mission: { ...p.mission, statement: e.target.value } }) : null)} 
            />
          </FormGroup>
        </SectionCard>

        <SectionCard title="Vision">
          <FormGroup label="Heading">
            <Input 
              value={data.vision.heading} 
              onChange={(e) => setData(p => p ? ({ ...p, vision: { ...p.vision, heading: e.target.value } }) : null)} 
            />
          </FormGroup>
          <FormGroup label="Statement">
            <Textarea 
              value={data.vision.statement} 
              onChange={(e) => setData(p => p ? ({ ...p, vision: { ...p.vision, statement: e.target.value } }) : null)} 
            />
          </FormGroup>
        </SectionCard>
      </div>

      <SectionCard title="Values (What We Stand For)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup label="Heading">
            <Input 
              value={data.values.heading} 
              onChange={(e) => setData(p => p ? ({ ...p, values: { ...p.values, heading: e.target.value } }) : null)} 
            />
          </FormGroup>
          <FormGroup label="Subheading">
            <Input 
              value={data.values.subheading} 
              onChange={(e) => setData(p => p ? ({ ...p, values: { ...p.values, subheading: e.target.value } }) : null)} 
            />
          </FormGroup>
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.values.items.map((item, i) => (
            <div key={i} className="p-4 border border-neutral-200 rounded-xl bg-neutral-50 flex flex-col gap-3">
              <div className="flex gap-3">
                <div className="w-16">
                  <FormGroup label="Icon">
                    <Input 
                      value={item.icon} 
                      onChange={(e) => {
                        const newItems = [...data.values.items];
                        newItems[i].icon = e.target.value;
                        setData(p => p ? ({ ...p, values: { ...p.values, items: newItems } }) : null);
                      }} 
                    />
                  </FormGroup>
                </div>
                <FormGroup label="Title" className="flex-1">
                  <Input 
                    value={item.title} 
                    onChange={(e) => {
                      const newItems = [...data.values.items];
                      newItems[i].title = e.target.value;
                      setData(p => p ? ({ ...p, values: { ...p.values, items: newItems } }) : null);
                    }} 
                  />
                </FormGroup>
              </div>
              <FormGroup label="Description">
                <Textarea 
                  value={item.description} 
                  rows={2}
                  onChange={(e) => {
                    const newItems = [...data.values.items];
                    newItems[i].description = e.target.value;
                    setData(p => p ? ({ ...p, values: { ...p.values, items: newItems } }) : null);
                  }} 
                />
              </FormGroup>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard 
        title="Team Members" 
        description="Manage the core team shown on the about page."
        headerAction={<Button onClick={addMember} size="sm" variant="outline">+ Add Member</Button>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.teamMembers.map((member, i) => (
            <div key={member.id} className="border border-neutral-200 p-4 rounded-xl flex gap-4 bg-neutral-50 relative group">
              <div className="w-16 h-16 rounded-lg bg-neutral-200 flex items-center justify-center flex-shrink-0 text-xl mt-1">
                👤
              </div>
              <div className="flex-1 min-w-0">
                {editingMemberId === member.id ? (
                  <div className="flex flex-col gap-2">
                    <Input 
                      value={member.name}
                      onChange={(e) => {
                        const newMembers = [...data.teamMembers];
                        newMembers[i].name = e.target.value;
                        setData(p => p ? ({ ...p, teamMembers: newMembers }) : null);
                      }}
                      placeholder="Name"
                    />
                    <Input 
                      value={member.role}
                      onChange={(e) => {
                        const newMembers = [...data.teamMembers];
                        newMembers[i].role = e.target.value;
                        setData(p => p ? ({ ...p, teamMembers: newMembers }) : null);
                      }}
                      placeholder="Role"
                    />
                    <Textarea 
                      value={member.bio}
                      rows={3}
                      onChange={(e) => {
                        const newMembers = [...data.teamMembers];
                        newMembers[i].bio = e.target.value;
                        setData(p => p ? ({ ...p, teamMembers: newMembers }) : null);
                      }}
                      placeholder="Bio"
                    />
                    <div className="flex gap-2 mt-1">
                      <Button size="sm" onClick={() => setEditingMemberId(null)}>Done</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="font-semibold text-neutral-900 truncate">{member.name}</p>
                    <p className="text-sm text-neutral-500 mb-2 truncate">{member.role}</p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setEditingMemberId(member.id)}
                        className="text-xs font-semibold text-primary-600 hover:text-primary-700"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => removeMember(member.id)}
                        className="text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </>
                )}
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
