import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddStaff.css';

const AddStaff = ({ updateCount }) => {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [formInput, setFormInput] = useState({
        firstName: '',
        lastName: '',
        ic: '',
        email: '',
        address: '',
        mNumber: '',
        gender: '',
        joiningDate: getCurrentDate(),
        dateOfBirth: '',
        profilePhoto: null,
        service: '' 
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

    const [services, setServices] = useState([]); 

    useEffect(() => {
        
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getallservices');
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
                toast.error('Failed to fetch services', {
                    position: 'top-right'
                });
            }
        };
        fetchServices();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormInput((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setError((prevState) => ({
            ...prevState,
            [name]: ''
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormInput((prevState) => ({
            ...prevState,
            profilePhoto: file
        }));
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const newErrorState = {};

        
        const requiredFields = ['firstName', 'lastName', 'ic', 'email', 'address', 'mNumber', 'gender', 'joiningDate', 'dateOfBirth', 'service'];

        let hasError = false;

        requiredFields.forEach((field) => {
            if (!formInput[field]) {
                newErrorState[field] = `Please enter ${field === 'mNumber' ? 'a valid 10-digit' : 'this'} ${field}`;
                hasError = true;
                toast.warning(`All fields are required`, {
                    position: 'top-right'
                });
            }
        });

        
        const isValidMobileNumber = /^[0-9]{10}$/.test(formInput.mNumber);
        if (!isValidMobileNumber) {
            newErrorState.mNumber = 'Please enter a valid 10-digit mobile number';
            hasError = true;
        }

     
        const isValidNIC = /^[0-9]{9}[vVxX]$/.test(formInput.ic) || /^[0-9]{12}$/.test(formInput.ic);
        if (!isValidNIC) {
            newErrorState.ic = 'Please enter a valid NIC number (e.g., 123456789V)';
            hasError = true;
            toast.error('Please enter a valid NIC number (e.g., 123456789V)', {
                position: 'top-right'
            });
        }

      
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formInput.email);
        if (!isValidEmail) {
            newErrorState.email = 'Please enter a valid email address';
            hasError = true;
            toast.error('Please enter a valid email address', {
                position: 'top-right'
            });
        }

        if (hasError) {
            setError(newErrorState);
            return;
        }

        try {
            await saveStaff();
            toast.success(`${formInput.firstName} ${formInput.lastName}'s data has been added`, {
                position: 'top-right'
            });
            setFormInput({
                firstName: '',
                lastName: '',
                ic: '',
                email: '',
                address: '',
                mNumber: '',
                gender: '',
                joiningDate: getCurrentDate(),
                dateOfBirth: '',
                profilePhoto: null,
                service: ''
            });

          
            updateCount();
        } catch (error) {
            console.error('Error saving staff:', error);
            toast.error('Failed to save staff', {
                position: 'top-right'
            });
        }
    };

    const saveStaff = async () => {
        const formData = new FormData();
        formData.append('empFirstName', formInput.firstName);
        formData.append('empLastName', formInput.lastName);
        formData.append('empIc', formInput.ic);
        formData.append('empEmail', formInput.email);
        formData.append('empAddress', formInput.address);
        formData.append('empPhone', formInput.mNumber);
        formData.append('empGender', formInput.gender);
        formData.append('empJoiningDate', formInput.joiningDate);
        formData.append('empDateOfBirth', formInput.dateOfBirth);
        formData.append('empProfilePhoto', formInput.profilePhoto);
        formData.append('empService', formInput.service); 

        try {
            const response = await axios.post('http://localhost:8080/employee', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error saving staff:', error);
            throw new Error('Failed to save staff.');
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
                           
                            <div className='form-group mb-2'>
                                <label className='form-label'>Service:</label>
                                <select
                                    name='service'
                                    value={formInput.service}
                                    className='form-control'
                                    onChange={handleInputChange}
                                >
                                    <option value=''>Select Service</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.serviceName}>
                                            {service.serviceName}
                                        </option>
                                    ))}
                                </select>
                                {error.service && <div className="text-danger">{error.service}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Profile Photo:</label>
                                <input
                                    type='file'
                                    accept='image/*'
                                    name='profilePhoto'
                                    className='form-control-file'
                                    onChange={handleFileChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStaff;
