import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import './AddStaff.css';

const AddStaff = () => {
    const [formInput, setFormInput] = useState({
        firstName: '',
        lastName: '',
        ic: '',
        email: '',
        address: '',
        mNumber: '',
        gender: '',
        joiningDate: '',
        dateOfBirth: ''
    });

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        ic: '',
        email: '',
        address: '',
        mNumber: '',
        gender: '',
        joiningDate: '',
        dateOfBirth: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInput(prevState => ({
            ...prevState,
            [name]: value
        }));
        
        setError(prevState => ({
            ...prevState,
            [name]: ''
        }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const newErrorState = { ...error };
        let hasError = false;

        for (const key in formInput) {
            if (!formInput[key].trim()) {
                newErrorState[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} can not be empty`;
                hasError = true;
            }
        }

        // Validate Mobile Number
        const isValidMobileNumber = /^[0-9]{10}$/.test(formInput.mNumber);
        if (!isValidMobileNumber) {
            newErrorState.mNumber = 'Please enter a valid 10-digit mobile number';
            hasError = true;
        }

        // Validate NIC Number
        const isValidNIC = /^[0-9]{9}[vVxX]$/.test(formInput.ic);
        if (!isValidNIC) {
            newErrorState.ic = 'Please enter a valid NIC number (e.g., 123456789V)';
            hasError = true;
        }

        if (hasError) {
            setError(newErrorState);
            return;
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInput.email);
        if (!isValidEmail) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Please enter a valid email address.',
                showConfirmButton: true
            });
        }

        try {
            await saveStaff();
            Swal.fire({
                icon: 'success',
                title: 'Added!',
                text: `${formInput.firstName} ${formInput.lastName}'s data has been Added.`,
                showConfirmButton: false,
                timer: 1500
            });
            setFormInput({
                firstName: '',
                lastName: '',
                ic: '',
                email: '',
                address: '',
                mNumber: '',
                gender: '',
                joiningDate: '',
                dateOfBirth: ''
            });
        } catch (error) {
            console.error('Error saving staff:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Failed to save staff.',
                showConfirmButton: true
            });
        }
    };

    const saveStaff = async () => {
        const formData = new FormData();
        formData.append("empFirstName", formInput.firstName);
        formData.append("empLastName", formInput.lastName);
        formData.append("empIc", formInput.ic);
        formData.append("empEmail", formInput.email);
        formData.append("empAddress", formInput.address);
        formData.append("empPhone", formInput.mNumber);
        formData.append("empGender", formInput.gender);
        formData.append("empJoiningDate", formInput.joiningDate);
        formData.append("empDateOfBirth", formInput.dateOfBirth);

        try {
            await axios.post('http://localhost:8080/employee', formData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="containers">
            <br /><br />
            <div className='row'>
                <div className=''>
                    <h2>ADD STAFF</h2>
                    <div className='card-body'>
                        <form onSubmit={handleAdd}>
                            <div className='namefield'>
                                <div className='form-group mb-2 ' style={{ marginRight: 10 }}>
                                    <label className='form-label'>First Name:</label>
                                    <input
                                        type='text'
                                        placeholder='First Name'
                                        name='firstName'
                                        value={formInput.firstName}
                                        className='form-control'
                                        onChange={handleInputChange}
                                    />
                                    {error.firstName && <div className="text-danger">{error.firstName}</div>}
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name:</label>
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        name='lastName'
                                        value={formInput.lastName}
                                        className='form-control'
                                        onChange={handleInputChange}
                                    />
                                    {error.lastName && <div className="text-danger">{error.lastName}</div>}
                                </div>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>E-mail:</label>
                                <input
                                    type='text'
                                    placeholder='E-mail'
                                    name='email'
                                    value={formInput.email}
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                                {error.email && <div className="text-danger">{error.email}</div>}
                            </div>
                            <div className='namefield'>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>NIC:</label>
                                    <input
                                        type='text'
                                        placeholder='NIC'
                                        name='ic'
                                        value={formInput.ic}
                                        className='form-control'
                                        onChange={handleInputChange}
                                    />
                                    {error.ic && <div className="text-danger">{error.ic}</div>}
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Phone Number:</label>
                                    <input
                                        type='text'
                                        placeholder='Mobile Number'
                                        name='mNumber'
                                        value={formInput.mNumber}
                                        className='form-control'
                                        onChange={handleInputChange}
                                    />
                                    {error.mNumber && <div className="text-danger">{error.mNumber}</div>}
                                </div>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Address:</label>
                                <input
                                    type='text'
                                    placeholder='Address'
                                    name='address'
                                    value={formInput.address}
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                                {error.address && <div className="text-danger">{error.address}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Gender:</label>
                                <select
                                    name='gender'
                                    value={formInput.gender}
                                    className='form-control'
                                    onChange={handleInputChange}
                                >
                                    <option value=''>Select Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                </select>
                                {error.gender && <div className="text-danger">{error.gender}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Joining Date:</label>
                                <input
                                    type='date'
                                    name='joiningDate'
                                    value={formInput.joiningDate}
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                                {error.joiningDate && <div className="text-danger">{error.joiningDate}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Date of Birth:</label>
                                <input
                                    type='date'
                                    name='dateOfBirth'
                                    value={formInput.dateOfBirth}
                                    className='form-control'
                                    onChange={handleInputChange}
                                />
                                {error.dateOfBirth && <div className="text-danger">{error.dateOfBirth}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStaff;
