import Axios from "axios";

export const prefix = "/api/v1";
export const baseurl = "https://levya-careers-backend-ybmd.vercel.app";
export const url = baseurl + prefix;
const API = Axios.create({ baseURL: url });

export const fetchAllDomains = async () =>
  API.get('/domains');

export const fetchAllJobs = async () =>
  API.get('/jobs');

export const addJob = async (body) =>
  API.post('/jobs', body);

export const addDomain = async (body) =>
  API.post('/domains', body);

export const deleteDomain = async (id) =>
  API.delete(`/domains/${id}`);
