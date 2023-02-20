import Axios from "axios";

export const prefix = "/api/v1";
export const baseurl = "https://levya-careers-backend-ybmd.vercel.app";
export const url = baseurl + prefix;
const API = Axios.create({ baseURL: url });

export const fetchAllDomains = async (token) =>
  API.get("/domains", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchAllJobs = async (token) =>
  API.get("/jobs", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchJobById = async (token, id) =>
  API.get(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addJob = async (body, token) =>
  API.post("/jobs", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateJob = async (body, token, id) =>
  API.patch(`/jobs/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const addDomain = async (body, token) =>
  API.post("/domains", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteDomain = async (token, id) =>
  API.delete(`/domains/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateDomain = async (token, id, body) =>
  API.patch(`/domains/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const signinUser = async (body) => API.post("/signin", body);

export const signupUser = async (body) => API.post("/signup", body);

export const fetchCurrentUser = async (token) =>
  API.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchAllUsers = async (token) =>
  API.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editUserProfile = async (token, body) =>
  API.patch("/users", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteUser = async (token, body) =>
  API.delete(`/users/${body.id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getUserById = async (token, id) =>
  API.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchAllAppearance = async (token) =>
  API.get("/appearance", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchAllTitles = async (token) =>
  API.get("/title", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createTitle = async (token, body) =>
  API.post("/title", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchTitleById = async (token, id) =>
  API.get(`/title/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editTitle = async (token, id, body) =>
  API.patch(`/title/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteTitle = async (token, id) =>
  API.delete(`/title/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchAllProfiles = async (token) =>
  API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const fetchProfileById = async (token, id) =>
  API.get(`/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createProfile = async (token, body) =>
  API.post("/profile", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const editProfile = async (token, id, body) =>
  API.patch(`/profile/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteProfile = async (token, id) =>
  API.delete(`/profile/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
