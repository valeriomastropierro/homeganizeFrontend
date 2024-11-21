import React, { useState } from "react";
import { createGroup, addGroupToUser, leaveGroup } from "../api";
import "./groupPage.css";

export function GroupPage({ state, setState }) {
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChangeCreate(e) {
    setGroupName(e.target.value);
  }

  async function handleSubmitCreate(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
        const res = await createGroup(groupName);
        setSuccess('Gruppo creato con successo!');
        setState(prev => ({ ...prev, group: res.data.newGroup }));
        
    } catch (err) {
        setError('Errore nella creazione del gruppo. Riprova.');
    } finally {
        setLoading(false);
    }
}

  async function handleSubmitJoin(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const res = await addGroupToUser(groupName);
      setSuccess('Utente aggiunto al gruppo');
      setState(prev => ({ ...prev, group: res.data.newGroup }));
    } catch (err) {
      setError('Errore nell\'aggiunta al gruppo');
    } finally {
      setLoading(false);
    }
  }

  async function handleLeaveGroup() {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
        await leaveGroup();
        setSuccess('Hai abbandonato il gruppo');
        setState(prev => ({ ...prev, group: null }));
    } catch (err) {
        setError('Errore nell\'abbandono del gruppo');
    } finally {
        setLoading(false);
    }
}

  return (
    <div className="group-container">
      {state.group === null ? (
        <div>
          <h2>Gestione Gruppi</h2>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <div className="group-section">
            <h3>Crea un Nuovo Gruppo</h3>
            <form onSubmit={handleSubmitCreate} className="group-form">
              <label htmlFor="groupName">Nome Gruppo</label>
              <input
                type="text"
                id="groupName"
                name="groupName"
                placeholder="Inserisci nome gruppo"
                onChange={handleChangeCreate}
                required
              />
              <button type="submit" className="group-button" disabled={loading}>
                {loading ? 'Creazione...' : 'Crea Gruppo'}
              </button>
            </form>
          </div>

          <div className="group-section">
            <h3>Unisciti a un Gruppo Esistente</h3>
            <form onSubmit={handleSubmitJoin} className="group-form">
              <label htmlFor="groupNameJoin">Codice Gruppo</label>
              <input
                type="text"
                id="groupNameJoin"
                name="groupNameJoin"
                placeholder="Inserisci codice gruppo"
                onChange={handleChangeCreate}
                required
              />
              <button type="submit" className="group-button" disabled={loading}>
                {loading ? 'Connessione...' : 'Unisciti'}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="group-section">
          <h3>Sei già in un Gruppo</h3>
          <button onClick={handleLeaveGroup} className="leave-button" disabled={loading}>
            {loading ? 'Abbandono in corso...' : 'Abbandona Gruppo'}
          </button>
          {success && <div className="success-message">{success}</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </div>
  );
}
