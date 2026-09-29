import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useApp } from '../lib/store';
import { Building2, Settings2 } from 'lucide-react';

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
    <div className="space-y-8 w-full max-w-none relative z-10 pb-8">
      {/* Settings Header */}
      <div className="w-full">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm sm:text-base">Configure your building preferences and AI parameters.</p>
      </div>

      {/* Grid Layout for Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
        
        {/* Building Profile Card */}
        <Card className="shadow-lg shadow-primary/5 h-full flex flex-col">
          <CardHeader className="border-b border-border bg-muted/30 pb-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-primary" />
              <CardTitle>Building Profile</CardTitle>
            </div>
            <CardDescription className="mt-1">Basic information about your facility.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1">
            <form onSubmit={handleSaveProfile} className="space-y-6 flex flex-col h-full">
              <div className="space-y-5 flex-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Building Name</label>
                  <Input value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} required className="bg-background/50 max-w-lg border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Total Floor Area (sq ft)</label>
                  <Input type="number" value={profile.area} onChange={(e) => setProfile({...profile, area: Number(e.target.value)})} required className="bg-background/50 max-w-lg border-border" />
                </div>
              </div>
              <div className="pt-4 border-t border-border mt-auto">
                <Button type="submit" className="shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* AI Preferences Card */}
        <Card className="shadow-lg shadow-primary/5 border-emerald-500/20 relative overflow-hidden h-full flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent -z-10"></div>
          <CardHeader className="border-b border-border bg-emerald-500/5 pb-4">
            <div className="flex items-center space-x-2">
              <Settings2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <CardTitle>AI Preferences</CardTitle>
            </div>
            <CardDescription className="mt-1 text-emerald-700/80 dark:text-emerald-400/80">Control how much the AI can change automatically.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 flex-1">
            <form onSubmit={handleSavePreferences} className="space-y-6 flex flex-col h-full">
              <div className="space-y-4 flex-1">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">AI Autonomy Level</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className={`p-5 border rounded-xl flex items-start space-x-4 cursor-pointer transition-colors shadow-sm h-full ${prefs.aiLevel === 'auto' ? 'border-primary bg-primary/10 dark:bg-primary/5' : 'border-border hover:bg-muted/50 bg-background/50'}`}>
                    <input type="radio" name="ai_level" checked={prefs.aiLevel === 'auto'} onChange={() => setPrefs({...prefs, aiLevel: 'auto'})} className="mt-1" />
                    <div>
                      <span className="font-semibold block text-foreground">Fully Autonomous <span className="text-xs text-primary font-bold ml-1 tracking-wider uppercase">(Recommended)</span></span>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">AI automatically applies all high-confidence optimizations without manual approval.</p>
                    </div>
                  </label>
                  
                  <label className={`p-5 border rounded-xl flex items-start space-x-4 cursor-pointer transition-colors shadow-sm h-full ${prefs.aiLevel === 'manual' ? 'border-primary bg-primary/10 dark:bg-primary/5' : 'border-border hover:bg-muted/50 bg-background/50'}`}>
                    <input type="radio" name="ai_level" checked={prefs.aiLevel === 'manual'} onChange={() => setPrefs({...prefs, aiLevel: 'manual'})} className="mt-1" />
                    <div>
                      <span className="font-semibold block text-foreground">Review Only</span>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">AI generates insights and recommendations, but requires your manual approval before applying.</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-border">
                <label className="text-sm font-medium text-foreground">Analysis Frequency</label>
                <select 
                  className="flex h-12 w-full max-w-sm rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors shadow-sm"
                  value={prefs.frequency}
                  onChange={(e) => setPrefs({...prefs, frequency: e.target.value})}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              <div className="pt-4 mt-auto">
                <Button type="submit" variant="outline" className="bg-background/50 hover:bg-muted/50 transition-colors border-border">Update Preferences</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
