import React from "react";
import TitleCard from "../components/TitleCard";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="Main-Container">
            <TitleCard title="Home" />
            <div className="Authentication" id="center">
                <h1>Welcome to the Bug Report System</h1>
                <p>Here you can report bugs and our team of professional Software Engineers will pick it up and work on it!<br></br>
                    To be begin, proceed to login here:</p>
                <Link to="/">To Login Page</Link>
            </div>
        </div>
    )
}

export default Home;