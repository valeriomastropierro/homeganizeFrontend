// src/api/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // puoi configurare l'URL base qui

axios.defaults.withCredentials = true

export async function signup(user) {
    return await axios.post(`${API_URL}/signup`, user);
}

export async function login(user) {
    return await axios.post(`${API_URL}/login`, user);
}
