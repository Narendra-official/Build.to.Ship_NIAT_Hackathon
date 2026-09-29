import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../lib/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Eye, EyeOff, Loader2, Building2 } from 'lucide-react';
import { toast } from 'sonner';

export default function Register() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 6) return setError('Password must be at least 6 characters.');
    if (formData.password !== formData.confirmPassword) return setError('Passwords do not match.');

    setIsSubmitting(true);
    
    try {
      await auth.register({ fullName: formData.fullName, email: formData.email, password: formData.password });
      toast.success('Account created successfully. Please sign in.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed.');
    } finally {
      setIsSubmitting(false);
    }
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
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Or <Link to="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">sign in to your existing account</Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="glass-card py-8 px-4 sm:px-10">
          {error && <div className="mb-6 p-3 bg-destructive/10 text-destructive text-sm rounded-md border border-destructive/20 text-center">{error}</div>}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-foreground">Full Name</label>
              <div className="mt-1">
                <Input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="bg-background/50" />
              </div>
            </div>

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

            <div>
              <label className="block text-sm font-medium text-foreground">Confirm Password</label>
              <div className="mt-1">
                <Input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={formData.confirmPassword} 
                  onChange={e => setFormData({...formData, confirmPassword: e.target.value})} 
                  className="bg-background/50"
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...</> : 'Sign up'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
