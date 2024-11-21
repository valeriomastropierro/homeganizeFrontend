import React from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {

  const navigate = useNavigate()

  return (
    <ul className="nav flex-column">
      <li className="nav-item">
        <button className="nav-link active" onClick={() => navigate('/tasks')}>Tasks</button>
      </li>
      <li className="nav-item">
        <button className="nav-link active" onClick={() => navigate('/group')}>Gruppo</button>
      </li>
      <li className="nav-item">
        <button className="nav-link active" onClick={() => navigate('/chat')}>Chat</button>
      </li>
    </ul>
  );
}

export default Sidebar;
