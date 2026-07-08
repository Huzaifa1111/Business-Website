"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Service, ServicesPageContent, ProcessStep } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea, Toggle } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

// ─── Draggable Sortable Service Item ───
function SortableServiceItem({ service, onEdit, onDelete }: { service: Service; onEdit: () => void; onDelete: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: service.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-white border border-neutral-200 rounded-xl mb-3 shadow-sm group"
    >
      <button 
        {...attributes} 
        {...listeners} 
        className="cursor-grab p-1 text-neutral-400 hover:text-neutral-900 active:cursor-grabbing"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </button>
      
      <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
        {service.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-neutral-900 flex items-center gap-2">
          {service.title}
          {service.isFeatured && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-100 text-primary-700 uppercase">Featured</span>}
        </h4>
        <p className="text-sm text-neutral-500 truncate">{service.description}</p>
      </div>

      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" onClick={onEdit}>Edit</Button>
        <button onClick={onDelete} className="px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          Delete
        </button>
      </div>
    </div>
  );
}

// ─── Empty service template ───
function createEmptyService(order: number): Service {
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: "",
    description: "",
    icon: "✨",
    features: [],
    ctaText: "",
    ctaLink: "",
    order,
    isFeatured: false,
  };
}

// ─── Service Edit Modal ───
function ServiceEditModal({
  service,
  onSave,
  onClose,
  isNew,
}: {
  service: Service;
  onSave: (service: Service) => void;
  onClose: () => void;
  isNew: boolean;
}) {
  const [formData, setFormData] = useState<Service>(service);
  const [featuresText, setFeaturesText] = useState(
    (service.features || []).join("\n")
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const features = featuresText
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    onSave({ ...formData, features });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-5 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
          <h3 className="font-bold text-lg">{isNew ? "Add Service" : "Edit Service"}</h3>
          <button onClick={onClose} className="text-neutral-400 hover:text-neutral-900 text-2xl leading-none">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-16">
              <FormGroup label="Icon">
                <Input 
                  value={formData.icon} 
                  onChange={(e) => setFormData({...formData, icon: e.target.value})} 
                  className="text-center text-xl px-0" 
                />
              </FormGroup>
            </div>
            <div className="flex-1">
              <FormGroup label="Title">
                <Input 
                  value={formData.title} 
                  onChange={(e) => setFormData({...formData, title: e.target.value})} 
                  placeholder="e.g. Strategic Advisory"
                  required
                />
              </FormGroup>
            </div>
          </div>
          
          <FormGroup label="Description">
            <Textarea 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              rows={3} 
              required
            />
          </FormGroup>

          <FormGroup label="Features" description="One feature per line">
            <Textarea 
              value={featuresText} 
              onChange={(e) => setFeaturesText(e.target.value)} 
              rows={4} 
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
          </FormGroup>

          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="CTA Text">
              <Input 
                value={formData.ctaText || ""} 
                onChange={(e) => setFormData({...formData, ctaText: e.target.value})} 
                placeholder="e.g. Learn More"
              />
            </FormGroup>
            <FormGroup label="CTA Link">
              <Input 
                value={formData.ctaLink || ""} 
                onChange={(e) => setFormData({...formData, ctaLink: e.target.value})} 
                placeholder="/services/..."
              />
            </FormGroup>
          </div>
          
          <Toggle 
            label="Feature on Homepage" 
            checked={formData.isFeatured || false}
            onChange={(c) => setFormData({...formData, isFeatured: c})}
          />

          <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-neutral-100">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save Service</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ───
export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [pageContent, setPageContent] = useState<ServicesPageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [activeTab, setActiveTab] = useState<"services" | "page">("services");
  const { showToast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // ── Fetch all data on mount ──
  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesRes, pageRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/pages/services"),
        ]);

        if (servicesRes.ok) {
          const servicesJson = await servicesRes.json();
          setServices(servicesJson.sort((a: Service, b: Service) => a.order - b.order));
        }

        if (pageRes.ok) {
          const pageJson = await pageRes.json();
          setPageContent(pageJson);
        }
      } catch (error) {
        showToast("Error loading services data.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // ── Service CRUD ──
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = services.findIndex((i) => i.id === active.id);
      const newIndex = services.findIndex((i) => i.id === over.id);
      const reordered = arrayMove(services, oldIndex, newIndex).map((item, index) => ({
        ...item,
        order: index,
      }));
      setServices(reordered);

      // Persist order changes
      try {
        await Promise.all(
          reordered.map((s) =>
            fetch(`/api/services/${s.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ order: s.order }),
            })
          )
        );
        showToast("Order updated", "success");
      } catch {
        showToast("Failed to save order.");
      }
    }
  };

  const handleDeleteService = async (id: string) => {
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        setServices((items) => items.filter((s) => s.id !== id));
        showToast("Service deleted", "error");
      } else {
        showToast("Failed to delete service.");
      }
    } catch {
      showToast("Error deleting service.");
    }
  };

  const handleSaveService = async (service: Service) => {
    if (isAddingService) {
      // Create new service
      try {
        const res = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(service),
        });
        if (res.ok) {
          const created = await res.json();
          setServices((prev) => [...prev, created].sort((a, b) => a.order - b.order));
          showToast("New service added!");
        } else {
          showToast("Failed to add service.");
        }
      } catch {
        showToast("Error adding service.");
      }
    } else {
      // Update existing service
      try {
        const res = await fetch(`/api/services/${service.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(service),
        });
        if (res.ok) {
          const updated = await res.json();
          setServices((prev) =>
            prev.map((s) => (s.id === service.id ? { ...service, ...updated } : s))
          );
          showToast("Service updated!");
        } else {
          showToast("Failed to update service.");
        }
      } catch {
        showToast("Error updating service.");
      }
    }
    setEditingService(null);
    setIsAddingService(false);
  };

  // ── Page Content Save ──
  const handleSavePageContent = async () => {
    if (!pageContent) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/pages/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pageContent),
      });
      if (res.ok) {
        showToast("Services page content updated successfully");
      } else {
        showToast("Failed to save page content.");
      }
    } catch {
      showToast("Error saving page content.");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Process Steps CRUD ──
  const addProcessStep = () => {
    if (!pageContent) return;
    const stepNum = String(pageContent.process.steps.length + 1).padStart(2, "0");
    const newStep: ProcessStep = {
      step: stepNum,
      title: "New Step",
      description: "Description of this step.",
    };
    setPageContent({
      ...pageContent,
      process: {
        ...pageContent.process,
        steps: [...pageContent.process.steps, newStep],
      },
    });
  };

  const removeProcessStep = (index: number) => {
    if (!pageContent) return;
    const newSteps = pageContent.process.steps
      .filter((_, i) => i !== index)
      .map((s, i) => ({ ...s, step: String(i + 1).padStart(2, "0") }));
    setPageContent({
      ...pageContent,
      process: { ...pageContent.process, steps: newSteps },
    });
  };

  const updateProcessStep = (index: number, field: keyof ProcessStep, value: string) => {
    if (!pageContent) return;
    const newSteps = [...pageContent.process.steps];
    newSteps[index] = { ...newSteps[index], [field]: value };
    setPageContent({
      ...pageContent,
      process: { ...pageContent.process, steps: newSteps },
    });
  };

  // ── Loading / Error states ──
  if (isLoading) {
    return <div className="p-8 text-neutral-500">Loading services data...</div>;
  }

  if (!pageContent) {
    return <div className="p-8 text-red-500">Failed to load page content. Please ensure the database is accessible.</div>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 font-display">Services</h2>
          <p className="text-neutral-500 mt-1">Manage services and page content from here.</p>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-neutral-100 rounded-xl p-1 w-fit">
        <button
          onClick={() => setActiveTab("services")}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "services"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Service Items
        </button>
        <button
          onClick={() => setActiveTab("page")}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === "page"
              ? "bg-white text-neutral-900 shadow-sm"
              : "text-neutral-500 hover:text-neutral-700"
          }`}
        >
          Page Content
        </button>
      </div>

      {/* ────────────────────────────────────────── */}
      {/* ── TAB: Service Items                   ── */}
      {/* ────────────────────────────────────────── */}
      {activeTab === "services" && (
        <>
          <div className="flex justify-end">
            <Button onClick={() => { setIsAddingService(true); setEditingService(createEmptyService(services.length)); }}>
              + Add Service
            </Button>
          </div>

          <SectionCard title="All Services" description="Drag to reorder how they appear on the site.">
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={services.map(s => s.id)} strategy={verticalListSortingStrategy}>
                <div className="flex flex-col">
                  {services.map((service) => (
                    <SortableServiceItem 
                      key={service.id} 
                      service={service} 
                      onEdit={() => { setEditingService(service); setIsAddingService(false); }}
                      onDelete={() => handleDeleteService(service.id)}
                    />
                  ))}
                  {services.length === 0 && (
                    <div className="py-12 text-center text-neutral-500 text-sm">
                      No services yet. Click &quot;+ Add Service&quot; to create one.
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </SectionCard>
        </>
      )}

      {/* ────────────────────────────────────────── */}
      {/* ── TAB: Page Content                    ── */}
      {/* ────────────────────────────────────────── */}
      {activeTab === "page" && (
        <>
          <div className="flex justify-end">
            <Button onClick={handleSavePageContent} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Page Content"}
            </Button>
          </div>

          {/* Hero Section */}
          <SectionCard title="Hero Section" description="The banner at the top of the services page.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup label="Eyebrow">
                <Input
                  value={pageContent.hero.eyebrow}
                  onChange={(e) =>
                    setPageContent((p) =>
                      p ? { ...p, hero: { ...p.hero, eyebrow: e.target.value } } : null
                    )
                  }
                />
              </FormGroup>
              <FormGroup label="Heading">
                <Input
                  value={pageContent.hero.heading}
                  onChange={(e) =>
                    setPageContent((p) =>
                      p ? { ...p, hero: { ...p.hero, heading: e.target.value } } : null
                    )
                  }
                />
              </FormGroup>
            </div>
            <FormGroup label="Subheading">
              <Textarea
                value={pageContent.hero.subheading}
                onChange={(e) =>
                  setPageContent((p) =>
                    p ? { ...p, hero: { ...p.hero, subheading: e.target.value } } : null
                  )
                }
                rows={3}
              />
            </FormGroup>
          </SectionCard>

          {/* Process / Engagement Model Section */}
          <SectionCard
            title="Engagement Model (Process Steps)"
            description="The step-by-step process shown on the page."
            headerAction={
              <Button onClick={addProcessStep} size="sm" variant="outline">
                + Add Step
              </Button>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <FormGroup label="Section Eyebrow">
                <Input
                  value={pageContent.process.eyebrow}
                  onChange={(e) =>
                    setPageContent((p) =>
                      p
                        ? { ...p, process: { ...p.process, eyebrow: e.target.value } }
                        : null
                    )
                  }
                />
              </FormGroup>
              <FormGroup label="Section Heading">
                <Input
                  value={pageContent.process.heading}
                  onChange={(e) =>
                    setPageContent((p) =>
                      p
                        ? { ...p, process: { ...p.process, heading: e.target.value } }
                        : null
                    )
                  }
                />
              </FormGroup>
            </div>
            <FormGroup label="Section Subheading">
              <Textarea
                value={pageContent.process.subheading}
                onChange={(e) =>
                  setPageContent((p) =>
                    p
                      ? { ...p, process: { ...p.process, subheading: e.target.value } }
                      : null
                  )
                }
                rows={2}
              />
            </FormGroup>

            <div className="mt-6 space-y-4">
              <p className="text-sm font-semibold text-neutral-700">Steps</p>
              {pageContent.process.steps.map((step, i) => (
                <div
                  key={i}
                  className="p-4 border border-neutral-200 rounded-xl bg-neutral-50 flex flex-col gap-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                      Step {step.step}
                    </span>
                    <button
                      onClick={() => removeProcessStep(i)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormGroup label="Step Number">
                      <Input
                        value={step.step}
                        onChange={(e) => updateProcessStep(i, "step", e.target.value)}
                        placeholder="01"
                      />
                    </FormGroup>
                    <FormGroup label="Title">
                      <Input
                        value={step.title}
                        onChange={(e) => updateProcessStep(i, "title", e.target.value)}
                        placeholder="Discovery Call"
                      />
                    </FormGroup>
                  </div>
                  <FormGroup label="Description">
                    <Textarea
                      value={step.description}
                      onChange={(e) => updateProcessStep(i, "description", e.target.value)}
                      rows={2}
                    />
                  </FormGroup>
                </div>
              ))}
              {pageContent.process.steps.length === 0 && (
                <div className="py-8 text-center text-neutral-500 text-sm">
                  No process steps added. Click &quot;+ Add Step&quot; to begin.
                </div>
              )}
            </div>
          </SectionCard>

          {/* Bottom CTA Section */}
          <SectionCard title="Bottom CTA Section" description="The call-to-action area at the bottom of the services page.">
            <FormGroup label="Heading">
              <Input
                value={pageContent.cta.heading}
                onChange={(e) =>
                  setPageContent((p) =>
                    p ? { ...p, cta: { ...p.cta, heading: e.target.value } } : null
                  )
                }
              />
            </FormGroup>
            <FormGroup label="Subheading">
              <Textarea
                value={pageContent.cta.subheading}
                onChange={(e) =>
                  setPageContent((p) =>
                    p ? { ...p, cta: { ...p.cta, subheading: e.target.value } } : null
                  )
                }
                rows={2}
              />
            </FormGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormGroup label="Primary Button Text">
                <Input
                  value={pageContent.cta.primaryButtonText}
                  onChange={(e) =>
                    setPageContent((p) =>
                      p ? { ...p, cta: { ...p.cta, primaryButtonText: e.target.value } } : null
                    )
                  }
                />
              </FormGroup>
              <FormGroup label="Primary Button Link">
                <Input
                  value={pageContent.cta.primaryButtonLink}
                  onChange={(e) =>
                    setPageContent((p) =>
                      p ? { ...p, cta: { ...p.cta, primaryButtonLink: e.target.value } } : null
                    )
                  }
                />
              </FormGroup>
              <FormGroup label="Secondary Button Text">
                <Input
                  value={pageContent.cta.secondaryButtonText}
                  onChange={(e) =>
                    setPageContent((p) =>
                      p ? { ...p, cta: { ...p.cta, secondaryButtonText: e.target.value } } : null
                    )
                  }
                />
              </FormGroup>
              <FormGroup label="Secondary Button Link">
                <Input
                  value={pageContent.cta.secondaryButtonLink}
                  onChange={(e) =>
                    setPageContent((p) =>
                      p ? { ...p, cta: { ...p.cta, secondaryButtonLink: e.target.value } } : null
                    )
                  }
                />
              </FormGroup>
            </div>
          </SectionCard>

          <div className="pb-10 flex justify-end">
            <Button onClick={handleSavePageContent} disabled={isSaving} size="lg">
              {isSaving ? "Saving..." : "Save Page Content"}
            </Button>
          </div>
        </>
      )}

      {/* ── Service Edit/Add Modal ── */}
      {editingService && (
        <ServiceEditModal
          service={editingService}
          isNew={isAddingService}
          onSave={handleSaveService}
          onClose={() => {
            setEditingService(null);
            setIsAddingService(false);
          }}
        />
      )}
    </div>
  );
}
