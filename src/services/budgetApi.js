// src/api/budgetApi.js
import axios from "axios";

const API = "https://personal-finance-p2p-backend.onrender.com/api/budget";

// Add new budget plan
export const createBudget = (data, token) =>
  axios.post(`${API}/`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get all budgets for logged-in user
export const getBudgets = (token) =>
  axios.get(`${API}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Get a single budget by ID
export const getBudgetById = (id, token) =>
  axios.get(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Update budget
export const updateBudget = (id, data, token) =>
  axios.put(`${API}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete budget
export const deleteBudget = (id, token) =>
  axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
