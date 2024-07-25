import { Credentials } from "../types";
import { api } from "./client";

export const login = (credential: Credentials) => api.post(`/api/v1/auth/login`, credential);
export const self = () => api.get(`/api/v1/auth/self`);
export const doctorInfo = () => api.get(`/api/v1/auth/getDoctors`);
export const logout = () => api.post(`/api/v1/auth/logout`);
