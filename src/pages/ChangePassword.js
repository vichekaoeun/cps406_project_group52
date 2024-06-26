import React, { useState } from "react";
import './Login.css';
import TitleCard from '../components/TitleCard';
import { Link } from 'react-router-dom';

function ChangePassword() {
    const [employeeid, setEmployeeid] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const titleP = "change password";

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setMessage('New passwords do not match. Please try again.');
            return;
        } else {
            try {
                const response = await fetch('/reset_pw', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({employeeid, newPassword, confirmNewPassword }),
                });

                const data = await response.json();
                if (data.success) {
                    setMessage('Password changed successfully.');
                } else {
                    setMessage(data.message || 'Password change failed. Please try again.');
                }
            } catch (error) {
                console.error('Password change failed:', error);
                setMessage('Password change failed due to a technical issue. Please try again later.');
            }
        }
    }

    return (
        <div className="Main-Container">
            <TitleCard title={titleP} />
            <div className="Authentication">
                <form id="form" onSubmit={handleChangePassword}>
                    <label>
                        Employee ID:
                        <input type="text" value={employeeid} onChange={(e) => setEmployeeid(e.target.value)} />
                    </label>
                    <label>
                        New Password:
                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </label>
                    <label>
                        Confirm New Password:
                        <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                    </label>
                    <button type='submit'>Change Password</button>
                    {message && <p>{message}</p>}
                    <button><Link className='Link' to="/" >*Back to login</Link></button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;