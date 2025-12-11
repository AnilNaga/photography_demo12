"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import { TextReveal } from "@/components/ui/TextReveal";
import { motion } from "framer-motion";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-black text-white pb-20 selection:bg-amber-500 selection:text-black">
            <Navbar />

            <div className="pt-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="text-center mb-24">
                    <TextReveal>
                        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            Get in Touch
                        </h1>
                    </TextReveal>
                    <TextReveal delay={0.1}>
                        <p className="text-white/60 max-w-xl mx-auto text-lg tracking-wide">
                            Have a project in mind or want to book a session? Let's create something timeless.
                        </p>
                    </TextReveal>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm space-y-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-8 text-white uppercase tracking-widest">Studio Info</h3>
                                <div className="space-y-8">
                                    <div className="flex items-start gap-6 group">
                                        <div className="p-4 rounded-full bg-white/5 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Email</p>
                                            <a href="mailto:hello@lumina.com" className="text-2xl font-serif italic text-white hover:text-amber-500 transition-colors">hello@lumina.com</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="p-4 rounded-full bg-white/5 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Phone</p>
                                            <a href="tel:+1234567890" className="text-2xl font-serif italic text-white hover:text-amber-500 transition-colors">+1 (234) 567-890</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6 group">
                                        <div className="p-4 rounded-full bg-white/5 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-all duration-500">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-1">Studio</p>
                                            <p className="text-xl text-white font-light">123 Creative Avenue,<br />Design District, NY 10001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="aspect-video rounded-3xl overflow-hidden border border-white/10 relative bg-zinc-900/50 group cursor-none">
                            <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold group-hover:text-amber-500 transition-colors uppercase tracking-widest">
                                View on Map
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="p-8 rounded-3xl border border-white/5 bg-zinc-900/20 backdrop-blur-sm"
                    >
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">First Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-none border-b focus:border-amber-500 px-4 py-3 text-white focus:outline-none transition-colors" placeholder="John" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Last Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-none border-b focus:border-amber-500 px-4 py-3 text-white focus:outline-none transition-colors" placeholder="Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Email Address</label>
                                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-none border-b focus:border-amber-500 px-4 py-3 text-white focus:outline-none transition-colors" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Service Interest</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-none border-b focus:border-amber-500 px-4 py-3 text-white focus:outline-none transition-colors">
                                    <option className="bg-black">Wedding Photography</option>
                                    <option className="bg-black">Portrait Session</option>
                                    <option className="bg-black">Event Coverage</option>
                                    <option className="bg-black">Commercial</option>
                                    <option className="bg-black">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">Message</label>
                                <textarea className="w-full bg-white/5 border border-white/10 rounded-none border-b focus:border-amber-500 px-4 py-3 text-white focus:outline-none transition-colors h-32 resize-none" placeholder="Tell me about your project..." />
                            </div>

                            <MagneticButton>
                                <button type="submit" className="w-full bg-white text-black font-bold uppercase tracking-widest text-sm py-4 rounded-full hover:bg-amber-500 transition-all flex items-center justify-center gap-2 mt-4">
                                    <Send size={16} /> Send Message
                                </button>
                            </MagneticButton>
                        </form>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
