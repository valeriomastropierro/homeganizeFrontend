// src/api/tasks.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

axios.defaults.withCredentials = true

export async function addTask(task) {
    return await axios.post(`${API_URL}/tasks#createtask`, task);
}

export async function getAllTasks() {
    return await axios.get(`${API_URL}/tasks`);
}

export async function updateTask(taskId, update) {
    return await axios.patch(`${API_URL}/tasks/${taskId}`, update);
}
