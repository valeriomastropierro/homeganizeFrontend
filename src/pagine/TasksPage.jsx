import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";
import CreateTask from "../components/CreateTask";
import FilterTasks from "../components/FilterTasks";
import { getTasks } from "../api";

export function TasksPage(props) {

    const group = props.group;
    const [tasksList, setTasksList] = useState(null)
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [isFilterTabOpen, setIsFilterTabOpen] = useState(false)
    const [selectedPriorityFilter, setSelectedPriorityFilter] = useState('')
    const [createTaskModalVisible, setCreateTaskModalVisible] = useState(window.location.hash === '#createtask')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const fetchTasks = async () => {
            try {
        
                const res = await getTasks();
                setTasksList(res.data.tasksFound);
            } catch (err) {
                console.error("Error fetching tasks", err);
            } finally {
                setLoading(false)
            }
        }
        fetchTasks();
    }, []);

    const handleTaskCreated = async () => {

        try {
            setLoading(true);

            const res = await getTasks();
            setTasksList(res.data.tasksFound);
        } catch (err) {
            console.error("Error fetching tasks", err);
        } finally {
            setLoading(false)
        }
    }

    const handleMoreInfoClick = (taskId) => {
        setExpandedTaskId(expandedTaskId === taskId ? null : taskId)
    }

    const handleVisibleCreateTask = () => {
        const newVisibleState = !createTaskModalVisible
        window.location.hash = newVisibleState ? '#createtask' : '';
        setCreateTaskModalVisible(newVisibleState)
    }

    const handleTaskDone = (taskId, isCompleted) => {
        setTasksList(prevTasksList =>
            prevTasksList.map(task =>
                task._id === taskId ? { ...task, isCompleted } : task
            )
        );
    };

    const handleFilterselectedClick = (filter) => {
        setSelectedPriorityFilter(filter);
    }

    const renderTasks = (isCompleted) => {
        if (!tasksList) return <h1>errore</h1>
        return tasksList.map(task => (
            //checking if the task is completed, then checking if the filter criteria matches
            ((task.isCompleted === isCompleted) && (!selectedPriorityFilter || selectedPriorityFilter === task.priority) && ((
                <TaskCard
                    key={task._id}
                    task={task}
                    isExpanded={expandedTaskId === task._id}
                    onMoreInfoClick={() => handleMoreInfoClick(task._id)}
                    onTaskDone={handleTaskDone}
                />
            )))
        ))
    }

    if (loading) return <h1>Loading...</h1>

    if (!group) return <h1>User Has to be in one group</h1>


    return (
        <>
            <nav className="row">
                <button className='col-6 btn btn-dark createTaskButton' onClick={handleVisibleCreateTask}>Createtask</button> {/*onClick={onCreateTaskClick}*/}
                <button className='col-6 btn btn-dark createTaskButton' onClick={() =>setIsFilterTabOpen(!isFilterTabOpen)}>Filtra</button>
            </nav>
            <div>{isFilterTabOpen && <FilterTasks onFilterSelectedClick={handleFilterselectedClick} />}</div>
            <div>{createTaskModalVisible && <CreateTask onVisibleCreateTask={handleVisibleCreateTask} onTaskCreated={handleTaskCreated} users={props.users} />}
            </div>

            <div>{selectedPriorityFilter}</div>
            {/*tasks grid*/}

            <div className="notCompleted-task-row row">{renderTasks(false)}</div>
            <div className="completed-task-row row"><h1>Tasks Completed</h1>{renderTasks(true)}</div>
        </>
    )
}