import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from '../lib/store';
import { Building2, Settings2, Shield, Zap } from 'lucide-react';

export default function Settings() {
  const { buildingProfile, preferences, updateProfile, updatePreferences } = useApp();
  
  const [profile, setProfile] = useState(buildingProfile);
  const [prefs, setPrefs] = useState(preferences);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile.name, profile.area);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    updatePreferences(prefs.aiLevel, prefs.frequency);
  };

  return (
    <div className="space-y-10 w-full max-w-none relative z-10 pb-12 animate-fade-in-up">
      {/* Settings Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 stagger-1">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase mb-2">
            <Settings2 className="w-4 h-4" />
            <span>Configuration</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            System Settings
          </h1>
          <p className="text-muted-foreground text-base max-w-xl leading-relaxed">
            Configure your facility profile and customize the autonomous behavior of the AI engine.
          </p>
        </div>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full stagger-2">
        
        {/* Building Profile Card */}
        <Card className="glass-elevated border border-border/50 shadow-xl flex flex-col h-full rounded-[1.5rem] overflow-hidden">
          <CardHeader className="bg-background/40 border-b border-border/50 pb-5">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Facility Profile</CardTitle>
                <CardDescription className="mt-1 font-medium text-muted-foreground">Core metadata used for baseline AI calculations.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 flex-1">
            <form onSubmit={handleSaveProfile} className="space-y-8 flex flex-col h-full">
              <div className="space-y-6 flex-1">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground tracking-wide uppercase">Facility Name</label>
                  <Input 
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})} 
                    required 
                    className="glass-input h-12 text-base px-4 border-border/50 w-full" 
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-foreground tracking-wide uppercase flex justify-between">
                    <span>Total Floor Area</span>
                    <span className="text-muted-foreground font-medium lowercase">sq ft</span>
                  </label>
                  <Input 
                    type="number" 
                    value={profile.area} 
                    onChange={(e) => setProfile({...profile, area: Number(e.target.value)})} 
                    required 
                    className="glass-input h-12 text-base px-4 border-border/50 w-full" 
                  />
                </div>
              </div>
              <div className="pt-6 border-t border-border/50 mt-auto">
                <Button type="submit" className="w-full sm:w-auto px-8 rounded-xl font-bold bg-foreground text-background hover:bg-foreground/90 transition-all shadow-md">
                  Save Facility Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* AI Preferences Card */}
        <Card className="glass-panel relative overflow-hidden h-full flex flex-col border border-primary/20 shadow-lg group">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-50 pointer-events-none"></div>
          <CardHeader className="bg-primary/5 border-b border-primary/20 pb-5 z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30 shadow-sm relative">
                <Zap className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse border-2 border-background"></span>
              </div>
              <div>
                <CardTitle className="text-lg font-bold">Autonomous Engine</CardTitle>
                <CardDescription className="mt-1 font-medium text-primary/80">Control decision authority and analysis frequency.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8 flex-1 z-10">
            <form onSubmit={handleSavePreferences} className="space-y-8 flex flex-col h-full">
              <div className="space-y-5 flex-1">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Operational Authority</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`relative p-5 rounded-2xl flex flex-col items-start cursor-pointer transition-all duration-300 shadow-sm h-full border ${prefs.aiLevel === 'auto' ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.15)]' : 'border-border/50 hover:border-primary/50 bg-background/60 backdrop-blur-md'}`}>
                    <div className="flex items-center mb-3">
                      <input type="radio" name="ai_level" checked={prefs.aiLevel === 'auto'} onChange={() => setPrefs({...prefs, aiLevel: 'auto'})} className="w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2 accent-primary mr-3" />
                      <span className="font-bold text-foreground">Fully Autonomous</span>
                    </div>
                    {prefs.aiLevel === 'auto' && (
                      <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">Active</span>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">AI automatically executes high-confidence optimizations without manual approval.</p>
                  </label>
                  
                  <label className={`relative p-5 rounded-2xl flex flex-col items-start cursor-pointer transition-all duration-300 shadow-sm h-full border ${prefs.aiLevel === 'manual' ? 'border-primary bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.15)]' : 'border-border/50 hover:border-primary/50 bg-background/60 backdrop-blur-md'}`}>
                    <div className="flex items-center mb-3">
                      <input type="radio" name="ai_level" checked={prefs.aiLevel === 'manual'} onChange={() => setPrefs({...prefs, aiLevel: 'manual'})} className="w-4 h-4 text-primary bg-background border-border focus:ring-primary focus:ring-2 accent-primary mr-3" />
                      <span className="font-bold text-foreground">Review Only</span>
                    </div>
                    {prefs.aiLevel === 'manual' && (
                      <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">Active</span>
                    )}
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">AI generates insights and recommendations, but requires manual approval.</p>
                  </label>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-border/50">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Analysis Frequency</label>
                <div className="relative max-w-sm">
                  <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select 
                    className="appearance-none flex h-12 w-full rounded-xl border border-border/50 bg-background/60 backdrop-blur-md pl-10 pr-10 py-2 text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all shadow-sm hover:bg-background cursor-pointer"
                    value={prefs.frequency}
                    onChange={(e) => setPrefs({...prefs, frequency: e.target.value})}
                  >
                    <option value="hourly">Continuous (Hourly scans)</option>
                    <option value="daily">Standard (Daily scans)</option>
                    <option value="weekly">Relaxed (Weekly scans)</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 mt-auto">
                <Button type="submit" className="w-full sm:w-auto px-8 rounded-xl font-bold bg-primary text-white hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:shadow-primary/40">
                  Update Engine Preferences
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
