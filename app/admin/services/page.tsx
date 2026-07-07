"use client";

import { useState } from "react";
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
import { servicesData } from "@/lib/dummy-data/services";
import type { Service } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { SectionCard, FormGroup, Input, Textarea, Toggle } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

// Draggable Sortable Item Component
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

export default function ServicesManagementPage() {
  const [services, setServices] = useState<Service[]>(servicesData.sort((a, b) => a.order - b.order));
  const [isEditing, setIsEditing] = useState<Service | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const { showToast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setServices((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered.map((item, index) => ({ ...item, order: index }));
      });
      showToast("Order updated", "success");
    }
  };

  const handleDelete = (id: string) => {
    setServices((items) => items.filter((s) => s.id !== id));
    showToast("Service deleted", "error");
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setServices(services.map(s => s.id === isEditing.id ? isEditing : s));
      showToast("Service updated");
    } else if (isAdding) {
      // In a real app we'd grab from state. Just doing a mock quick push here.
      showToast("New service added");
    }
    setIsEditing(null);
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl relative">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 font-display">Services</h2>
          <p className="text-neutral-500 mt-1">Manage and reorder the services offered.</p>
        </div>
        <Button onClick={() => setIsAdding(true)}>+ Add Service</Button>
      </div>

      <SectionCard title="All Services" description="Drag to reorder how they appear on the site.">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={services.map(s => s.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col">
              {services.map((service) => (
                <SortableServiceItem 
                  key={service.id} 
                  service={service} 
                  onEdit={() => setIsEditing(service)}
                  onDelete={() => handleDelete(service.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </SectionCard>

      {/* Simplified Modal (Overlays content) */}
      {(isEditing || isAdding) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
              <h3 className="font-bold text-lg">{isEditing ? "Edit Service" : "Add Service"}</h3>
              <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="text-neutral-400 hover:text-neutral-900">&times;</button>
            </div>
            
            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-16">
                  <FormGroup label="Icon">
                    <Input 
                      value={isEditing?.icon || "✨"} 
                      onChange={(e) => isEditing && setIsEditing({...isEditing, icon: e.target.value})} 
                      className="text-center text-xl px-0" 
                    />
                  </FormGroup>
                </div>
                <div className="flex-1">
                  <FormGroup label="Title">
                    <Input 
                      value={isEditing?.title || ""} 
                      onChange={(e) => isEditing && setIsEditing({...isEditing, title: e.target.value})} 
                      placeholder="e.g. Strategic Advisory"
                      required
                    />
                  </FormGroup>
                </div>
              </div>
              
              <FormGroup label="Description">
                <Textarea 
                  value={isEditing?.description || ""} 
                  onChange={(e) => isEditing && setIsEditing({...isEditing, description: e.target.value})} 
                  rows={3} 
                  required
                />
              </FormGroup>
              
              <Toggle 
                label="Feature on Homepage" 
                checked={isEditing?.isFeatured || false}
                onChange={(c) => isEditing && setIsEditing({...isEditing, isFeatured: c})}
              />

              <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-neutral-100">
                <Button variant="ghost" onClick={() => { setIsEditing(null); setIsAdding(false); }}>Cancel</Button>
                <Button type="submit">Save Service</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
