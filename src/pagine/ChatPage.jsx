import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import "./chatPage.css";
import { getMe, getMessages, saveMessage } from '../api';
import { format } from 'date-fns';

export function ChatPage({ group, users }) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [username, setUsername] = useState(null);
    const [socket, setSocket] = useState(null);
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    // loading messages and socket connection
    useEffect(() => {
        const fetchMessagesAndUserDetails = async () => {
            if (!group || !group._id) {
                console.error("Group or Group ID is undefined");
                return;  // if there is no group exit
            }
    
            setLoading(true);
            try {
                const [messagesRes, userRes] = await Promise.all([
                    getMessages(group._id),  
                    getMe()
                ]);
                setMessages(messagesRes.data);
                setUsername(userRes.data.username);
            } catch (error) {
                console.error("Errore nel caricamento dei dati:", error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchMessagesAndUserDetails();
    
        // Socket.io connection
        const newSocket = io("http://localhost:5000", {
            withCredentials: true,
        });
        setSocket(newSocket);
    
        newSocket.on("connect", () => {
            console.log("Connected to Socket.io server", newSocket.id);
            if (group && group._id) {
                newSocket.emit("join_group", group._id);
            }
        });
    
        newSocket.on("receive_message", (data) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        });
    
        return () => {
            newSocket.disconnect();
        };
    }, [group]); // if the group changes do this all again
    

    const sendMessage = async () => {
        if (!message.trim()) {
            console.error("Messaggio vuoto");
            return;
        }

        try {
            const data = {
                groupId: group._id,
                messageText: message,
            };

            const response = await saveMessage(data);
            const savedMessage = response.data;
            socket.emit("send_message", savedMessage);
            setMessage('');
        } catch (error) {
            console.error("Errore nell'invio del messaggio:", error);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (!group) return <h1>User has to be part of a group</h1>;
    if (loading) return <h1>Loading...</h1>;

    return (
        <div className="chat-container">
            <h2>{group?.groupName || "Chat di gruppo"}</h2>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.username === username ? "my-message" : "other-message"}`}>
                        <p><strong>{msg.username}</strong> <span className="timestamp">{format(new Date(msg.timestamp), 'MM/dd/yyyy, h:mm:ss a')}</span></p>
                        <p>{msg.message}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Scrivi un messaggio in ${group?.groupName || "Chat di gruppo"}...`}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}>Invia</button>
            </div>
        </div>
    );
}
