import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const auth = {
  login: async (data: any) => {
    const res = await api.post('/auth/login', data);
    return res.data.data;
  },
  register: async (data: any) => {
    const res = await api.post('/auth/register', data);
    return res.data.data;
  },
  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data.data;
  },
  me: async () => {
    const res = await api.get('/auth/me');
    return res.data.data;
  },
  updateProfile: async (data: { fullName: string, organization?: string }) => {
    const res = await api.put('/auth/me', data);
    return res.data.data;
  }
};

const formatAnalysis = (a: any) => ({
  id: a.id,
  name: `Analysis #${(a.id || 'xxxx').substring(0, 4).toUpperCase()}`,
  building: 'HQ - Building A',
  target: 'Emissions',
  status: 'Completed',
  date: new Date(a.created_at || Date.now()).toLocaleDateString(),
  inputs: {
    electricity: a.energy_records?.amount || "0",
    water: "0",
    waste: "0"
  },
  result: {
    energyAnalysis: a.summary || '',
    waterAnalysis: '',
    wasteAnalysis: '',
    unusualPatterns: [],
    possibleCauses: [],
    sustainabilityProblems: a.findings?.map((f:any) => f.description) || [],
    aiRecommendations: a.recommendations?.map((r:any) => r.action || r.title) || [],
    estimatedCostSavings: Math.floor(Math.random() * 500) + 100, // mock cost savings
    estimatedCO2Reduction: a.footprint_kg_co2 || 0,
    resourceSavingOpportunities: []
  }
});

export const analysis = {
  fetchAnalyses: async () => {
    const res = await api.get('/analysis');
    return (res.data.data || []).map(formatAnalysis);
  },
  runAnalysis: async (data: any) => {
    const res = await api.post('/analysis/run', data);
    return formatAnalysis(res.data.data);
  },
  deleteAnalysis: async (id: string) => {
    const res = await api.delete(`/analysis/${id}`);
    return res.data.data;
  }
};

export default api;
