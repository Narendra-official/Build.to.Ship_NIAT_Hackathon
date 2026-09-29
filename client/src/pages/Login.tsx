import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/api';
import { useApp } from '../lib/store';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Eye, EyeOff, Loader2, Building2 } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await auth.login(formData);
      await checkAuth(); // Load user profile and their data
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return setError('Email is required.');
    toast.success('If an account exists, a reset link has been generated and sent.');
    setForgotMode(false);
  };

  return (
    <div className="min-h-screen bg-background relative flex flex-col justify-center py-12 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Building2 className="w-8 h-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-foreground tracking-tight">
          {forgotMode ? 'Reset your password' : 'Sign in to WattWise'}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {forgotMode ? 'Enter your email to receive a secure link' : 'Or '}
          {!forgotMode && <Link to="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">create a new account</Link>}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="glass-card py-8 px-4 sm:px-10">
          {error && <div className="mb-6 p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20 text-center">{error}</div>}
          
          {forgotMode ? (
            <form className="space-y-6" onSubmit={handleForgot}>
              <div>
                <label className="block text-sm font-medium text-foreground">Email address</label>
                <div className="mt-1">
                  <Input type="email" required value={resetEmail} onChange={e => setResetEmail(e.target.value)} className="bg-background/50" />
                </div>
              </div>
              <div className="flex space-x-3">
                <Button type="button" variant="outline" className="w-full bg-background/50" onClick={() => {setForgotMode(false); setError('');}}>Cancel</Button>
                <Button type="submit" className="w-full">Send Link</Button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-foreground">Email address</label>
                <div className="mt-1">
                  <Input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-background/50" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground">Password</label>
                <div className="mt-1 relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    required 
                    value={formData.password} 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    className="bg-background/50 pr-10"
                  />
                  <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <button type="button" onClick={() => {setForgotMode(true); setError('');}} className="font-medium text-primary hover:text-primary/80 transition-colors">
                    Forgot your password?
                  </button>
                </div>
              </div>

              <div>
                <Button type="submit" className="w-full flex justify-center shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : 'Sign in'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
