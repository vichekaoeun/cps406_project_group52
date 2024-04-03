import React, { useState } from "react";
import TitleCard from '../components/TitleCard';
import './Login.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const registerTitle = "register";

    return (
        <div className="Main-Container">
            <TitleCard title={registerTitle} />
        </div>
    )
}

export default Register;