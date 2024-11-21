import axios from "axios";

axios.defaults.withCredentials = true
const Backend_Server="https://homeganizebackend.onrender.com"

export async function signup(user) {
    return await axios.post('Backend_Server/signup', user)
}

export async function login(user) {
    return await axios.post('Backend_Server/login', user)
}

export async function logout(){
    return await axios.post('Backend_Server/logout')
}

export async function addTask(task){
    return await axios.post('Backend_Server/tasks', task)
}

export async function getGroup(){
    return await axios.get('Backend_Server/group')
}

export async function getTasks(){
    return await axios.get('Backend_Server/tasks')
}

export async function updateTask(taskId, update){
    return await axios.patch(`Backend_Server/tasks/${taskId}`, update)
}

export async function createGroup(groupName1){ //todo, find if it works if i change groupName1 -> groupName
    return await axios.post('Backend_Server/group', { groupName: groupName1 })
}

export async function addGroupToUser(groupName){
    return await axios.patch('Backend_Server/user/addGroupToUser', {groupName: groupName})
}

export async function leaveGroup(){
    return await axios.patch('Backend_Server/group/leave')
}

export async function getUsernameById(userId){
    return await axios.get('Backend_Server/group/usernameById', {userId: userId})
}

export async function verification(){
    return await axios.get('Backend_Server/auth/verify')
}

export async function getUsers() {
    return await axios.get('Backend_Server/group/users')
    
}

export async function saveMessage(data) {
    return await axios.post('Backend_Server/save-message', data)
    
}

export async function getMessages(groupId){
return axios.get(`Backend_Server/get-messages/${groupId}`)
}

export async function getMe() {
    return axios.get("Backend_Server/me");
    
}