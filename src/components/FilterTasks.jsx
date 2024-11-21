import React, { useState, useRef,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //per bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; //per le icone di bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min'; //per funzionalità interattive di Bootstrap

export default function FilterTask({onFilterSelectedClick}) {
    const [priorityFilter, setPriorityFilter] = useState('');

    const handleFilterChange = (newFilter) =>{
        setPriorityFilter(newFilter);
        onFilterSelectedClick(newFilter);
    };

    return (
        <div>
        <button className={`col btn ${priorityFilter==='urgent' ? 'btn-dark' : 'btn-secondary'} urgentFilterButton`}  onClick={() => handleFilterChange('urgent')}>URGENT</button>
        <button className={`col btn ${priorityFilter==='high' ? 'btn-dark' : 'btn-secondary'} hightFilterButton`}  onClick={() => handleFilterChange('high')}>HIGH</button>
        <button className={`col btn ${priorityFilter==='normal' ? 'btn-dark' : 'btn-secondary'} normalFilterButton`}  onClick={() => handleFilterChange('normal')}>NORMAL</button>
        <button className={`col btn ${priorityFilter==='low' ? 'btn-dark' : 'btn-secondary'} lowFilterButton`}  onClick={() => handleFilterChange('low')}>LOW</button>
        <button className={`col btn ${priorityFilter==='' ? 'btn-dark' : 'btn-secondary'} noneilterButton`}  onClick={() => handleFilterChange('')}>none</button>
        </div>
    )

}