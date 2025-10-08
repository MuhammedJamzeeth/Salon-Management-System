import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './attendance.css';

function AddAttForm({ onAddAtt, attDetails, onUpdateAtt }) {
  const [empName, setEmpName] = useState('');
  const [empId, setEmpId] = useState('');
  const [attDate, setAttDate] = useState('');
  const [timeIn, setTimeIn] = useState('');
  const [timeOut, setTimeOut] = useState('');
  const [status, setStatus] = useState('');
  const [updatedAtt, setUpdatedAtt] = useState('');

  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmployeeSelect = (e) => {
    const selectedEmployeeName = e.target.value;
    const selectedEmployee = employees.find(employee => employee.empFirstName === selectedEmployeeName);
    if (selectedEmployee) {
      setEmpName(selectedEmployeeName);
      setEmpId(selectedEmployee.empId);
      setSelectedEmployeeId(selectedEmployee.empId);
    }
  };

  useEffect(() => {
    if (attDetails) {
      setEmpName(attDetails.empName);
      setEmpId(attDetails.empId);
      setAttDate(attDetails.attDate);
      setTimeIn(attDetails.timeIn);
      setTimeOut(attDetails.timeOut);
      setStatus(attDetails.status);
    } else {
      setEmpName('');
      setEmpId('');
      setAttDate('');
      setTimeIn('');
      setTimeOut('');
      setStatus('');
    }
  }, [attDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!attDate || !status || !empId) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
        showCloseButton: true
      });
      return;
    }

    const formatTime = (time) => {
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes}:00`;
    };

    const newTimeIn = status === 'Absent' ? null : formatTime(timeIn);
    const newTimeOut = status === 'Absent' ? null : (timeOut ? formatTime(timeOut) : null);

    const newAtt = {
      empName,
      empId,
      timeIn: newTimeIn,
      timeOut: newTimeOut,
      status,
      updatedAtt: new Date(),
      attDate
    };

    fetch('http://localhost:8080/addattendance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(newAtt),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Saved',
        text: 'Attendance Added Successfully...',
        showCloseButton: true
        
      });
      window.location.reload();

      fetchEmployees();
      setEmpName('');
      setEmpId('');
      setAttDate('');
      setTimeIn('');
      setTimeOut('');
      setStatus('');
    })
    .catch(error => {
      Swal.fire({
        icon: 'warning',
        title: 'Cannot Save',
        text: error.message,
        showCloseButton: true
      });
    });
    
  };


  const user = localStorage.getItem("user");
  const { access_token } = JSON.parse(user);

  const handleCancel = () => {
    setEmpName('');
    setEmpId('');
    setAttDate('');
    setTimeIn('');
    setTimeOut('');
    setStatus('');
  }

  const handlecan = () => {
    setTimeIn('');
    setTimeOut('');
  }

  const handleUpdate = () => {
    if (!attDetails) return;

    const formatTime = (time) => {
      const [hours, minutes] = time.split(':');
      return `${hours}:${minutes}:00`;
    };

    const updatedTimeIn = status === 'Absent' ? null : formatTime(timeIn);
    const updatedTimeOut = status === 'Absent' ? null : (timeOut ? formatTime(timeOut) : null);

    const updatedAtt = {
      AttId: attDetails.attId,
      empName,
      empId,
      attDate,
      timeIn: updatedTimeIn,
      timeOut: updatedTimeOut,
      status
    };

    fetch(`http://localhost:8080/updateattendance/${updatedAtt.AttId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(updatedAtt),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Attendance Updated Successfully...',
        showCloseButton: true
      });
      onUpdateAtt(data);
      setEmpName('');
      setEmpId('');
      setAttDate('');
      setTimeIn('');
      setTimeOut('');
      setStatus('');
    })
    .catch(error => {
      Swal.fire({
        icon: 'warning',
        title: 'Click Edit',
        text: 'No Attendance selected for updating',
        showCloseButton: true
      });
    });
  };

  return (
    <div className='form-containerss'>
      <h3>Add Employee's Attendance</h3>
      <form>
        <div className='form-container-11'>
          <div className="form-group11">
            <div className="div21">
              <label>Employee Name</label>
              <Box sx={{ minWidth: 10 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Employee Name</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={empName}
                    onChange={handleEmployeeSelect}
                    style={{ width: '250px' }}
                  >
                    {employees.map(employee => (
                      <MenuItem key={employee.empId} value={employee.empFirstName}>
                        {employee.empFirstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div>
              <label>Employee ID:</label>
              <input type="text" style={{ width: '450px', height: '43px' }} value={selectedEmployeeId} readOnly />
            </div>
          </div>
        </div>
        <div className="form-containerss">
          <div>
            <label>Time In </label>
            <input type="time" value={timeIn} onChange={(e) => setTimeIn(e.target.value)} />
            <label>Time Out </label>
            <input type="time" value={timeOut} onChange={(e) => setTimeOut(e.target.value)} />
            <label>Attendance Date </label>
            <input type="date" value={attDate} onChange={(e) => setAttDate(e.target.value)} />
          </div>
          <div>
            <label>Status </label>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select value={status} onChange={(e) => setStatus(e.target.value)} className="select1">
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                  <MenuItem value="Half-Day">Half-Day</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className='button-container'>
          <button type="submit" className='Addbtn1' onClick={handleSubmit}>Add Attendance</button>
          <button type="button" className='Updatebtn1' onClick={handleUpdate}>Update</button>
          <button type="button" className='Cancelbtn1' onClick={handleCancel}>Cancel</button>
        </div>
      </form>

      </div>
);

};

export default AddAttForm;
      
