import React, { useState, useEffect } from 'react';
import api from './AxiosConfig';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    fetchUsers();
    fetchSettings();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await api.get('/admin/settings'); // Assuming there's an endpoint for settings
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleBlockUser = async (id) => {
    try {
      await api.put(`/admin/block/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/admin/delete/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleUpdateSettings = async () => {
    try {
      await api.post('/admin/settings', settings);
      alert('Settings updated');
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="heading">Admin Panel</h1>

      <div className="section">
        <h2 className="subheading">Users</h2>
        <ul className="user-list">
          {users.map(user => (
            <li className="user-item" key={user.id}>
              <span className="user-name">{user.name}</span>
              <div>
                <button className="button" onClick={() => handleBlockUser(user.id)}>Block</button>
                <button className="button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2 className="subheading">Update Settings</h2>
        <input
          className="input"
          type="text"
          value={settings.someSetting || ''}
          onChange={(e) => setSettings({ ...settings, someSetting: e.target.value })}
          placeholder="Update setting"
        />
        <button className="button" onClick={handleUpdateSettings}>Save Settings</button>
      </div>
    </div>
  );
}

export default App;
