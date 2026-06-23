import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const getUpcomingMatches = async () => {
  const response = await api.get('/matches');
  return response.data;
};

export const getMatchDetails = async (id) => {
  const response = await api.get(`/matches/${id}`);
  return response.data;
};

export const getTeamData = async (id) => {
  const response = await api.get(`/teams/${id}`);
  return response.data;
};

export const getAnalysis = async (matchId) => {
  const response = await api.get(`/analysis/${matchId}`);
  return response.data;
};

export const generateAnalysis = async (matchId) => {
  const response = await api.post('/analysis/generate', { matchId });
  return response.data;
};

export default api;
