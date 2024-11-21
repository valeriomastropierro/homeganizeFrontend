import React, { useState } from 'react';
import './CreateTask.css';
import { addTask } from "../api";

export default function CreateTask({ onVisibleCreateTask, onTaskCreated, users }) {

    const [task, setTask] = useState({
        name: '',
        assinedUsername: '',
        description: '',
        //    taskDeadline: '',
        priority: '',
        isCompleted: false,
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)

    function handleChange(e) {
        setTask({ ...task, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const res = await addTask({task});
            console.log(res);
            setSuccess(true);
            setTask({
                name: '',
                assinedUsername: '',
                description: '',
                isCompleted: false,
            });
            onTaskCreated();
            onVisibleCreateTask();
        } catch (error) {
            console.error('Errore durante la creazione del task', error);
            setError('Si è verificato un errore durante la creazione del task. Riprova.');
        } finally {
            setLoading(false);
        }
    }


    return (

        <div className="overlay-create-task">
            <div className="create-task-window col-11 col-sm-8 ">
                <i className="bi bi-x-lg close-btn" onClick={onVisibleCreateTask}></i>
                <form className='task-form' action='post' onSubmit={handleSubmit}>
                    <label htmlFor="task-name-form" className="form-label">Task Name :</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name='name'
                        value={task.name}
                        onChange={handleChange}
                        placeholder="e.g., Take out the trash"
                        required
                    />

                    <label htmlFor="task-person-form" className="form-label">Person :</label>
                    <select
                        className="form-control"
                        id="assinedUsername"
                        name='assinedUsername'
                        value={task.assinedUsername}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Seleziona un utente</option>
                        to refactor state.user is 
                        {users && users.length > 0 ? (
                            users.map(user => (
                                <option key={user._id} value={user.username}>{user.username}</option>
                            ))
                        ) : (
                            <option value="" disabled>No users available</option>
                        )}
                    </select>

                    <label htmlFor="description" className="form-label">Description :</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name='description'
                        value={task.description}
                        onChange={handleChange}
                        placeholder="e.g., Description of the task"
                    />

                    {/*<label htmlFor="taskDeadline" className="form-label">Deadline :</label>*/}
                    {/*<input type="date" id="taskDeadline" onChange={handleChange} className="form-control" />*/}

                    <div className="priority-section">
                        <p>Priority Levels:</p>
                        {['urgent', 'high', 'normal', 'low'].map(priority => (
                            <div className="form-check" key={priority}>
                                <input
                                    type="radio"
                                    id={`priority-${priority}`}
                                    name="priority"
                                    value={priority}
                                    className="form-check-input"
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor={`priority-${priority}`} className="form-check-label">{priority.charAt(0).toUpperCase() + priority.slice(1)}</label>
                            </div>
                        ))}
                    </div>

                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">Task creato con successo</p>}


                    <button type="submit" className="btn btn-dark submit-btn" disabled={loading}>{loading ? "Creting..." : "Create a task"}</button>
                </form>
            </div>
        </div>
    );
}
