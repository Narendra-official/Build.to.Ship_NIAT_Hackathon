import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Eye, EyeOff, Loader2, Building2, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) return setError('Password must be at least 8 characters.');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');

    setIsSubmitting(true);
    
    try {
      await auth.register({ fullName: formData.fullName, email: formData.email, password: formData.password });
      toast.success('Enterprise account initialized successfully.');
      navigate('/login');
    } catch (err: any) {
      if (err.message === 'Network Error') {
        setError('Network Error: The backend server is unreachable. Please check if the server is running or if there is a CORS issue.');
      } else {
        setError(err.response?.data?.error?.message || err.response?.data?.error || 'Account initialization failed. Please contact support.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${isFocused ? 'bg-slate-100 dark:bg-zinc-950' : 'bg-background'}`}>
      {/* Sophisticated Ambient Background */}
      <div className={`fixed inset-0 pointer-events-none -z-10 transition-opacity duration-300 ${isFocused ? 'opacity-0' : 'opacity-100 bg-background/50'}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.02)_0%,transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.02)_0%,transparent_50%)]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <Link to="/" className="group">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-sm shadow-primary/20 transition-all transform group-hover:scale-105 border border-primary/20">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
          </Link>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-foreground tracking-tight">
          Initialize Account
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground font-medium">
          Already have an enterprise account?{' '}
          <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors border-b border-primary/30 pb-0.5">Authenticate here</Link>
        </p>
      </div>

      <div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 animate-fade-in-up stagger-2"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setIsFocused(false);
          }
        }}
      >
        <div className={`py-10 px-4 sm:px-12 rounded-3xl border border-border/60 relative overflow-hidden transition-all duration-300 ${isFocused ? 'bg-white dark:bg-zinc-900 shadow-2xl scale-[1.01]' : 'glass-card shadow-xl'}`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl border border-red-500/20 text-center flex items-center justify-center relative z-10 shadow-inner">
              <Shield className="w-4 h-4 mr-2" />
              {error}
            </div>
          )}
          
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Authorized Personnel Name</label>
              <div className="mt-1">
                <Input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="glass-input h-12 text-base px-4 border-border/50 w-full" placeholder="John Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Corporate Email</label>
              <div className="mt-1">
                <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="glass-input h-12 text-base px-4 border-border/50 w-full" placeholder="user@company.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Security Key</label>
              <div className="mt-1 relative">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={formData.password} 
                  onChange={e => setFormData({...formData, password: e.target.value})} 
                  className="glass-input h-12 text-base px-4 border-border/50 w-full pr-12"
                  placeholder="••••••••••••"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Verify Security Key</label>
              <div className="mt-1">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={formData.confirmPassword} 
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                  className="glass-input h-12 text-base px-4 border-border/50 w-full"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full flex justify-center bg-foreground text-background hover:bg-foreground/90 rounded-xl h-12 font-bold shadow-xl transition-all" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Provisioning Account...</> : <>Deploy Account <ArrowRight className="ml-2 w-5 h-5" /></>}
              </Button>
            </div>
          </form>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8 font-medium">
          Protected by AES-256 Encryption & Zero-Trust Architecture
        </p>
      </div>
    </div>
  );
}
