import React from "react";

function BugCard({ report_number, report_summary }) {
    return (
        <div>
            <div className="card">
                <h2>{report_number}</h2>
                <p>{report_summary}</p>
            </div>
        </div>
    )
}

export default BugCard;