import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SenderComponent = () => {
    const [newNotification, setNewNotification] = useState({ title: '', message: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8075/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNotification),
            });
            
            if(response.ok) {
                setNewNotification({ title: '', message: '' });
                navigate('/client');
            }
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    return (
        <div className="sender-container">
            <h2>Send New Notification</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={newNotification.title}
                        onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea
                        value={newNotification.message}
                        onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="send-button">Send Notification</button>
            </form>
        </div>
    );
};

export default SenderComponent;