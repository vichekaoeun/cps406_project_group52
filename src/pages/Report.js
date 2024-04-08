import React, { useState } from "react";
import './Login.css';
import TitleCard from '../components/TitleCard';
import { Link } from 'react-router-dom';

function Report() {
    const loginTitle = "Bug Report Form";

    return (
        <div className="Main-Container">
            <TitleCard title={loginTitle} />
            <div className="Report">
                <form id="form">
                    <label>
                        Report #:
                        <input type="text" />
                    </label>
                    <label>
                        Type of Bug:
                        <input type="text" />
                    </label>
                    <label for="bug-summary">
                        Summary of Bug:
                        <textarea id="bug-summary" rows={8} cols={40} />
                    </label>
                    <label for="bug-update">
                        I would like to:
                        <div>
                            <input type="checkbox" />
                            <span>Updates on bug</span>
                        </div>
                        <div>
                            <input type="checkbox" />
                            <span>Progress on bug</span>
                        </div>
                    </label>
                    <div className="operation-button">
                        <button >Save & Exit</button>
                        <button >Submit</button>
                        <button >Cancel</button>
                    </div>
                </form>
                <div className="Navigation">
                    <button id="btn"><u>*Home Page</u></button>
                    <button id="btn"><u>*Change Password</u></button>
                    <button id="btn"><u>*Bug Library</u></button>
                    <button id="btn"><u>*Help?</u></button>
                    <button id="btn"><u>*Sign out</u></button>
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