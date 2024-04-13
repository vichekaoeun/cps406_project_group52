import React, { useEffect, useState } from "react";
import './Login.css';
import TitleCard from '../components/TitleCard';
import BugCard from "../components/BugCard";

function Library() {
    const [reportNumber, setReportNumber] = useState(0);
    const [reportSummary, setReportSummary] = useState("Summary of the bug report.");
    const [reports, setReports] = useState([]);

    useEffect(() => {
        fetch('/bug-reports')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    setReports(data.reports);
                } else {
                    throw new Error(data.message);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="Main-Container">
            <TitleCard title="Bug Library" />
            <div className="Authentication" id="library-sec">
                {reports.map(report => (
                    <div key={report.report_number} id="card-section">
                        <BugCard
                            report_number={report.report_number}
                            report_summary={report.summary}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Library;