import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CalendarCheck, ExternalLink } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { useApp } from '../lib/store';

export default function ScheduleModal({ isOpen, onClose, recommendation }: { isOpen: boolean, onClose: () => void, recommendation: string }) {
  const { user, buildingProfile, submitSchedule } = useApp();
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    organization: user?.organization || '',
    building: buildingProfile.name || ''
  });
  const [confirmed, setConfirmed] = useState(false);
  const googleFormUrl = import.meta.env.VITE_SCHEDULE_GOOGLE_FORM_URL;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmed) return;
    
    submitSchedule({
      building: formData.building,
      previousSchedule: 'Maintain 21°C until 22:00', // Mock baseline
      proposedSchedule: recommendation
    });
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-20">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-600 dark:text-blue-400">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">Schedule Application</h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-8 z-10 relative">
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
              <span className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center mr-2 text-xs">A</span>
              User Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl border border-border bg-background/30">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required className="bg-background/50 border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input value={formData.email} disabled className="bg-muted text-muted-foreground border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Organization</label>
                <Input value={formData.organization} onChange={(e) => setFormData({...formData, organization: e.target.value})} required className="bg-background/50 border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Building Name</label>
                <Input value={formData.building} onChange={(e) => setFormData({...formData, building: e.target.value})} required className="bg-background/50 border-border" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
              <span className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center mr-2 text-xs">B</span>
              Schedule Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 rounded-xl border border-border bg-muted/30">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Current Schedule</p>
                <p className="text-foreground font-medium">Maintain 21°C until 22:00</p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 shadow-sm">
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2">AI Recommended Schedule</p>
                <p className="text-foreground font-medium">{recommendation}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
              <span className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center mr-2 text-xs">C</span>
              Confirmation
            </h3>
            <label className="flex items-start space-x-3 p-4 rounded-xl border border-border bg-background/30 cursor-pointer hover:bg-background/50 transition-colors">
              <input 
                type="checkbox" 
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">I confirm that I want to apply this recommended schedule.</p>
                <p className="text-xs text-muted-foreground mt-1">This application will be sent to the facility manager for final approval.</p>
              </div>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-border gap-4">
            <div>
              {googleFormUrl && (
                <a href={googleFormUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  <ExternalLink className="w-4 h-4 mr-1" /> Open Google Form (External)
                </a>
              )}
            </div>
            <div className="flex space-x-3 w-full sm:w-auto">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto bg-background/50 hover:bg-muted/50 transition-colors border-border">Cancel</Button>
              <Button type="submit" disabled={!confirmed || !formData.fullName || !formData.organization} className="w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                Submit Schedule
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
