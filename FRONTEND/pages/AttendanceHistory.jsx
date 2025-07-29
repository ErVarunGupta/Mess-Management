import { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../components/Layout/utils";
import { useLocation } from "react-router-dom";

export const AttendanceHistory = () => {
    const location = useLocation();
    const list = location.state?.history || [];
    console.log(list);
    
    return (
        <>
            
            <section className="menu-section student-section">
                <div className="menu-container student-container">
                    <div className="table-wrapper">
                        <table border="" className="menu-table student-table">
                            <thead>
                                <tr>
                                    <th colSpan={3}>Attendance History</th>
                                </tr>
                                <tr>
                                    <th colSpan={3} style={{ fontSize: '1.4rem', backgroundColor: 'green', color: 'white' }}>
                                        <i>Total Attendance</i>: {list.length}
                                    </th>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} >No records found.</td>
                                    </tr>
                                ) : (
                                    list.map((active, index) => (
                                        <tr key={index}>
                                            <td>{active.date}</td>
                                            <td>{active.time}</td>
                                            <td>{active.status}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};
