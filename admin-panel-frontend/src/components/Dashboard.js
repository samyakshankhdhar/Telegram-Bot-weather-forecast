// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    };

    fetchData();
  }, [token]);

  const handleBlockUser = async (id) => {
    await axios.put(`${process.env.REACT_APP_API_URL}/admin/block/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.map(user => user.id === id ? { ...user, isBlocked: true } : user));
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/admin/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUsers(users.filter(user => user.id !== id));
  };

  const handleUpdateSettings = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/admin/settings`, settings, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} - {user.isBlocked ? 'Blocked' : 'Active'}
            <button onClick={() => handleBlockUser(user.id)}>Block</button>
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2>Settings</h2>
      <form onSubmit={handleUpdateSettings}>
        <label>
          API Key:
          <input
            type="text"
            value={settings.apiKey || ''}
            onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
          />
        </label>
        <button type="submit">Update Settings</button>
      </form>
    </div>
  );
};

export default Dashboard;
;


