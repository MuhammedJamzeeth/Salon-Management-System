import React, { useState, useEffect } from 'react';
import img1 from '../../assets/haircutting.jpg';
import plusicon from '../../assets/plus1.png'
import './ServiceStyle.css'
import DeleteIcon from '../../assets/icon-delete.png'
import EditIcon from '../../assets/edit-icon.png'
import Swal from 'sweetalert2';


function ServiceComponent() {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDate,setServiceDate] = useState('');
  const [serviceState,setServiceState] = useState('Active');

  const [serviceNameError, setServiceNameError] = useState('');
  const [serviceDescError, setServiceDescError] = useState('');
  const [servicePriceError, setServicePriceError] = useState('');
  const [serviceDateError, setServiceDateError] = useState('');
  const [serviceStateError, setServiceStateError] = useState('');

  const saveService = (e) => {
    e.preventDefault();

    if (serviceName.trim() === '') {
      setServiceNameError('Service name is required');
      return;
    }else{
      setServiceNameError('');
    }

    if (serviceDesc.trim() === '') {
      setServiceDescError('Service Description is required');
      return;
    }else{
      setServiceDescError('');
    }

    if (servicePrice.trim() === '') {
      setServicePriceError('Service price is required');
      return;
    }else{
      setServicePriceError('');
    }

    if (serviceState.trim() === '') {
      setServiceStateError('Service state is required');
      return;
    }else{
      setServiceStateError('');
    }

    if (serviceDate.trim() === '') {
      setServiceDateError('Service date is required');
      return;
    }else{
      setServiceDateError('Active');
    }

    const service = {serviceName, serviceDesc, servicePrice,serviceDate,serviceState}
    
    //Hide form
    setShowForm(false);
    
    // form submission to backend
    fetch('http://localhost:8080/addservice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Service saved successfully:', data);

        Swal.fire({
          icon:'success',
          title:'Saved',
          text:'Service Added Successfully...',
          showCloseButton:true
        })
        
        // Reset form fields to empty values
        setServiceName('');
        setServiceDesc('');
        setServicePrice('');
        setServiceDate('');
        setServiceState('');
        
    })
    .catch(error => {
        console.error('Error saving service:', error);
        // add error handling here
    });
  }

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("http://localhost:8080/getallservices");
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchServices();
  }, [saveService]);

  const handleAddServiceClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
  };

  return (
    <>
    <div className='cover-img' style={{ position: 'relative' }}>
      <img src={img1} alt='' className='bgimg'/>
      {!showForm && (
        <button onClick={handleAddServiceClick} className="addButton">
        <img src={plusicon} alt="Plus Icon" style={{ verticalAlign: 'middle' }} />Add Service</button>
      )}
      {showForm && (
        <form onSubmit={handleFormSubmit} className="formContainer" >
          <div  className="gridContainer" style={{ width: '100%' }}>
            <div>
              <label htmlFor="serviceName" className="inputLabel">Service Name</label>
              <input 
                type="text" 
                name='serviceName' 
                value={serviceName} 
                placeholder="Service Name" 
                className='inputstyle'
                onChange={(e)=> setServiceName(e.target.value)}
              />
              {serviceNameError && <p style={{ color: 'red' }}>{serviceNameError}</p>}
            </div>
            <div>
              <label htmlFor="serviceDescription" className="inputLabel">Service Description</label>
              <input 
                placeholder="Describe the service" 
                className='inputstyle' 
                name='serviceDesc'
                type="text"
                value={serviceDesc}
                onChange={(e)=> setServiceDesc(e.target.value)}
                /> 
                {serviceDescError && <p style={{ color: 'red' }}>{serviceDescError}</p>}
            </div>
            <div>
              <label htmlFor="servicePrice" className="inputLabel">Service Price</label>
              <input 
                type="number" 
                name='servicePrice' 
                value={servicePrice} 
                placeholder="Price" 
                className='inputstyle'
                onChange={(e)=> setServicePrice(e.target.value)}
              />
              {servicePriceError && <p style={{ color: 'red' }}>{servicePriceError}</p>}
            </div>
          </div>
          <div  className="gridContainer" style={{ width: '100%' }}>
            <div>
              <label htmlFor="serviceAddDate" className="inputLabel">Service Added date</label>
              <input 
                type="Date" 
                name='serviceDate' 
                value={serviceDate} 
                placeholder="Price" 
                className='inputstyle'
                onChange={(e)=> setServiceDate(e.target.value)}
              />
              {serviceDateError && <p style={{ color: 'red' }}>{serviceDateError}</p>}
            </div>
            <div>
              <label htmlFor="serviceState" className="inputLabel">Service State</label>
              <select id="service_state" name="serviceState" className='inputstyle' onChange={(e)=> setServiceState(e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {serviceStateError && <p style={{ color: 'red' }}>{serviceStateError}</p>}
            </div>
          </div>
              {/* Submit Button */}
            <div>
              <button type="submit" className="submitButton" onClick={(e)=> saveService(e)}>Submit</button>
              {/* Cancel Button */}
              <button type="cancel" className="cancelButton">Cancel</button>
            </div>
        </form>
      )}
    </div>

    <div className='services-list'>
      {services.map(service => (
          <div className='service-list-style'>
            <br/>
            <p>{service.serviceName}</p>
            <p>{service.servicePrice}</p>
            <h5>{service.serviceState}</h5> 
            <button type='submit' className="editButton" > 
            <img src={EditIcon} className="editIcon" alt="Edit" style={{ marginRight: '5px' }} /> Edit </button>
            <button type='submit' className="deleteButton" >
            <img src={DeleteIcon} className="deleteIcon" alt="Delete" style={{ marginRight: '5px' }} /> Delete</button>
          </div>
      ))}
    </div>
  </>
  );
}

export default ServiceComponent;