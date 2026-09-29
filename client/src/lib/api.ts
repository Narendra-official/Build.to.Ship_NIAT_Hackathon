import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const auth = {
  login: async (data: any) => {
    const res = await api.post('/auth/login', data);
    return res.data;
  },
  register: async (data: any) => {
    const res = await api.post('/auth/register', data);
    return res.data;
  },
  logout: async () => {
    const res = await api.post('/auth/logout');
    return res.data;
  },
  me: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },
  updateProfile: async (data: { fullName: string, organization?: string }) => {
    const res = await api.put('/auth/me', data);
    return res.data;
  }
};

export const analysis = {
  fetchAnalyses: async () => {
    const res = await api.get('/analysis');
    return res.data;
  },
  runAnalysis: async (data: any) => {
    const res = await api.post('/analysis/run', data);
    return res.data;
  },
  deleteAnalysis: async (id: string) => {
    const res = await api.delete(`/analysis/${id}`);
    return res.data;
  }
};

export default api;
