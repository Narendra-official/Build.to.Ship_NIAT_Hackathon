import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { analysis as apiAnalysis, auth as apiAuth } from './api';

export type AIResult = {
  energyAnalysis: string;
  waterAnalysis: string;
  wasteAnalysis: string;
  unusualPatterns: string[];
  possibleCauses: string[];
  sustainabilityProblems: string[];
  aiRecommendations: string[];
  estimatedCostSavings: number;
  estimatedCO2Reduction: number;
  resourceSavingOpportunities: string[];
};

export type Analysis = {
  id: string;
  name: string;
  building: string;
  target: string;
  period?: string;
  status: 'Completed' | 'Issues Found' | 'Processing';
  date: string;
  inputs?: any;
  result?: AIResult;
};

export type ActionLogEntry = {
  id: string;
  date: string;
  action: string;
  type: string;
  impact: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  organization?: string;
};

export type ScheduleApplication = {
  id: string;
  building: string;
  previousSchedule: string;
  proposedSchedule: string;
  date: string;
  status: 'Pending Approval' | 'Approved' | 'Applied' | 'Rejected';
};

type AppState = {
  user: User | null;
  loadingAuth: boolean;
  theme: 'light' | 'dark';
  buildingProfile: { name: string; area: number };
  preferences: { aiLevel: string; frequency: string };
  analyses: Analysis[];
  actionLog: ActionLogEntry[];
  schedules: ScheduleApplication[];
  
  toggleTheme: () => void;
  checkAuth: () => Promise<void>;
  setUser: (u: User | null) => void;
  logout: () => Promise<void>;
  updateProfile: (name: string, area: number) => void;
  updatePreferences: (aiLevel: string, frequency: string) => void;
  updateUserProfile: (name: string, organization: string) => Promise<void>;
  runAnalysis: (data: any) => Promise<void>;
  deleteAnalysis: (id: string) => Promise<void>;
  submitSchedule: (app: Omit<ScheduleApplication, 'id' | 'date' | 'status'>) => void;
};

const defaultState: AppState = {
  user: null,
  loadingAuth: true,
  theme: 'light',
  buildingProfile: { name: 'HQ - Building A', area: 45000 },
  preferences: { aiLevel: 'auto', frequency: 'daily' },
  analyses: [],
  actionLog: [],
  schedules: [],
  
  toggleTheme: () => {},
  checkAuth: async () => {},
  setUser: () => {},
  logout: async () => {},
  updateProfile: () => {},
  updatePreferences: () => {},
  updateUserProfile: async () => {},
  runAnalysis: async () => {},
  deleteAnalysis: async () => {},
  submitSchedule: () => {},
};

const AppContext = createContext<AppState>(defaultState);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  const [buildingProfile, setBuildingProfile] = useState(defaultState.buildingProfile);
  const [preferences, setPreferences] = useState(defaultState.preferences);
  const [analyses, setAnalyses] = useState<Analysis[]>([]);
  const [actionLog, setActionLog] = useState(defaultState.actionLog);
  const [schedules, setSchedules] = useState<ScheduleApplication[]>([]);

  // Check Auth on Mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Local storage for basic UI settings
  useEffect(() => {
    const saved = localStorage.getItem('wattwise_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.buildingProfile) setBuildingProfile(parsed.buildingProfile);
        if (parsed.preferences) setPreferences(parsed.preferences);
        if (parsed.actionLog) setActionLog(parsed.actionLog);
        if (parsed.schedules) setSchedules(parsed.schedules);
      } catch (e) {
        console.error("Failed to parse state", e);
      }
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wattwise_settings', JSON.stringify({
      theme, buildingProfile, preferences, actionLog, schedules
    }));
  }, [theme, buildingProfile, preferences, actionLog, schedules]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const checkAuth = async () => {
    try {
      setLoadingAuth(true);
      const res = await apiAuth.me();
      setUser(res.user);
      await fetchUserAnalyses();
    } catch (e) {
      setUser(null);
    } finally {
      setLoadingAuth(false);
    }
  };

  const fetchUserAnalyses = async () => {
    try {
      const data = await apiAnalysis.fetchAnalyses();
      setAnalyses(data);
    } catch (e) {
      console.error("Failed to fetch analyses", e);
    }
  };

  const logout = async () => {
    try {
      await apiAuth.logout();
      setUser(null);
      setAnalyses([]);
      toast.success("Logged out successfully");
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const updateProfile = (name: string, area: number) => {
    setBuildingProfile({ name, area });
    toast.success('Building profile saved correctly.');
  };

  const updatePreferences = (aiLevel: string, frequency: string) => {
    setPreferences({ aiLevel, frequency });
    toast.success('Preferences updated successfully.');
  };

  const updateUserProfile = async (name: string, organization: string) => {
    try {
      const res = await apiAuth.updateProfile({ fullName: name, organization });
      setUser(res.user);
      toast.success('Profile updated successfully.');
    } catch (e: any) {
      toast.error(e.response?.data?.error || 'Failed to update profile');
      throw e;
    }
  };

  const runAnalysis = async (data: any) => {
    toast.info('AI is analyzing your sustainability data...');
    try {
      const response = await apiAnalysis.runAnalysis(data);
      setAnalyses(prev => [response, ...prev]);
      toast.success(`Analysis completed successfully.`);
      setActionLog(prev => [{
        id: Date.now().toString(),
        date: 'Just now',
        action: `Ran ${data.name} AI Analysis`,
        type: 'AI',
        impact: `Est. -${response.result?.estimatedCO2Reduction}t CO2`
      }, ...prev]);
    } catch (err: any) {
      toast.error(err.response?.data?.error || err.message || 'Analysis failed.');
      throw err;
    }
  };

  const deleteAnalysis = async (id: string) => {
    try {
      await apiAnalysis.deleteAnalysis(id);
      setAnalyses(prev => prev.filter(a => a.id !== id));
      toast.success('Analysis deleted.');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to delete analysis');
    }
  };

  const submitSchedule = (app: Omit<ScheduleApplication, 'id' | 'date' | 'status'>) => {
    const newApp: ScheduleApplication = {
      ...app,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'Pending Approval'
    };
    setSchedules(prev => [newApp, ...prev]);
    
    setActionLog(prev => [{
      id: Date.now().toString(),
      date: 'Just now',
      action: `Schedule Submitted for ${app.building}`,
      type: 'Submitted',
      impact: 'Pending Review'
    }, ...prev]);
    
    toast.success('Schedule application submitted successfully.');
  };

  return (
    <AppContext.Provider value={{
      user, loadingAuth, theme, buildingProfile, preferences, analyses, actionLog, schedules,
      toggleTheme, checkAuth, setUser, logout, updateProfile, updatePreferences, updateUserProfile, runAnalysis, deleteAnalysis, submitSchedule
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
