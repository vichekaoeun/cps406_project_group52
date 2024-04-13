import React, { useState } from "react";
import './Login.css';
import TitleCard from '../components/TitleCard';
import { Link } from 'react-router-dom';

function Report() {
    const loginTitle = "Bug Report Form";
    const [reportNumber, setReportNumber] = useState('');
    const [bugType, setBugType] = useState('');
    const [summary, setSummary] = useState('');
    const [updatesRequested, setUpdatesRequested] = useState(false);
    const [progressRequested, setProgressRequested] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ reportNumber, bugType, summary, updatesRequested, progressRequested }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Bug report is created successfully!');
            } else {
                setMessage(data.message || 'Submit failed. Please try again.');
            }
        } catch (error) {
            console.error('Submit failed:', error);
            setMessage('Submit failed due to a technical issue. Please try again later.');
        }
    };

    const handleSignOut = async (event) => {
        event.preventDefault();

    }


    return (
        <div className="Main-Container">
            <TitleCard title={loginTitle} />
            <div className="Report">
                <form id="form" onSubmit={handleSubmit}>
                    <label>
                        Report #:
                        <input type="text" value={reportNumber} onChange={e => setReportNumber(e.target.value)} />
                    </label>
                    <label>
                        Type of Bug:
                        <input type="text" value={bugType} onChange={e => setBugType(e.target.value)} />
                    </label>
                    <label for="bug-summary">
                        Summary of Bug:
                        <textarea id="bug-summary" rows={8} cols={40} value={summary} onChange={e => setSummary(e.target.value)} />
                    </label>
                    <label for="bug-update">
                        I would like to:
                        <div>
                            <input type="checkbox" checked={updatesRequested} onChange={e => setUpdatesRequested(e.target.checked)} />
                            <span>Updates on bug</span>
                        </div>
                        <div>
                            <input type="checkbox" checked={progressRequested} onChange={e => setProgressRequested(e.target.checked)} />
                            <span>Progress on bug</span>
                        </div>
                    </label>
                    <div className="operation-button">
                        <button >Save & Exit</button>
                        <button type="submit" >Submit</button>
                        <button><Link className='Link' to="/" >Cancel</Link></button>
                        {message && <p>{message}</p>}
                    </div>
                </form>
                <div className="Navigation">
                    <button id="btn"><u><Link className="Link" to="/home" id="link-red">*Home Page</Link></u></button>
                    <button id="btn"><u><Link className='Link' to="/change-password" id="link-red">*Change Password</Link></u></button>
                    <button id="btn"><u><Link to="/library" className='Link' id="link-red">*Bug Library</Link></u></button>
                    <button id="btn"><u><Link to="/help" className="Link" id="link-red">*Help</Link></u></button>
                    <button id="btn" onClick={handleSignOut}><u>*Sign out</u></button>
                    <svg width="400" height="372" viewBox="0 0 427 372" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="427" height="372" fill="#F5F5F5" />
                        <g clip-path="url(#clip0_0_1)">
                            <rect width="427" height="372" fill="white" />
                            <rect x="70.5" y="18.5" width="227" height="249" fill="white" stroke="#BD3737" stroke-width="3" />
                            <rect x="79.5" y="29.5" width="210" height="226" fill="white" stroke="#BD3737" stroke-width="3" />
                            <rect x="209.5" y="151.5" width="160" height="157" stroke="#BD3737" stroke-width="3" />
                            <rect x="218.5" y="162.5" width="143" height="134" stroke="#BD3737" stroke-width="3" />
                        </g>
                        <defs>
                            <clipPath id="clip0_0_1">
                                <rect width="427" height="372" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Report;