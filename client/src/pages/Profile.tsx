import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Loader2, User, Building, Mail, CheckCircle2 } from 'lucide-react';

export default function Profile() {
  const { user, updateUserProfile } = useApp();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    organization: user?.organization || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSuccess(false);
    try {
      await updateUserProfile(formData.fullName, formData.organization);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (e) {
      // Error handled in store
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 max-w-3xl mx-auto relative z-10 pt-8 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left space-y-6 sm:space-y-0 sm:space-x-8 mb-12 stagger-1">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-blue-500 text-white flex items-center justify-center font-black text-4xl shadow-xl shadow-primary/20 border-4 border-background">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-background shadow-sm flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="mt-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{user?.name}</h1>
          <div className="flex flex-col sm:flex-row items-center text-muted-foreground mt-2 font-medium">
            <span className="flex items-center"><Building className="w-4 h-4 mr-2" /> {user?.organization || 'Independent Analyst'}</span>
            <span className="hidden sm:inline mx-3 opacity-50">•</span>
            <span className="mt-1 sm:mt-0 opacity-80">Member Since 2026</span>
          </div>
        </div>
      </div>

      <Card className="glass-elevated shadow-xl border-border/50 rounded-[1.5rem] stagger-2 overflow-hidden">
        <CardHeader className="bg-background/40 border-b border-border/50 pb-6 pt-8 px-8">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
               <User className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold">Account Profile</CardTitle>
              <CardDescription className="mt-1 font-medium text-muted-foreground">Manage your personal and organizational identity.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8 px-8 pb-10">
          <form onSubmit={handleSave} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3 md:col-span-2">
                <label className="text-sm font-bold text-foreground tracking-wide uppercase flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                  Primary Email
                </label>
                <Input 
                  value={user?.email || ''} 
                  disabled 
                  className="glass-input h-12 text-base px-4 border-border/30 bg-muted/30 text-muted-foreground opacity-80 cursor-not-allowed" 
                />
                <p className="text-xs text-muted-foreground font-medium">Contact support to change your email address.</p>
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground tracking-wide uppercase flex items-center">
                  <User className="w-4 h-4 mr-2 text-muted-foreground" />
                  Full Name
                </label>
                <Input 
                  value={formData.fullName} 
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                  required 
                  className="glass-input h-12 text-base px-4 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-bold text-foreground tracking-wide uppercase flex items-center">
                  <Building className="w-4 h-4 mr-2 text-muted-foreground" />
                  Organization
                </label>
                <Input 
                  value={formData.organization} 
                  onChange={(e) => setFormData({...formData, organization: e.target.value})} 
                  className="glass-input h-12 text-base px-4 focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
            
            <div className="pt-8 mt-4 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground font-medium">
                Changes may take a few minutes to propagate across all systems.
              </p>
              <Button 
                type="submit" 
                disabled={isSubmitting} 
                className={`w-full sm:w-auto px-8 h-12 rounded-xl font-bold transition-all shadow-md ${isSuccess ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20' : 'bg-primary hover:bg-primary/90 text-white shadow-primary/20'}`}
              >
                {isSubmitting ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving Changes...</>
                ) : isSuccess ? (
                  <><CheckCircle2 className="mr-2 h-5 w-5" /> Saved Successfully</>
                ) : (
                  'Update Profile Details'
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
