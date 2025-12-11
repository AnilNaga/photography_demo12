
export default function AdminBookingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div>
                <h2 className="text-3xl font-bold text-white mb-2">Bookings</h2>
                <p className="text-white/50">Manage client inquiries and reservations.</p>
            </div>

            <div className="glass-panel p-12 rounded-2xl border border-white/5 text-center">
                <p className="text-white/30 text-lg">No bookings found (Module under construction).</p>
            </div>
        </div>
    );
}
