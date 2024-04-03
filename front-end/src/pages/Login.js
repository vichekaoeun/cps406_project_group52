import React, { useState } from 'react';
import logo from './logo.svg';
import './Login.css';
import TitleCard from '../components/TitleCard';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Username:', username);
    console.log('Password:', password);
  }

  return (
    <div className="Main-Container">
      <TitleCard />
      <div className="Authentication">
        <form id="form" onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type='submit'>Login</button>
        </form>
        <div className="other-form">
          <div id="forgot-form">
            <button>*Forgot password</button>
            <button>*Forgot username</button>
          </div>
          <div id="create-form">
            <button>New User?</button>
            <button>*Sign up now!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
