import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './Staff.css';
import AddStaff from './AddStaff';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
};

const EmployeeDetails = ({ updateCount }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({}); // State for validation errors

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
                                toast.success(`${empName} has been deleted successfully`, {
                                    position: 'top-right'
                                });
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
        // Validation
        const validationErrors = {};
        if (!selectedEmployee.empFirstName) {
            validationErrors.firstName = "First name is required";
            toast.error(`First name is required`, {
                position: 'top-right'
            });
        }

        if (!selectedEmployee.empLastName) {
            validationErrors.lastName = "Last name is required";
            toast.error(`Last name is required`, {
                position: 'top-right'
            });
        }

        if (!selectedEmployee.empEmail) {
            validationErrors.email = "Email is required";
            toast.error(`Email is required`, {
                position: 'top-right'
            });

        } else if (!/\S+@\S+\.\S+/.test(selectedEmployee.empEmail)) {
            validationErrors.email = "Email is invalid";
            toast.error(`Email is invalid`, {
                position: 'top-right'
            });
        }

        if (!selectedEmployee.empPhone) {
            validationErrors.phone = "Phone number is required";
            toast.error(`Phone number is required`, {
                position: 'top-right'
            });
        } else if (!/^\d{10}$/.test(selectedEmployee.empPhone)) {
            validationErrors.phone = "Please enter a valid 10-digit mobile number";
            toast.error(`Phone Number is invalid`, {
                position: 'top-right'
            });
        }

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await fetch(`http://localhost:8080/employeeUpdate/${selectedEmployee.empId}`, {
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
                    // Clear the selectedEmployee state after successful update
                    setSelectedEmployee(null);
                    
                    toast.success(`${selectedEmployee.empFirstName} ${selectedEmployee.empLastName}'s data has been updated`, {
                        position: 'top-right'
                    });
                }
            } catch (error) {
                console.error('Error updating employee details:', error);
            }
        } else {
            // If there are validation errors, set them in state
            setErrors(validationErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));
        // Clear validation error when user starts typing again
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
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
                            <b>
                                <p>Name: 
                                    <input type="text" name="empFirstName" value={selectedEmployee.empFirstName} onChange={handleChange} />
                                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>} {/* Display validation error */}
                                    <input type="text" name="empLastName" value={selectedEmployee.empLastName} onChange={handleChange} />
                                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>} {/* Display validation error */}
                                </p>
                                <p>Email: 
                                    <input type="text" name="empEmail" value={selectedEmployee.empEmail} onChange={handleChange} />
                                    {errors.email && <div className="text-danger">{errors.email}</div>} {/* Display validation error */}
                                </p>
                                <p>Address: 
                                    <input type="text" name="empAddress" value={selectedEmployee.empAddress} onChange={handleChange} />
                                </p>
                                <p>Phone Number:
                                    <input type="text" name="empPhone" value={selectedEmployee.empPhone} onChange={handleChange} />
                                    {errors.phone && <div className="text-danger">{errors.phone}</div>} {/* Display validation error */}
                                </p>
                                <p>Profile Photo:
                                    {/* <img src={`data:image/jpeg;base64,${selectedEmployee.empProfilePhoto}`} alt="" /> */}
                                </p>
                            </b>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)} name='but'>
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
};

export default Staff;
