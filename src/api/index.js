import Axios from "axios";

export const prefix = "/api/v1";
export const baseurl = "https://levya-careers-backend-ybmd.vercel.app";
export const url = baseurl + prefix;
const API = Axios.create({ baseURL: url });

export const fetchAllDomains = async (token) =>
  API.get('/domains', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const fetchAllJobs = async (token) =>
  API.get('/jobs', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });


export const fetchJobById = async (token, id) =>
  API.get(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const addJob = async (body, token) =>
  API.post('/jobs', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const updateJob = async (body, token, id) =>
  API.patch(`/jobs/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

export const addDomain = async (body, token) =>
  API.post('/domains', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const deleteDomain = async (token, id) =>
  API.delete(`/domains/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const signinUser = async (body) =>
  API.post('/signin', body);

export const signupUser = async (body) =>
  API.post('/signup', body);

export const fetchCurrentUser = async (token) =>
  API.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const fetchAllUsers = async (token) =>
  API.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const editUserProfile = async (token, body) =>
  API.patch('/users', body, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const deleteUser = async (token, body) =>
  API.delete(`/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body
  });

export const fetchAllAppearance = async (token) =>
  API.get('/appearance', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const fetchAppliedAppearance = async (token) =>
  API.get('/appearance/applied', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

export const updateAppearance = async (token, id) =>
  API.patch(`/appearance/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });