"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface Category {
    id: string;
    name: string;
}

interface UploadVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
}

export default function UploadVideoModal({ isOpen, onClose, categories }: UploadVideoModalProps) {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        categoryId: "",
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !formData.categoryId) {
            alert("Please select a file and category");
            return;
        }

        setLoading(true);

        try {
            // Check for missing configuration
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
            if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
                alert("CONFIGURATION ERROR: Supabase is not connected.\n\nPlease add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file (local) or Vercel Environment Variables (production).\n\nUploads require a cloud storage backend.");
                setLoading(false);
                return;
            }

            // 1. Upload File to Supabase Storage
            const filename = `${Date.now()}_${file.name.replaceAll(" ", "_")}`;
            const { data, error } = await supabase.storage
                .from('videos') // Assuming 'videos' bucket exists. If not, this needs to be 'uploads' or created.
                .upload(filename, file);

            if (error) throw error;

            // Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('videos')
                .getPublicUrl(filename);

            // 2. Create Video Record in DB
            const res = await fetch("/api/videos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    videoUrl: publicUrl,
                }),
            });

            if (!res.ok) throw new Error("Failed to save video details");

            alert("Video uploaded successfully!");
            router.refresh();
            onClose();
            // Reset form
            setFile(null);
            setFormData({ title: "", description: "", categoryId: "" });
        } catch (error: any) {
            console.error(error);
            alert("Error: " + (error.message || "Upload failed"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Upload New Video</h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* File Input */}
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-amber-500/50 transition-colors">
                        <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            className="hidden"
                            id="video-upload"
                        />
                        <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <span className="p-3 rounded-full bg-white/5 text-amber-500">
                                🎬
                            </span>
                            <span className="text-sm font-medium text-white/70">
                                {file ? file.name : "Click to select video"}
                            </span>
                        </label>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                            placeholder="Cinematic Landscape"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Category</label>
                        <select
                            required
                            value={formData.categoryId}
                            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                        >
                            <option value="" className="bg-zinc-900">Select Category...</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id} className="bg-zinc-900">{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50 h-24 resize-none"
                            placeholder="Details about the video..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Uploading..." : "Upload Video"}
                    </button>
                </form>
            </div>
        </div>
    );
}
