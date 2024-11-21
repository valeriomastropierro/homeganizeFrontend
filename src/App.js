import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginPage } from "./pagine/LoginPage";
import { SignupPage } from "./pagine/SignupPage";
import { TasksPage } from "./pagine/TasksPage";
import { ChatPage } from "./pagine/ChatPage";
import { Page404 } from "./pagine/Page404";
import { GroupPage } from "./pagine/GroupPage";
import ProtectedRoutes from './utilis/protectedRoute';
import { verification, getUsers, getGroup } from './api';

function App() {
  const [loadingVerification, setLoadingVerification] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [state, setState] = useState({
    loading: true,
    users: [],
    group: null,
  })

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoadingVerification(true)
        const res = await verification();
        return setIsAuthenticated(res.status === 200)
      } catch (err) {
        console.error('internal error', err);
        setIsAuthenticated(false);
      } finally {
        setLoadingVerification(false);
      }
    };
    checkAuth();
  }, []);

  //Get all tasks and users
useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setState(prev => ({ ...prev, users: res.data.usersFound.users }));
      } catch (err) {
        console.error("Error fetching tasks", err);
      }
    };
    
    const fetchGroup = async () => {
      try {
        const res = await getGroup();
        if (res.data.groupInfo){
        setState(prev => ({ ...prev, group: res.data.groupInfo }));}
      } catch (err) {
        console.error('Errore di caricamento gruppo:', err);
      } finally {
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    if (isAuthenticated) {
      fetchUsers();
      fetchGroup();
    }
  }, [isAuthenticated]); 




  if (loadingVerification) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="container-fluid">
        <header className="row fixed-top">
          <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setState={setState}/>
        </header>

        <div className="row">
          {isAuthenticated &&
            <nav className="sidebar col-2 d-none d-sm-block text-center" style={{ paddingTop: '70px', height: '100vh' }}>
              <Sidebar />
            </nav>
          }
          <div className="col" style={{ paddingTop: '56px' }}>
            <main className="main-content text-center">
              <Routes>
                {/* Route di base */}
                <Route path='/' element={isAuthenticated ? <Navigate to='/tasks' /> : <Navigate to='/login' />} />

                {/* Rotte protette */}
                <Route element={<ProtectedRoutes isAuthenticated={!isAuthenticated} />}>
                <Route path="/login" element={<LoginPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<SignupPage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
                </Route>

                {/* Rotte protette */}
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
                  <Route path="/group" element={<GroupPage state={state} setState={setState}/>} />
                  <Route path="/tasks" element={<TasksPage group={state.group} users={state.users}/>} />
                  <Route path="/chat" element={<ChatPage group={state.group} users={state.users}/>} />
                </Route>

                {/* Route di errore */}
                <Route path="*" element={<Page404 />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;