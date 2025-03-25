import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const [newNotification, setNewNotification] = useState({ title: '', message: '' });

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8075/ws'),
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/notifications', (message) => {
                    const notification = JSON.parse(message.body);
                    setNotifications(prev => [notification, ...prev]);
                });
            },
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('http://localhost:8075/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNotification),
            });
            setNewNotification({ title: '', message: '' });
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    return (
        <div>
            <h2>Send Notification</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                />
                <button type="submit">Send</button>
            </form>

            <h2>Notifications</h2>
            <div>
                {notifications.map((notification, index) => (
                    <div key={index} style={{ border: '1px solid #ccc', padding: '10px', margin: '5px' }}>
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationComponent;