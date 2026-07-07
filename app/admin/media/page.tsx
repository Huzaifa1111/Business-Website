"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";

// Dummy image data
const initialMedia = [
  { id: "1", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80", name: "team-meeting.jpg", size: "1.2 MB", date: "Oct 12, 2025" },
  { id: "2", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80", name: "office-space.jpg", size: "2.4 MB", date: "Oct 10, 2025" },
  { id: "3", url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=400&q=80", name: "strategy-board.jpg", size: "850 KB", date: "Sep 28, 2025" },
  { id: "4", url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80", name: "handshake.jpg", size: "1.8 MB", date: "Sep 15, 2025" },
];

export default function MediaLibraryPage() {
  const [media, setMedia] = useState(initialMedia);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<typeof initialMedia[0] | null>(null);
  const { showToast } = useToast();

  const handleSimulatedUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          const newImg = {
            id: Math.random().toString(),
            url: "https://images.unsplash.com/photo-1665686306574-1ace09918530?auto=format&fit=crop&w=400&q=80",
            name: `upload-${Date.now()}.jpg`,
            size: "1.5 MB",
            date: "Just now"
          };
          setMedia([newImg, ...media]);
          showToast("Image uploaded successfully");
        }, 300);
      }
    }, 200);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // prevent opening preview
    setMedia(media.filter(m => m.id !== id));
    showToast("Image deleted", "error");
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 font-display">Media Library</h2>
          <p className="text-neutral-500 mt-1">Manage images used across the website.</p>
        </div>
        <Button onClick={handleSimulatedUpload} disabled={isUploading}>
          {isUploading ? "Uploading..." : "+ Upload New Image"}
        </Button>
      </div>

      {isUploading && (
        <SectionCard title="Uploading file...">
          <div className="w-full bg-neutral-100 rounded-full h-2.5 mb-2 overflow-hidden">
            <div 
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-200" 
              style={{ width: `${uploadProgress}%` }} 
            />
          </div>
          <p className="text-xs text-neutral-500 text-right">{uploadProgress}% complete</p>
        </SectionCard>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.map((img) => (
          <div 
            key={img.id} 
            onClick={() => setPreviewImage(img)}
            className="group relative bg-white rounded-2xl border border-neutral-200 overflow-hidden cursor-pointer shadow-sm hover:shadow-md hover:border-primary-300 transition-all"
          >
            <div className="aspect-square bg-neutral-100 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
              
              {/* Overlay Actions */}
              <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  onClick={(e) => handleDelete(e, img.id)}
                  className="w-8 h-8 rounded-full bg-white/90 text-red-600 flex items-center justify-center hover:bg-white hover:text-red-700 transition-colors"
                  title="Delete image"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 3.5h12M4.5 3.5v-1a1 1 0 011-1h3a1 1 0 011 1v1m2 0v8a1 1 0 01-1 1h-7a1 1 0 01-1-1v-8" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-3 border-t border-neutral-100">
              <p className="text-xs font-semibold text-neutral-900 truncate">{img.name}</p>
              <div className="flex justify-between items-center mt-1 text-[10px] text-neutral-500">
                <span>{img.size}</span>
                <span>{img.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <div className="bg-white rounded-xl overflow-hidden max-w-4xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h3 className="font-semibold">{previewImage.name}</h3>
              <button onClick={() => setPreviewImage(null)} className="text-neutral-500 hover:text-neutral-900">&times;</button>
            </div>
            <div className="overflow-auto bg-neutral-100 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewImage.url} alt={previewImage.name} className="max-w-full h-auto mx-auto shadow-sm" />
            </div>
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-between items-center">
              <p className="text-xs text-neutral-500">{previewImage.size} &bull; Uploaded {previewImage.date}</p>
              <Button size="sm" variant="outline" onClick={() => {
                navigator.clipboard.writeText(previewImage.url);
                showToast("URL copied to clipboard");
              }}>Copy URL</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
