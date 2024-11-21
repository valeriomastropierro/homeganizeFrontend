// src/api/groups.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

axios.defaults.withCredentials = true

export async function createGroup(groupName, userId) {
    return await axios.patch(`${API_URL}/group/${userId}`, { groupName });
}