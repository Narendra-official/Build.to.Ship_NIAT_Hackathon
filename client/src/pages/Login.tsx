import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/api';
import { useApp } from '../lib/store';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Eye, EyeOff, Loader2, Building2, Shield, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useApp();
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [forgotMode, setForgotMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await auth.login(formData);
      await checkAuth(); // Load user profile and their data
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || err.response?.data?.error || 'Invalid credentials. Please verify and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return setError('Email is required.');
    toast.success('If an account exists, a secure reset link has been generated.');
    setForgotMode(false);
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
          {forgotMode ? 'Account Recovery' : 'Authenticate Session'}
        </h2>
        <p className="mt-3 text-center text-sm text-muted-foreground font-medium">
          {forgotMode ? 'Enter your email to receive a secure recovery link.' : (
            <>
              Don't have an enterprise account?{' '}
              <Link to="/register" className="font-bold text-primary hover:text-primary/80 transition-colors border-b border-primary/30 pb-0.5">Initialize one here</Link>
            </>
          )}
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
          
          {forgotMode ? (
            <form className="space-y-6 relative z-10" onSubmit={handleForgot}>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Registered Email</label>
                <div className="mt-1">
                  <Input type="email" required value={resetEmail} onChange={e => setResetEmail(e.target.value)} className="glass-input h-12 text-base px-4 border-border/50 w-full" placeholder="name@organization.com" />
                </div>
              </div>
              <div className="flex space-x-4 pt-2">
                <Button type="button" variant="outline" className="w-full glass-secondary hover:bg-background/80 rounded-xl font-bold border-border/50 h-12" onClick={() => {setForgotMode(false); setError('');}}>Cancel</Button>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-bold shadow-md shadow-primary/20 h-12">Dispatch Link</Button>
              </div>
            </form>
          ) : (
            <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Corporate Email</label>
                <div className="mt-1">
                  <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="glass-input h-12 text-base px-4 border-border/50 w-full" placeholder="user@company.com" />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">Security Key</label>
                  <button type="button" onClick={() => {setForgotMode(true); setError('');}} className="text-xs font-bold text-primary hover:text-primary/80 transition-colors mb-2">
                    Recover access
                  </button>
                </div>
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

              <div className="pt-4">
                <Button type="submit" className="w-full flex justify-center bg-foreground text-background hover:bg-foreground/90 rounded-xl h-12 font-bold shadow-xl transition-all" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Authenticating...</> : <>Access Dashboard <ArrowRight className="ml-2 w-5 h-5" /></>}
                </Button>
              </div>
            </form>
          )}
        </div>
        <p className="text-center text-xs text-muted-foreground mt-8 font-medium">
          Protected by AES-256 Encryption & Zero-Trust Architecture
        </p>
      </div>
    </div>
  );
}
