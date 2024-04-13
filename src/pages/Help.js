import React from "react";
import TitleCard from "../components/TitleCard";
import { Link } from "react-router-dom";

function Help() {
    return (
        <div className="Main-Container">
            <TitleCard title="Help" />
            <div className="Authentication" id="center">
                <p>Any issues with the website, please report it to: brshelp@gmail.com</p>
                <div>
                    <button><Link to="/report" className="Link">Get back to home</Link></button>
                </div>
            </div>

        </div>
    )
}

export default Help;