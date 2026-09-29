import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
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

export const analysis = {
  fetchAnalyses: async () => {
    const res = await api.get('/analysis');
    return res.data.data;
  },
  runAnalysis: async (data: any) => {
    const res = await api.post('/analysis/run', data);
    return res.data.data;
  },
  deleteAnalysis: async (id: string) => {
    const res = await api.delete(`/analysis/${id}`);
    return res.data.data;
  }
};

export default api;
