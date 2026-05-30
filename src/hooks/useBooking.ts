import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Booking } from '../types';

export const useBooking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBooking = async (data: Omit<Booking, 'id' | 'status' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const id = crypto.randomUUID();
      const { error: err } = await supabase
        .from('bookings')
        .insert([{ ...data, id, status: 'pending' }]);
        
      if (err) throw err;
      return { id, ...data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error('Booking submission error:', e);
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submitBooking, loading, error };
};

export const useAdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    setBookings(data || []);
    setLoading(false);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('bookings').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
    fetchBookings();
  };

  const deleteBooking = async (id: string) => {
    await supabase.from('bookings').delete().eq('id', id);
    fetchBookings();
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchBookings(); }, [fetchBookings]);
  return { bookings, loading, updateStatus, deleteBooking, refetch: fetchBookings };
};
