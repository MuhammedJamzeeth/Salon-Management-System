import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Staff.css'; 
import AddStaff from './AddStaff';

function EmployeeCount() {
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
    }, []);

    return (
        <h1 style={{ color: "red" }}>{employeeCount}</h1>
    );
}

function EmployeeDetails() {
    const [employee, setEmployee] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null); // To store the selected employee
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            try {
                const response = await fetch("http://localhost:8080/employees");
                const data = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error('Error fetching employee details:', error);
            }
        };

        fetchEmployeeDetails();
    }, []);

    const handleSeeMore = (selectedEmp) => {
        setSelectedEmployee(selectedEmp);
        setShowModal(true);
    };

    return (
        <div className="container">
            {employee.length > 0 ? (
                employee.map((curElem) => (
                    <div className="card_item" key={curElem.id}>
                        <div className="card_inner">
                            <img src={curElem.avatar_url} alt="" />
                            <div className="userName">{curElem.empFirstName}</div>
                            <div className="userUrl">{curElem.empLastName}</div>
                            <div className="detail-box">
                                <div className="gitDetail"><span>Task</span>23</div>
                                <div className="gitDetail"><span>Finished</span>45</div>
                                <div className="gitDetail"><span>Remainder</span>11</div>
                            </div>
                            <button className="seeMore" onClick={() => handleSeeMore(curElem)}>See More</button>
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
                            <p>Name: {selectedEmployee.empFirstName} {selectedEmployee.empLastName}</p>
                            <p>Email: {selectedEmployee.empEmail}</p>
                            <p>Address: {selectedEmployee.empAddress} </p>
                            <p>Remainder: 11</p>
                          
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const Staff = () => {
    const [isOpen, setIsOpen] = useState(false);

    const setOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {!isOpen ? (
                <React.Fragment>
                    <div className='employee-details-container'>
                        <div className='employee-details'>
                            <EmployeeCount /> <h1>Staff</h1>
                        </div>
                        <div className='employee-add'>
                            <Button className='button' onClick={setOpen}>+ Add Staff</Button>
                        </div>
                    </div>
                    <div className='employee-card-details'><EmployeeDetails /></div>
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
                    <AddStaff />
                </React.Fragment>
            )}
        </div>
    );
}

export default Staff;
