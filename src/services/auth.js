import axios from "axios";

const API = "https://personal-finance-p2p-backend.onrender.com/api/auth";

export const register = (data) => axios.post(`${API}/register`, data);
export const verifyOtp = (data) => axios.post(`${API}/verify-otp`, data);
export const login = (data) => axios.post(`${API}/login`, data);
