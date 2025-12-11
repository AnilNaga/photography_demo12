"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

interface Category {
    id: string;
    name: string;
}

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
}

export default function UploadModal({ isOpen, onClose, categories }: UploadModalProps) {
    const router = useRouter();
    const [files, setFiles] = useState<FileList | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        categoryId: "",
        isFeatured: false,
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!files || files.length === 0 || !formData.categoryId) {
            alert("Please select files and a category");
            return;
        }

        setLoading(true);

        // Check for missing configuration
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl || supabaseUrl.includes("placeholder")) {
            alert("CONFIGURATION ERROR: Supabase is not connected.\n\nPlease add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env file (local) or Vercel Environment Variables (production).\n\nUploads require a cloud storage backend.");
            setLoading(false);
            return;
        }

        try {
            // 1. Upload Files to Supabase Storage
            const urls: string[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const filename = `${Date.now()}_${i}_${file.name.replaceAll(" ", "_")}`;

                const { error } = await supabase.storage
                    .from('photos') // Target bucket
                    .upload(filename, file);

                if (error) {
                    console.error("Upload error for file", file.name, error);
                    continue; // Skip failed uploads? Or throw? For now, skip.
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('photos')
                    .getPublicUrl(filename);

                urls.push(publicUrl);
            }

            if (urls.length === 0) throw new Error("No files were successfully uploaded.");

            // 2. Create Photo Records (Batch)
            const res = await fetch("/api/photos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: urls.length,
                    imageUrls: urls, // Send array of URLs
                    title: formData.title, // Common title (can be appended with index in backend)
                    description: formData.description,
                    categoryId: formData.categoryId,
                    isFeatured: formData.isFeatured,
                }),
            });

            if (!res.ok) throw new Error("Failed to save photos");

            alert(`Successfully uploaded ${files.length} photos!`);
            router.refresh();
            onClose();
            // Reset
            setFiles(null);
            setFormData({ title: "", description: "", categoryId: "", isFeatured: false });
        } catch (error: any) {
            console.error(error);
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">Upload Photos</h3>
                    <button onClick={onClose} className="text-white/50 hover:text-white">✕</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* File Input */}
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-amber-500/50 transition-colors">
                        <input
                            type="file"
                            multiple // Allow multiple
                            accept="image/*"
                            onChange={(e) => setFiles(e.target.files)}
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center gap-2">
                            <span className="p-3 rounded-full bg-white/5 text-amber-500">
                                ⬆️
                            </span>
                            <span className="text-sm font-medium text-white/70">
                                {files && files.length > 0
                                    ? `${files.length} file(s) selected`
                                    : "Click to select images (Multiple allowed)"}
                            </span>
                        </label>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-medium text-white/50 mb-1">Title Prefix (Optional)</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-amber-500/50"
                            placeholder="e.g. Wedding Shoot (will become Wedding Shoot 1, 2...)"
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
                            placeholder="Details about the shot..."
                        />
                    </div>

                    {/* Featured Checkbox */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            className="w-4 h-4 rounded border-white/10 bg-white/5 text-amber-500 focus:ring-amber-500"
                        />
                        <label htmlFor="isFeatured" className="text-sm text-white/70">Feature these on home page</label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Uploading..." : "Upload Photos"}
                    </button>
                </form>
            </div>
        </div>
    );
}
