import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const NotificationClient = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Load initial notifications
        fetch('http://localhost:8075/api/notifications')
            .then(res => res.json())
            .then(data => {
                setNotifications(data);
                setUnreadCount(data.length);
            });

        // Setup WebSocket
        const client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8075/ws'),
            reconnectDelay: 5000,
            onConnect: () => {
                client.subscribe('/topic/notifications', (message) => {
                    const newNotification = JSON.parse(message.body);
                    setNotifications(prev => [newNotification, ...prev]);
                    setUnreadCount(prev => prev + 1);
                });
            },
        });

        client.activate();
        return () => client.deactivate();
    }, []);

    const handleBellClick = () => {
        setIsOpen(!isOpen);
        setUnreadCount(0);
    };

    return (
        <div className="client-view">
            <div className="header">
                <h2>Client Dashboard</h2>
                <div className="notification-bell" onClick={handleBellClick}>
                    🔔
                    {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
                </div>
            </div>

            {isOpen && (
                <div className="notification-panel">
                    <h3>Recent Notifications</h3>
                    <div className="notification-list">
                        {notifications.map((notification, index) => (
                            <div key={index} className="notification-item">
                                <div className="notification-header">
                                    <span className="notification-title">{notification.title}</span>
                                    <span className="notification-time">{new Date(notification.id).toLocaleTimeString()}</span>
                                </div>
                                <div className="notification-body">{notification.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationClient;