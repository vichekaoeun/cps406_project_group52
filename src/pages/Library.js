import React, { userEffect, useState } from "react";
import './Login.css';
import TitleCard from '../components/TitleCard';
import BugCard from "../components/BugCard";

function Library() {
    const [reportNumber, setReportNumber] = useState(0);
    const [reportSummary, setReportSummary] = useState("Summary of the bug report.");

    /*
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/library', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (data.success) {
                    setReportNumber(data.report_number);
                    setReportSummary(data.report_summary);
                } else {
                    console.error(data.message || 'Failed to fetch data.');
                }
            } catch (error) {
                console.error('Failed to fetch data.', error);
            }
        }

        fetchData();
    }, []);
    */

    return (
        <div className="Main-Container">
            <TitleCard title="Bug Library" />
            <div className="Authentication" id="library-sec">
                <div id="card-section">
                    <BugCard report_number={reportNumber} report_summary={reportSummary} />
                </div>
                <div id="card-section">
                    <BugCard report_number={reportNumber} report_summary={reportSummary} />
                </div>
                <div id="card-section">
                    <BugCard report_number={reportNumber} report_summary={reportSummary} />
                </div>
                <div id="card-section">
                    <BugCard report_number={reportNumber} report_summary={reportSummary} />
                </div>
                <div id="card-section">
                    <BugCard report_number={reportNumber} report_summary={reportSummary} />
                </div>
            </div>
        </div>
    )
}

export default Library;