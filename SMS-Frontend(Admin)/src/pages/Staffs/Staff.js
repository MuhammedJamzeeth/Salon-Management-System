import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Staff.css';
import AddStaff from './AddStaff';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const EmployeeCount = ({ updateCount }) => {
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        const fetchEmployeeCount = async () => {
            try {
                const response = await fetch('http://localhost:8080/employees/count');
                const data = await response.json();
                setEmployeeCount(data);
            } catch (error) {
                console.error('Error fetching employee count:', error);
            }
        };

        fetchEmployeeCount();
    }, [updateCount]); // Update count when updateCount changes

    return (
        <h1 style={{ color: "red" }}>{employeeCount}</h1>
    );
}

const EmployeeDetails = ({ updateCount }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch("http://localhost:8080/employees");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };

        fetchEmployeeDetails();
    }, [updateCount]); // Update employee details when updateCount changes

    const handleSeeMore = (selectedEmp) => {
        setSelectedEmployee(selectedEmp);
        setShowModal(true);
    };

    const handleDeleteEmployee = async (empId, empName) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: `Are you sure you want to delete ${empName}?`,
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            const response = await fetch(`http://localhost:8080/employees/${empId}`, {
                                method: 'DELETE'
                            });
                            if (response.ok) {
                                setEmployees(employees.filter(emp => emp.empId !== empId));
                                updateCount(); // Update count after successful deletion
                            }
                        } catch (error) {
                            console.error('Error deleting employee:', error);
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    };

    const handleUpdateEmployee = async () => {
        try {
            const response = await fetch(`http://localhost:8080/employees/${selectedEmployee.empId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedEmployee)
            });
            if (response.ok) {
                console.log("Employee details updated successfully!");
                updateCount(); // Update count after successful update
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error updating employee details:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
    };

    return (
        <div className="container">
            {employees.length > 0 ? (
                employees.map((curEmployee) => (
                    <div className="card_item" key={curEmployee.empId}>
                        <div className="card_inner">
                            <img src={`data:image/jpeg;base64,${curEmployee.empProfilePhoto}`} alt="" />
                            <div className="userName">{curEmployee.empFirstName}</div>
                            <div className="userUrl">{curEmployee.empLastName}</div>
                            <div className="detail-box">
                                <div className="gitDetail"><span>Task</span>12</div>
                                <div className="gitDetail"><span>Finished</span>12</div>
                                <div className="gitDetail"><span>Remainder</span>12</div>
                            </div>
                            <button className="seeMore" onClick={() => handleSeeMore(curEmployee)}>See More</button>
                            <button className="deleteBtn" onClick={() => handleDeleteEmployee(curEmployee.empId, `${curEmployee.empFirstName} ${curEmployee.empLastName}`)}>Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No employee details available</p>
            )}
            {/* Modal to display employee details */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEmployee && (
                        <div>
                            <p>Name: 
                                <input type="text" name="empFirstName" value={selectedEmployee.empFirstName} onChange={handleChange} />
                                <input type="text" name="empLastName" value={selectedEmployee.empLastName} onChange={handleChange} />
                            </p>
                            <p>Email: 
                                <input type="text" name="empEmail" value={selectedEmployee.empEmail} onChange={handleChange} />
                            </p>
                            <p>Address: 
                                <input type="text" name="empAddress" value={selectedEmployee.empAddress} onChange={handleChange} />
                            </p>
                            <p>Phone Number:
                                <input type="text" name="remainder" value={selectedEmployee.empPhone} onChange={handleChange} />
                            </p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdateEmployee}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

const Staff = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [updateCount, setUpdateCount] = useState(false); // State to trigger count update

    const setOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleUpdateCount = () => {
        setUpdateCount(!updateCount); // Toggle updateCount to trigger count update
    };

    return (
        <div>
            {!isOpen ? (
                <React.Fragment>
                    <div className='employee-details-container'>
                        <div className='employee-details'>
                            <EmployeeCount updateCount={updateCount} /><h1>Staff</h1>
                        </div>
                        <div className='employee-add'>
                            <Button className='button' onClick={setOpen}>+ Add Staff</Button>
                        </div>
                    </div>
                    <div className='employee-card-details'><EmployeeDetails updateCount={handleUpdateCount} /></div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className='employee-details-container'>
                        <div className='employee-details'>
                            {/* <EmployeeCount /> <h1>Staff</h1> */}
                        </div>
                        <div className='employee-add'>
                            <Button style={{ background: "red" }} className='button' onClick={setOpen}>Close</Button>
                        </div>
                    </div>
                    <AddStaff updateCount={handleUpdateCount} />
                </React.Fragment>
            )}
        </div>
    );
}

export default Staff;
