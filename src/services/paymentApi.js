import axios from "axios";

const API = "https://personal-finance-p2p-backend.onrender.com/api/payment";

export const verifyUser = (email) =>
  axios.get(`https://personal-finance-p2p-backend.onrender.com/api/payment/verify-user?email=${email}`);

export const createOrder = (data, token) =>
  axios.post(`${API}/create-order`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const paymentSuccess = (data, token) =>
  axios.post(`${API}/success`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getTransactionHistory = (token) =>
  axios.get(`${API}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
