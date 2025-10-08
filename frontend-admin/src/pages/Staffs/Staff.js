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
    }, [updateCount]);

    return (
        <h1 style={{ color: "red" }}>{employeeCount}</h1>
    );
};

const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

const EmployeeDetails = ({ updateCount }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [selectedEmployeeAppointments, setSelectedEmployeeAppointments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errors, setErrors] = useState({});

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
    }, [updateCount]);

    const handleSeeMore = async (selectedEmp) => {
        setSelectedEmployee(selectedEmp);
        try {
            const response = await fetch(`http://localhost:8080/appointment/view/${selectedEmp.empId}`);
            const data = await response.json();
            const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
            const todayAppointments = data.filter(appointment => appointment.date === today && appointment.status === 'approve'); // Filter today's and approved appointments
            setSelectedEmployeeAppointments(todayAppointments);
        } catch (error) {
            console.error('Error fetching employee appointments:', error);
        }
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
                                updateCount();
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
                    updateCount();
                    setShowModal(false);
                    setSelectedEmployee(null);
                    setErrors({});
                    toast.success(`${selectedEmployee.empFirstName} ${selectedEmployee.empLastName}'s data has been updated`, {
                        position: 'top-right'
                    });
                }
            } catch (error) {
                console.error('Error updating employee details:', error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: value
        }));

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
                                <div className="gitDetail"><span>Specialist</span>{curEmployee.empService}</div>
                            </div>
                            <button className="seeMore" onClick={() => handleSeeMore(curEmployee)}>See More</button>
                            <button className="deleteBtn" onClick={() => handleDeleteEmployee(curEmployee.empId, `${curEmployee.empFirstName} ${curEmployee.empLastName}`)}>Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No employee details available</p>
            )}

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Employee Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedEmployee && (
                        <div className="employee-modal">
                            <div className="employee-detailss">
                                <b>
                                    <p>Name:
                                        <input type="text" name="empFirstName" value={selectedEmployee.empFirstName} onChange={handleChange} />
                                        {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                                        <input type="text" name="empLastName" value={selectedEmployee.empLastName} onChange={handleChange} />
                                        {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                                    </p>
                                    <p>Email:
                                        <input type="text" name="empEmail" value={selectedEmployee.empEmail} onChange={handleChange} />
                                        {errors.email && <div className="text-danger">{errors.email}</div>}
                                    </p>
                                    <p>Address:
                                        <input type="text" name="empAddress" value={selectedEmployee.empAddress} onChange={handleChange} />
                                    </p>
                                    <p>Phone Number:
                                        <input type="text" name="empPhone" value={selectedEmployee.empPhone} onChange={handleChange} />
                                        {errors.phone && <div className="text-danger">{errors.phone}</div>}
                                    </p>
                                    <p>Age:
                                        <input type="text" name="empAge" value={selectedEmployee.empDateOfBirth && calculateAge(selectedEmployee.empDateOfBirth)} readOnly />
                                    </p>
                                    <p>Gender:
                                        <input type="text" name="empGender" value={selectedEmployee.empGender} />
                                    </p>
                                    <p>NIC:
                                        <input type="text" name="empIc" value={selectedEmployee.empIc} />
                                    </p>
                                </b>
                            </div>
                            <div className="employee-appointments">
                                <h5>Appointments</h5>
                                {selectedEmployeeAppointments.length > 0 ? (
                                    selectedEmployeeAppointments.map((appointment) => (
                                        <div key={appointment.id} className="appointment-item">
                                            <p>Customer Name:<span>{appointment.customerName}</span></p>
                                            <p>Customer Email: <span>{appointment.customerEmail}</span></p>
                                            <p>Date: <span>{appointment.date}</span></p>
                                            <p>Time: <span>{appointment.time}</span></p>
                                            <p>Service Category: <span>{appointment.category}</span></p>
                                            <p>Phone Number: <span>{appointment.pno}</span></p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No appointments available</p>
                                )}
                            </div>
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
    const [updateCount, setUpdateCount] = useState(false);

    const setOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleUpdateCount = () => {
        setUpdateCount(!updateCount);
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
