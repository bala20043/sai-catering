import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, Phone, Mail, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useBooking } from '../../hooks/useBooking';
import { EVENT_TYPES, BUDGET_RANGES, MENU_PREFERENCES } from '../../lib/constants';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(10, 'Valid phone number required'),
  event_type: z.string().min(1, 'Select event type'),
  event_date: z.string().min(1, 'Select event date'),
  guest_count: z.number().min(10, 'Minimum 10 guests'),
  venue: z.string().optional(),
  menu_preference: z.string().optional(),
  budget_range: z.string().optional(),
  special_requests: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal = ({ isOpen, onClose }: Props) => {
  const { submitBooking, loading } = useBooking();
  const [step, setStep] = useState(1);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    // eslint-disable-next-line
    const result = await submitBooking(data as any);
    if (result) {
      toast.success(`Booking confirmed! Reference: ${result.id.slice(0, 8).toUpperCase()}`, { duration: 5000 });
      reset();
      setStep(1);
      onClose();
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const inputClass = "w-full px-4 py-3 bg-dark/50 border border-accent/20 rounded-xl text-cream placeholder:text-text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all font-body";
  const labelClass = "block text-accent text-sm font-semibold mb-1.5 font-body";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: 'spring', damping: 25 }}
            className="bg-gradient-to-br from-dark via-secondary to-dark w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-accent/20 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-accent/10">
              <div>
                <h2 className="text-2xl font-accent font-bold text-accent">Book Your Event</h2>
                <p className="text-text-muted text-sm mt-1">Step {step} of 2</p>
              </div>
              <button onClick={onClose} className="text-text-muted hover:text-cream transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Progress */}
            <div className="px-6 pt-4">
              <div className="flex gap-2">
                <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-accent' : 'bg-accent/20'}`} />
                <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-accent' : 'bg-accent/20'}`} />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              {step === 1 && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                  <div>
                    <label className={labelClass}><User size={14} className="inline mr-1" />Full Name</label>
                    <input {...register('name')} placeholder="Enter your name" className={inputClass} />
                    {errors.name && <p className="text-primary-light text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}><Mail size={14} className="inline mr-1" />Email</label>
                      <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass} />
                      {errors.email && <p className="text-primary-light text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <label className={labelClass}><Phone size={14} className="inline mr-1" />Phone</label>
                      <input {...register('phone')} placeholder="+91 XXXXXXXXXX" className={inputClass} />
                      {errors.phone && <p className="text-primary-light text-xs mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Event Type</label>
                      <select {...register('event_type')} className={inputClass}>
                        <option value="">Select...</option>
                        {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors.event_type && <p className="text-primary-light text-xs mt-1">{errors.event_type.message}</p>}
                    </div>
                    <div>
                      <label className={labelClass}><Calendar size={14} className="inline mr-1" />Event Date</label>
                      <input {...register('event_date')} type="date" className={inputClass} />
                      {errors.event_date && <p className="text-primary-light text-xs mt-1">{errors.event_date.message}</p>}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}><Users size={14} className="inline mr-1" />Guest Count</label>
                    <input {...register('guest_count', { valueAsNumber: true })} type="number" placeholder="Expected guests" className={inputClass} />
                    {errors.guest_count && <p className="text-primary-light text-xs mt-1">{errors.guest_count.message}</p>}
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="btn-gold w-full text-center">
                    Next Step →
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-4">
                  <div>
                    <label className={labelClass}><MapPin size={14} className="inline mr-1" />Venue</label>
                    <input {...register('venue')} placeholder="Event venue address" className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Menu Preference</label>
                      <select {...register('menu_preference')} className={inputClass}>
                        <option value="">Select...</option>
                        {MENU_PREFERENCES.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Budget Range</label>
                      <select {...register('budget_range')} className={inputClass}>
                        <option value="">Select...</option>
                        {BUDGET_RANGES.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Special Requests</label>
                    <textarea {...register('special_requests')} rows={3} placeholder="Any special dietary or arrangement requests..." className={inputClass} />
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="btn-primary flex-1">← Back</button>
                    <button type="submit" disabled={loading} className="btn-gold flex-1 pulse-glow disabled:opacity-50">
                      {loading ? 'Submitting...' : '🎉 Confirm Booking'}
                    </button>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
