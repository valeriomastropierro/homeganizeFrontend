import axios from "axios";

axios.defaults.withCredentials = true

export async function signup(user) {
    return await axios.post('http://localhost:5000/signup', user)
}

export async function login(user) {
    return await axios.post('http://localhost:5000/login', user)
}

export async function logout(){
    return await axios.post('http://localhost:5000/logout')
}

export async function addTask(task){
    return await axios.post('http://localhost:5000/tasks', task)
}

export async function getGroup(){
    return await axios.get('http://localhost:5000/group')
}

export async function getTasks(){
    return await axios.get('http://localhost:5000/tasks')
}

export async function updateTask(taskId, update){
    return await axios.patch(`http://localhost:5000/tasks/${taskId}`, update)
}

export async function createGroup(groupName1){ //todo, find if it works if i change groupName1 -> groupName
    return await axios.post('http://localhost:5000/group', { groupName: groupName1 })
}

export async function addGroupToUser(groupName){
    return await axios.patch('http://localhost:5000/user/addGroupToUser', {groupName: groupName})
}

export async function leaveGroup(){
    return await axios.patch('http://localhost:5000/group/leave')
}

export async function getUsernameById(userId){
    return await axios.get('http://localhost:5000/group/usernameById', {userId: userId})
}

export async function verification(){
    return await axios.get('http://localhost:5000/auth/verify')
}

export async function getUsers() {
    return await axios.get('http://localhost:5000/group/users')
    
}

export async function saveMessage(data) {
    return await axios.post('http://localhost:5000/save-message', data)
    
}

export async function getMessages(groupId){
return axios.get(`http://localhost:5000/get-messages/${groupId}`)
}

export async function getMe() {
    return axios.get("http://localhost:5000/me");
    
}