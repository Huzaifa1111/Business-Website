"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SectionCard } from "@/components/admin/AdminForms";
import { useToast } from "@/components/admin/ToastContext";
import type { HomeContent } from "@/lib/types";

type MediaItem = {
  id: string;
  url: string;
  name: string;
  size: string;
  date: string;
};

const storageKey = "admin-media-library";
const MAX_MEDIA_ITEMS = 4;

function formatFileSize(size: number) {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<MediaItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      setMedia([]);
      setIsHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(saved) as MediaItem[];
      setMedia(Array.isArray(parsed) ? parsed : []);
    } catch {
      setMedia([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated || typeof window === "undefined") return;

    const limitedMedia = media.slice(0, MAX_MEDIA_ITEMS);

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(limitedMedia));
    } catch {
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(limitedMedia.slice(0, 1)));
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
  }, [media, isHydrated]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadProgressInterval = window.setInterval(() => {
        setUploadProgress((current) => (current >= 92 ? 92 : current + 8));
      }, 120);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const payload = await response.json();
      window.clearInterval(uploadProgressInterval);

      if (!response.ok) {
        throw new Error(payload.message || "Upload failed");
      }

      const newImage: MediaItem = {
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        url: payload.url,
        name: file.name,
        size: formatFileSize(file.size),
        date: "Just now",
      };

      setMedia((current) => [newImage, ...current].slice(0, MAX_MEDIA_ITEMS));
      setUploadProgress(100);
      showToast("Image uploaded successfully");
      setPreviewImage(newImage);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Image upload failed", "error");
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setMedia((current) => current.filter((m) => m.id !== id));
    showToast("Image deleted", "error");
  };

  const applyAsHeroBackground = async (url: string) => {
    try {
      const currentHomeResponse = await fetch("/api/pages/home");
      if (!currentHomeResponse.ok) {
        throw new Error("Unable to load home page content");
      }

      const currentHome = (await currentHomeResponse.json()) as HomeContent;
      const updatedHome = {
        ...currentHome,
        hero: {
          ...currentHome.hero,
          backgroundImageUrl: url,
        },
      };

      const saveResponse = await fetch("/api/pages/home", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedHome),
      });

      if (!saveResponse.ok) {
        throw new Error("Unable to save hero background");
      }

      showToast("Home hero background updated");
      setPreviewImage(null);
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Hero background update failed", "error");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900 font-display">Media Library</h2>
          <p className="text-neutral-500 mt-1">Upload images and apply them to the home hero section.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <Button onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
            {isUploading ? "Uploading..." : "+ Upload New Image"}
          </Button>
        </div>
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

      {media.length === 0 ? (
        <SectionCard title="No media yet">
          <p className="text-sm text-neutral-500">Upload an image to start using it across the site.</p>
        </SectionCard>
      ) : (
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
      )}

      {previewImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neutral-900/80 backdrop-blur-sm" onClick={() => setPreviewImage(null)}>
          <div className="bg-white rounded-xl overflow-hidden max-w-4xl max-h-[90vh] flex flex-col shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <h3 className="font-semibold">{previewImage.name}</h3>
              <button onClick={() => setPreviewImage(null)} className="text-neutral-500 hover:text-neutral-900">&times;</button>
            </div>
            <div className="overflow-auto bg-neutral-100 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewImage.url} alt={previewImage.name} className="max-w-full h-auto mx-auto shadow-sm" />
            </div>
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-neutral-500">{previewImage.size} &bull; Uploaded {previewImage.date}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    navigator.clipboard.writeText(previewImage.url);
                    showToast("URL copied to clipboard");
                  }}
                >
                  Copy URL
                </Button>
                <Button size="sm" onClick={() => applyAsHeroBackground(previewImage.url)}>
                  Use in Home Hero
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
