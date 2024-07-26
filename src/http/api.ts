import { User } from "../store";
import { Consultation, Credentials } from "../types";
import { api } from "./client";

export const login = (credential: Credentials) => api.post(`/api/v1/auth/login`, credential);
export const self = () => api.get(`/api/v1/auth/self`);
export const doctorInfo = () => api.get(`/api/v1/auth/getDoctors`);
export const logout = () => api.post(`/api/v1/auth/logout`);
export const UserRegister = (userInfo: User) =>
	api.post(`/api/v1/auth/register`, userInfo, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
export const createConsult = (data: Consultation) => api.post(`/api/v1/consultation`, data);
export const getConsult = () => api.get(`/api/v1/consultation`);
export const getPatientConsult = (consultId: string) => api.get(`/api/v1/consultation/${consultId}`);
