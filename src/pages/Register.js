import React, { useState } from "react";
import './Login.css';
import TitleCard from '../components/TitleCard';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [employee_id, setEmployeeID] = useState('')
  const [message, setMessage] = useState('');
  const loginTitle = "register";

  //const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id, username, password }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Registration successful. You can now log in.');
      } else {
        setMessage(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage('Registration failed due to a technical issue. Please try again later.');
    }
  };

  return (
    <div className="Main-Container">
      <TitleCard title={loginTitle} />
      <div className="Authentication">
        <form id="form" onSubmit={handleRegister}>
          <label>
            EmployeeID:
            <input
              type="text"
              value={employee_id}
              onChange={(e) => setEmployeeID(e.target.value)}
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type='submit'>Register</button>
          <button><Link className='Link' to="/" >*Back to login</Link></button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;