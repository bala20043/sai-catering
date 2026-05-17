import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAdmin } from '../../hooks/useAdmin';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { toast.error(error); return; }
    toast.success('Welcome back, Admin!');
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-dark kolam-bg flex items-center justify-center p-4 relative">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-cream/70 hover:text-accent transition-colors font-medium">
        <ArrowLeft size={20} /> Back to Home
      </Link>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock size={28} className="text-dark" />
          </div>
          <h1 className="text-3xl font-accent font-bold text-cream">Admin Access</h1>
          <p className="text-cream/50 text-sm mt-2">Sai Catering Management</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-secondary/30 backdrop-blur border border-accent/10 rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-accent text-sm font-semibold mb-1.5">
              <Mail size={14} className="inline mr-1" />Email
            </label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full px-4 py-3 bg-dark/50 border border-accent/20 rounded-xl text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none transition-all"
              placeholder="admin@saicatering.com" />
          </div>
          <div>
            <label className="block text-accent text-sm font-semibold mb-1.5">
              <Lock size={14} className="inline mr-1" />Password
            </label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full px-4 py-3 bg-dark/50 border border-accent/20 rounded-xl text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none transition-all"
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="btn-gold w-full text-center disabled:opacity-50">
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
