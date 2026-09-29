import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { X, Upload, Loader2, Leaf } from 'lucide-react';
import { useApp } from '../lib/store';

export default function NewAnalysisModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { buildingProfile, runAnalysis } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    electricity: '',
    water: '',
    waste: '',
    fuel: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name) return setError('Analysis name is required.');
    if (!formData.startDate || !formData.endDate) return setError('Analysis period dates are required.');
    if (isNaN(Number(formData.electricity)) || Number(formData.electricity) < 0) return setError('Electricity consumption must be a valid positive number.');
    if (isNaN(Number(formData.water)) || Number(formData.water) < 0) return setError('Water consumption must be a valid positive number.');
    if (isNaN(Number(formData.waste)) || Number(formData.waste) < 0) return setError('Waste generated must be a valid positive number.');

    setIsSubmitting(true);
    try {
      await runAnalysis({ ...formData, building: buildingProfile.name });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to run analysis. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4 sm:p-6">
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="flex justify-between items-center p-6 border-b border-border sticky top-0 bg-background/80 backdrop-blur-xl z-20">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <Leaf className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-foreground tracking-tight">New Sustainability Analysis</h2>
          </div>
          <button onClick={onClose} disabled={isSubmitting} className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors disabled:opacity-50">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-8 z-10 relative">
          {error && <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-xl border border-destructive/20">{error}</div>}
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
              <span className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center mr-2 text-xs">1</span>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl border border-border bg-background/30">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Analysis Name <span className="text-destructive">*</span></label>
                <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Q3 Energy Audit" required className="bg-background/50 border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Building / Facility</label>
                <Input value={buildingProfile.name} disabled className="bg-muted text-muted-foreground border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Start Date <span className="text-destructive">*</span></label>
                <Input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required className="bg-background/50 border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">End Date <span className="text-destructive">*</span></label>
                <Input type="date" value={formData.endDate} onChange={(e) => setFormData({...formData, endDate: e.target.value})} required className="bg-background/50 border-border" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
              <span className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center mr-2 text-xs">2</span>
              Resource Consumption
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl border border-border bg-background/30">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Electricity (kWh) <span className="text-destructive">*</span></label>
                <Input type="number" step="0.1" value={formData.electricity} onChange={(e) => setFormData({...formData, electricity: e.target.value})} required className="bg-background/50 border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Water (Litres) <span className="text-destructive">*</span></label>
                <Input type="number" step="0.1" value={formData.water} onChange={(e) => setFormData({...formData, water: e.target.value})} required className="bg-background/50 border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Waste (kg) <span className="text-destructive">*</span></label>
                <Input type="number" step="0.1" value={formData.waste} onChange={(e) => setFormData({...formData, waste: e.target.value})} required className="bg-background/50 border-border" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex justify-between">
                  <span>Fuel / Transport</span>
                  <span className="text-muted-foreground font-normal text-xs">(Optional)</span>
                </label>
                <Input type="number" step="0.1" value={formData.fuel} onChange={(e) => setFormData({...formData, fuel: e.target.value})} className="bg-background/50 border-border" placeholder="Litres" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center">
              <span className="w-6 h-6 rounded-full bg-muted text-foreground flex items-center justify-center mr-2 text-xs">3</span>
              Data Upload
            </h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-background/30 hover:bg-background/50 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground mb-3" />
              <p className="text-sm font-semibold text-foreground">Upload sustainability data</p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">Supported formats: CSV, XLSX (Max 10MB)</p>
              <div className="flex items-center justify-center w-full">
                <input type="file" id="csv-upload" className="hidden" accept=".csv" />
                <label htmlFor="csv-upload" className="cursor-pointer bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                  Choose File
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-border">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting} className="bg-background/50 hover:bg-muted/50 transition-colors border-border">Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-[160px] shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Run AI Analysis'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
