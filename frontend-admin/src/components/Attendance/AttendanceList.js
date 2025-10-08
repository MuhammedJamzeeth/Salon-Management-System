import React,{ useState } from "react";
import Swal from "sweetalert2";
import './attlist.css';

const AttendanceList = ({attendance, onDeleteAttendance, onEdit}) => {
    const [searchTerm, setSearchTerm] = useState('');

    if (!Array.isArray(attendance)) {
        console.log('Attendance data is not an array:', attendance);
        return null; // or handle the error appropriately
    }

    const filteredAttendance = attendance.filter(attendance =>
        attendance.empName.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );


const handleDeleteAttendance = (attId) => {
    Swal.fire({
        title: "Do you want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
    }).then((result) => {
        if (result.isConfirmed) {
        // Call onDeleteAttendance function passed from parent component
        onDeleteAttendance(attId);
        //reload the web page after deletion
        window.location.reload();
        }
    });

    
};

    
    return(
        <>
        <div className="searchbar">
            <h4>Search: </h4>
            {/* Searchbar */}
                <input
                    type="text"
                    placeholder="Search by emp name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
        </div>
        
        <div className="att-list-container1">
            <div className="att-table-wrapper1">
                <table className="att-table">
                    <thead>
                        <tr>
                            <th>Att ID</th>
                            <th>Employee Name</th>
                            <th>Employee Id</th>
                            <th>Attendance Date</th>
                            <th>Time In</th>
                            <th>Time Out</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAttendance.map((attendance) => (
                            <tr key={attendance.attId}>
                                <td>{attendance.attId}</td>
                                <td>{attendance.empName}</td>
                                <td>{attendance.empId}</td>
                                <td>{attendance.attDate}</td>
                                <td>{attendance.timeIn}</td>
                                <td>{attendance.timeOut}</td>
                                <td>{attendance.status}</td>
                                <td>
                                    <button className="delete-btn1" onClick={() => handleDeleteAttendance(attendance.attId)}>Delete</button>
                                    <button className="edit-btn1" onClick={() => onEdit(attendance.attId)}>Edit</button>
                                </td>
                            </tr>
                        ))}
                                                      
                    </tbody>
                </table>
            </div>
        </div>
        </>
        

    )


}

export default AttendanceList;