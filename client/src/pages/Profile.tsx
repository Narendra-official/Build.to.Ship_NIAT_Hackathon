import React, { useState } from 'react';
import { useApp } from '../lib/store';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Loader2 } from 'lucide-react';

export default function Profile() {
  const { user, updateUserProfile } = useApp();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    organization: user?.organization || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateUserProfile(formData.fullName, formData.organization);
    } catch (e) {
      // Error handled in store
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto relative z-10 pt-4">
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-20 h-20 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-3xl shadow-lg border-4 border-background">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{user?.name}</h1>
          <p className="text-muted-foreground mt-1">{user?.organization || 'No Organization'} • Member Since 2026</p>
        </div>
      </div>

      <Card className="shadow-lg shadow-primary/5">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your personal and organizational details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email Address (Read-only)</label>
              <Input value={user?.email || ''} disabled className="bg-muted text-muted-foreground border-border" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input 
                value={formData.fullName} 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                required 
                className="bg-background/50 border-border"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Organization / Company</label>
              <Input 
                value={formData.organization} 
                onChange={(e) => setFormData({...formData, organization: e.target.value})} 
                className="bg-background/50 border-border"
              />
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Profile'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
