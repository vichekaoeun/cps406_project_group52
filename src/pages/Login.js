import React, { useState } from 'react';
import './Login.css';
import TitleCard from '../components/TitleCard';
import { Link } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const loginTitle = "login";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),

      });

      const data = await response.json();
      if (data.success) {
        setMessage('Login successful.');
      } else {
        setMessage(data.message || 'Login failed. Please try again.');
      }
    }
    catch (error) {
      console.error('Login failed:', error);
      setMessage('Login failed due to a technical issue. Please try again later.');
    }
  }

  return (
    <div className="Main-Container">
      <TitleCard title={loginTitle} />
      <div className="Authentication">
        <form id="form" onSubmit={handleLogin}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type='submit'>Login</button>
          {message && <p>{message}</p>}
        </form>
        <div className="other-form">
          <div id="forgot-form">
            <button><Link className='Link' to="/change-password">*Forgot password</Link></button>
            <button>*Forgot username</button>
          </div>
          <div id="create-form">
            <button>New User?</button>
            <button><Link className='Link' to="/register" >*Sign up now!</Link></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
