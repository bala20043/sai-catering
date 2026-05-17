import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, ClipboardList, MessageSquare, Star, LogOut, Eye, Check, XCircle, CheckCircle, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAdmin } from '../../hooks/useAdmin';
import { useAdminBookings } from '../../hooks/useBooking';
import { supabase } from '../../lib/supabase';
import type { Contact, Testimonial, Booking } from '../../types';

type Tab = 'dashboard' | 'bookings' | 'contacts' | 'testimonials';

const AdminDashboard = () => {
  const { user, signOut, loading: authLoading } = useAdmin();
  const navigate = useNavigate();
  const { bookings, updateStatus } = useAdminBookings();
  const [tab, setTab] = useState<Tab>('dashboard');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!authLoading && !user) navigate('/admin/login');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (tab === 'contacts') supabase.from('contacts').select('*').order('created_at', { ascending: false }).then(({ data }) => setContacts(data || []));
    if (tab === 'testimonials') supabase.from('testimonials').select('*').order('created_at', { ascending: false }).then(({ data }) => setTestimonials(data || []));
  }, [tab]);

  const handleLogout = async () => { await signOut(); navigate('/admin/login'); };

  const filteredBookings = bookings.filter(b => {
    if (statusFilter !== 'all' && b.status !== statusFilter) return false;
    if (search && !b.name.toLowerCase().includes(search.toLowerCase()) && !b.phone.includes(search)) return false;
    return true;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Event Type', 'Event Date', 'Guests', 'Status'];
    const rows = filteredBookings.map(b => [b.name, b.email, b.phone, b.event_type, b.event_date, b.guest_count, b.status]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'bookings.csv'; a.click();
  };

  const approveTestimonial = async (id: string, approved: boolean) => {
    await supabase.from('testimonials').update({ is_approved: approved }).eq('id', id);
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, is_approved: approved } : t));
    toast.success(approved ? 'Testimonial approved' : 'Testimonial rejected');
  };

  if (authLoading) return <div className="min-h-screen bg-dark flex items-center justify-center"><div className="loader-kolam" /></div>;

  const sidebarItems: { icon: React.ElementType; label: string; key: Tab }[] = [
    { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
    { icon: ClipboardList, label: 'Bookings', key: 'bookings' },
    { icon: MessageSquare, label: 'Contacts', key: 'contacts' },
    { icon: Star, label: 'Testimonials', key: 'testimonials' },
  ];

  return (
    <div className="min-h-screen bg-dark flex">
      {/* Sidebar */}
      <aside className="w-64 admin-sidebar p-4 flex flex-col shrink-0 border-r border-accent/10">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-dark font-bold text-sm">🍛</div>
          <span className="text-accent font-display text-lg">Sai Admin</span>
        </div>
        <nav className="flex-1 space-y-1">
          {sidebarItems.map(item => (
            <button key={item.key} onClick={() => setTab(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${tab === item.key ? 'bg-accent/10 text-accent' : 'text-cream/50 hover:text-cream hover:bg-white/5'}`}>
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-cream/40 hover:text-primary transition-all">
          <LogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {/* Dashboard Tab */}
        {tab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-accent font-bold text-cream mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Bookings', value: stats.total, color: 'from-accent/20 to-accent/5', text: 'text-accent' },
                { label: 'Pending', value: stats.pending, color: 'from-yellow-500/20 to-yellow-500/5', text: 'text-yellow-400' },
                { label: 'Confirmed', value: stats.confirmed, color: 'from-green-500/20 to-green-500/5', text: 'text-green-400' },
                { label: 'Completed', value: stats.completed, color: 'from-blue-500/20 to-blue-500/5', text: 'text-blue-400' },
              ].map((s, i) => (
                <div key={i} className={`admin-card p-5 bg-gradient-to-br ${s.color}`}>
                  <p className="text-cream/50 text-sm">{s.label}</p>
                  <p className={`text-3xl font-bold mt-1 ${s.text}`}>{s.value}</p>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-heading font-bold text-cream/80 mb-3">Recent Bookings</h3>
            <div className="admin-card overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="text-cream/40 border-b border-accent/10">
                  <th className="text-left p-3">Name</th><th className="text-left p-3">Event</th><th className="text-left p-3">Date</th><th className="text-left p-3">Status</th>
                </tr></thead>
                <tbody>
                  {bookings.slice(0, 5).map(b => (
                    <tr key={b.id} className="border-b border-accent/5 text-cream/70">
                      <td className="p-3">{b.name}</td><td className="p-3">{b.event_type}</td>
                      <td className="p-3">{new Date(b.event_date).toLocaleDateString()}</td>
                      <td className="p-3"><span className={`badge-${b.status} px-2 py-0.5 rounded-full text-xs`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {tab === 'bookings' && (
          <div>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-2xl font-accent font-bold text-cream">Bookings</h2>
              <div className="flex gap-2">
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name/phone..."
                  className="px-3 py-2 bg-dark/50 border border-accent/20 rounded-lg text-cream text-sm focus:outline-none focus:border-accent w-48" />
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-dark/50 border border-accent/20 rounded-lg text-cream text-sm focus:outline-none">
                  <option value="all">All Status</option><option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option><option value="cancelled">Cancelled</option><option value="completed">Completed</option>
                </select>
                <button onClick={exportCSV} className="flex items-center gap-1 px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm hover:bg-accent/20 transition-colors">
                  <Download size={14} /> CSV
                </button>
              </div>
            </div>
            <div className="admin-card overflow-x-auto">
              <table className="w-full text-sm min-w-[800px]">
                <thead><tr className="text-cream/40 border-b border-accent/10">
                  <th className="text-left p-3">Name</th><th className="text-left p-3">Phone</th><th className="text-left p-3">Event</th>
                  <th className="text-left p-3">Date</th><th className="text-left p-3">Guests</th><th className="text-left p-3">Status</th><th className="text-left p-3">Actions</th>
                </tr></thead>
                <tbody>
                  {filteredBookings.map(b => (
                    <tr key={b.id} className="border-b border-accent/5 text-cream/70 hover:bg-white/5">
                      <td className="p-3 font-medium">{b.name}</td><td className="p-3">{b.phone}</td>
                      <td className="p-3">{b.event_type}</td><td className="p-3">{new Date(b.event_date).toLocaleDateString()}</td>
                      <td className="p-3">{b.guest_count}</td>
                      <td className="p-3"><span className={`badge-${b.status} px-2 py-0.5 rounded-full text-xs`}>{b.status}</span></td>
                      <td className="p-3">
                        <div className="flex gap-1">
                          <button onClick={() => setSelectedBooking(b)} className="p-1.5 hover:bg-accent/10 rounded-lg text-accent" title="View"><Eye size={14} /></button>
                          {b.status === 'pending' && <button onClick={() => updateStatus(b.id, 'confirmed')} className="p-1.5 hover:bg-green-500/10 rounded-lg text-green-400" title="Confirm"><Check size={14} /></button>}
                          {b.status !== 'cancelled' && <button onClick={() => updateStatus(b.id, 'cancelled')} className="p-1.5 hover:bg-red-500/10 rounded-lg text-red-400" title="Cancel"><XCircle size={14} /></button>}
                          {b.status === 'confirmed' && <button onClick={() => updateStatus(b.id, 'completed')} className="p-1.5 hover:bg-blue-500/10 rounded-lg text-blue-400" title="Complete"><CheckCircle size={14} /></button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredBookings.length === 0 && <p className="text-center text-cream/30 py-8">No bookings found.</p>}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {tab === 'contacts' && (
          <div>
            <h2 className="text-2xl font-accent font-bold text-cream mb-6">Contact Messages</h2>
            <div className="space-y-3">
              {contacts.map(c => (
                <div key={c.id} className="admin-card p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-heading font-bold text-cream">{c.name}</p>
                      <p className="text-cream/40 text-xs">{c.email} {c.phone && `• ${c.phone}`}</p>
                    </div>
                    <p className="text-cream/30 text-xs">{new Date(c.created_at).toLocaleDateString()}</p>
                  </div>
                  <p className="text-cream/60 text-sm">{c.message}</p>
                </div>
              ))}
              {contacts.length === 0 && <p className="text-cream/30 text-center py-8">No messages yet.</p>}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {tab === 'testimonials' && (
          <div>
            <h2 className="text-2xl font-accent font-bold text-cream mb-6">Testimonials</h2>
            <div className="space-y-3">
              {testimonials.map(t => (
                <div key={t.id} className="admin-card p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-heading font-bold text-cream">{t.name} <span className="text-cream/40 text-xs">— {t.event_type}</span></p>
                      <div className="flex gap-0.5 mt-1">{[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="text-accent fill-accent" />)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${t.is_approved ? 'badge-confirmed' : 'badge-pending'}`}>
                        {t.is_approved ? 'Approved' : 'Pending'}
                      </span>
                      {!t.is_approved && <button onClick={() => approveTestimonial(t.id, true)} className="text-green-400 hover:bg-green-500/10 p-1.5 rounded-lg"><Check size={14} /></button>}
                      {t.is_approved && <button onClick={() => approveTestimonial(t.id, false)} className="text-red-400 hover:bg-red-500/10 p-1.5 rounded-lg"><XCircle size={14} /></button>}
                    </div>
                  </div>
                  <p className="text-cream/60 text-sm">"{t.content}"</p>
                </div>
              ))}
              {testimonials.length === 0 && <p className="text-cream/30 text-center py-8">No testimonials yet.</p>}
            </div>
          </div>
        )}

        {/* Booking Detail Modal */}
        <AnimatePresence>
          {selectedBooking && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={() => setSelectedBooking(null)}>
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-dark border border-accent/20 rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-accent font-bold text-accent mb-4">Booking Details</h3>
                <div className="space-y-3 text-sm">
                  {Object.entries({
                    Name: selectedBooking.name, Email: selectedBooking.email, Phone: selectedBooking.phone,
                    'Event Type': selectedBooking.event_type, 'Event Date': new Date(selectedBooking.event_date).toLocaleDateString(),
                    Guests: selectedBooking.guest_count, Venue: selectedBooking.venue || 'N/A',
                    'Menu Preference': selectedBooking.menu_preference || 'N/A', Budget: selectedBooking.budget_range || 'N/A',
                    'Special Requests': selectedBooking.special_requests || 'None',
                    Status: selectedBooking.status, Booked: new Date(selectedBooking.created_at).toLocaleString(),
                  }).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-cream/40">{k}</span>
                      <span className="text-cream/80 text-right max-w-[60%]">{String(v)}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setSelectedBooking(null)} className="btn-gold w-full mt-6 text-center">Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
