import React, { useState, /*useEffect*/ } from 'react';
import './taskCard.css';
import { updateTask } from '../api/tasks';

//function TaskCard({ taskId, name, taskName, isCompleted, isExpanded, onMoreInfoClick, onTaskDone, taskDescription, priority, }) {
function TaskCard({task, isExpanded, onMoreInfoClick, onTaskDone}){

    const [stateIsCompleted, /*setStateIsCompleted*/] = useState(task.isCompleted);
    const [loading, setLoading] = useState(false);

    //esegue un warning, il secondo argomento dovrebbe essere un array ma la pagina funziona correttamente comunque
    //suppongo che potrebbe essere tolto come componente in quanto il comportamento è gestito dal componente
    //useEffect(() => { setStateIsCompleted(task.isCompleted) }, task.isCompleted); 

    async function handleDoneClick(e) {
        e.preventDefault();
        console.log('ID del task:', task._id);
        const updatedStatus = !stateIsCompleted;

        setLoading(true);
        try {
            await updateTask(task._id, { isCompleted: updatedStatus });
            onTaskDone(task._id, updatedStatus)
        } catch (errore) {
            console.error("Errore durante l'aggiornamento del task", errore)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={`col-12 col-lg-6 col-xl-4 card ${task.isCompleted ? 'complete' : ''} ${isExpanded ? 'expanded' : 'not-expanded'} 
    ${task.priority === 'urgent' ? 'task-urgent' : ''}`}>
            <div className="row g-0"> {/* g-0 rimuove il padding tra le colonne */}
                <div className="col-8 p-3"> {/* Padding per le info */}
                    <h5 className="task-name">{task.name}</h5>
                    <p className="task-person">{task.user.username}</p>
                    <span className="task-priority">{task.priority}</span> {/* Potenziale funzione per gestire più persone in un task */}
                </div>
                <div className="col-3 d-flex align-items-center"> {/* Usato flex per allineare le icone */}
                    <div className="icon-container me-2"> {/* margine a destra per spazio */}
                        {!task.isCompleted ?
                            <i className="bi bi-ban-fill" onClick={handleDoneClick} /> :
                            <i className="bi bi-check-circle-fill btn-primary" onClick={handleDoneClick} />}
                    </div>
                    <div className="icon-container">
                        {isExpanded ?
                            <i className="bi bi-arrow-up btn-secondary" onClick={onMoreInfoClick}></i> :
                            <i className="bi bi-arrow-down btn-secondary" onClick={onMoreInfoClick}></i>}
                    </div>
                </div>
            </div>
            <div className="row">
                {isExpanded && (
                    <div className="moreInfoContent col-12">
                        <p>{task.description}</p>
                    </div>)}
            </div>
            {loading && <p>Caricamento...</p>} {/* Mostra un messaggio di caricamento */}
        </div>

    );
}

//it gives default values for props
TaskCard.defaultProps = {
    task: {
        name: "nome persona",
        user: "utente",
        isCompleted: false,
        description: 'Descrizione del task',
        priority: 'normal',
    },
};


export default TaskCard;