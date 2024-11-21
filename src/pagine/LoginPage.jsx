import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import "./auth.css";

export function LoginPage({ isAuthenticated, setIsAuthenticated }) {
    const [user, setUser] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        setUser({ ...user, [e.target.id]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await login(user);
            if (res.status === 200) {
                setIsAuthenticated(true);
                navigate('/tasks');
            }
        } catch (error) {
            setError("Accesso fallito. Riprova.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <h2 className="auth-title">Accedi</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                />

                <button type="submit" className="auth-submit" disabled={loading}>
                    {loading ? "Accesso in corso..." : "Accedi"}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}
