import React, { useState } from "react";
import './Login.css';
import TitleCard from '../components/TitleCard';
import { Link } from 'react-router-dom';

function ChangeUsername() {
    const [newUsername, setNewUsername] = useState('');
    const [message, setMessage] = useState('');
    const titleU = "change username";

    const handleChangeUsername = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/reset_un', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newUsername }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Username changed successfully.');
            } else {
                setMessage(data.message || 'Username change failed. Please try again.');
            }
        } catch (error) {
            console.error('Username change failed:', error);
            setMessage('Username change failed due to a technical issue. Please try again later.');
        }

    }

    return (
        <div className="Main-Container">
            <TitleCard title={titleU} />
            <div className="Authentication">
                <form id="form" onSubmit={handleChangeUsername}>
                    <label>
                        New Username:
                        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
                    </label>
                    <button type='submit'>Change Username</button>
                    {message && <p>{message}</p>}
                    <button><Link className='Link' to="/" >*Back to login</Link></button>
                </form>
            </div>
        </div>
    )
}

export default ChangeUsername;