import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Staff.css'; 

function EmployeeCount() {
    const [employeeCount, setEmployeeCount] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/employees/count')
            .then(response => response.json())
            .then(data => setEmployeeCount(data))
            .catch(error => console.error('Error fetching employee count:', error));
    }, []);

    return (
        <h1 style={{ color: "red" }}>{employeeCount}</h1>
    );
}

function EmployeeDetails() {
    const [employee, setEmployee] = useState([]);

    const getEmployee = async () => {
        try {
            const response = await fetch("http://localhost:8080/employees");
            const data = await response.json();
            setEmployee(data);
        } catch (error) {
            console.error('Error fetching employee details:', error);
        }
    };

    useEffect(() => {
        getEmployee();
    }, []);

    return (
        <div className="container">
            {employee.length > 0 ? (
                employee.map((curElem) => (
                    <div className="card_item" key={curElem.id}>
                        <div className="card_inner">
                            <img src={curElem.avatar_url} alt="" />
                            <div className="userName">{curElem.empFirstName}</div>
                            <div className="userUrl">{curElem.empFirstName}</div>
                            <div className="detail-box">
                                <div className="gitDetail"><span>Task</span>23</div>
                                <div className="gitDetail"><span>Task</span>45</div>
                                <div className="gitDetail"><span>Task</span>11</div>
                            </div>
                            <button className="seeMore">See More</button>
                        </div>
                    </div>
                ))
            ) : (
                <p>No employee details available</p>
            )}
        </div>
    );
}

const Staff = () => {
    const navigator = useNavigate();

    function addNewEmployee() {
        navigator('/add-staff');
    }

    return (
        <React.Fragment>
            <div className='employee-details-container'>
                <div className='employee-details'>
                    <EmployeeCount /> <h1>Staff</h1>
                </div>
                <div className='employee-add'>
                    <Button className='button' onClick={addNewEmployee}>+Add Staff</Button>
                </div>
            </div>
            <div className='employee-card-details'><EmployeeDetails /></div>
        </React.Fragment>
        
    );
}

export default Staff;

// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import React, { useState } from "react";
// import BannerBackground from "../../components/Banner/BannerBackground";
// import Model from "../../components/ModelOverLay/Model";
// import OverLay from "../../components/ModelOverLay/OverLay";
// import AddStaff from "../../components/Staff/AddStaff";
// import StaffItems from "../../components/Staff/StaffItems";
// import { Button, StaffContainer } from "./staff.styles";


// const Staff = () => {
//     const [isOpen, setIsOpen] = useState(true);

//     const toggleModel = () => setIsOpen(!isOpen);

//     return (
//         <StaffContainer>
//             <BannerBackground
//                 Background={""}
//             >
//                 <Button onClick={toggleModel}>
//                     <AddCircleIcon /> <span>add staff</span>
//                 </Button>
//             </BannerBackground>
//             {!isOpen && (
//                 <Model title="Add Staff" toggleModel={toggleModel}>
//                     <AddStaff setIsOpen={setIsOpen} isOpen={isOpen} />
//                 </Model>
//             )}
//             {!isOpen && <OverLay />}
//             <StaffItems />
//         </StaffContainer>
//     );
// };

// export default Staff;
