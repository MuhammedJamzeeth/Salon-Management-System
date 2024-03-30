import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from "axios";
import './AddStaff.css';

const AddStaff = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [ic, setIc] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [mNumber, setMNumber] = useState('');

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !ic || !address || !mNumber) {
            return Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'All fields are required.',
                showConfirmButton: true
            });
        }

        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
                text: `${firstName} ${lastName}'s data has been Added.`,
                showConfirmButton: false,
                timer: 1500
            });
            setFirstName('');
            setLastName('');
            setIc('');
            setEmail('');
            setAddress('');
            setMNumber('');
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
        formData.append("empFirstName", firstName);
        formData.append("empLastName", lastName);
        formData.append("empIc", ic);
        formData.append("empEmail", email);
        formData.append("empAddress", address);
        formData.append("empPhone", mNumber);

        try {
            await axios.post('http://localhost:8080/employee', formData);
        } catch (error) {
            console.error(error)
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
                                        value={firstName}
                                        className='form-control'
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Last Name:</label>
                                    <input
                                        type='text'
                                        placeholder='Last Name'
                                        name='lastName'
                                        value={lastName}
                                        className='form-control'
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>E-mail:</label>
                                <input
                                    type='text'
                                    placeholder='E-mail'
                                    name='email'
                                    value={email}
                                    className='form-control'
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='namefield'>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>NIC:</label>
                                    <input
                                        type='text'
                                        placeholder='NIC'
                                        name='nic'
                                        value={ic}
                                        className='form-control'
                                        onChange={e => setIc(e.target.value)}
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Phone Number:</label>
                                    <input
                                        type='text'
                                        placeholder='Mobile Number'
                                        name='mNumber'
                                        value={mNumber}
                                        className='form-control'
                                        onChange={e => setMNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Address:</label>
                                <input
                                    type='text'
                                    placeholder='Address'
                                    name='address'
                                    value={address}
                                    className='form-control'
                                    onChange={e => setAddress(e.target.value)}
                                />
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
