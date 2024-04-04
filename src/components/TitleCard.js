import React from "react";
import ladybug from '../images/ladybug.png';
import './titlecard.css';

function TitleCard({ title }) {
    return (
        <div className="Content">
            <div id="title-card">
                <img src={ladybug} className="App-logo" alt="logo" />
                <h1>Bug Report System (BRS)</h1>
            </div>
            <p><i>{title}</i></p>
            <div className="red-bar"></div>
        </div>
    );
}
export default TitleCard;