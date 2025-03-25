import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SenderComponent from './SenderComponent';
import NotificationClient from './NotificationClient';
import './NotificationStyles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <Link to="/client" className="nav-button">Client View</Link>
          <Link to="/sender" className="nav-button">Sender View</Link>
        </nav>

        <Routes>
          <Route path="/client" element={<NotificationClient />} />
          <Route path="/sender" element={<SenderComponent />} />
          <Route path="/" element={<NotificationClient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;