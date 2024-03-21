import React, { useState, useEffect } from 'react';
import img1 from '../../assets/haircutting.jpg';
import plusicon from '../../assets/plus1.png'
import './ServiceStyle.css'
import DeleteIcon from '../../assets/icon-delete.png'
// import Swal from 'sweetalert2';


function ServiceComponent() {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceImg, setServiceImg] = useState(null);

  const saveService = (e) => {
    e.preventDefault();
    const service = {serviceName, serviceDesc, servicePrice,serviceImg}
    setShowForm(false);
    
    // console.log(service);
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

        // Swal.fire({
        //   icon:'success',
        //   title:'Saved',
        //   text:'Service Added Successfully...',
        //   showCloseButton:true
        // })
        
        // Reset form fields to empty values
        setServiceName('');
        setServiceDesc('');
        setServicePrice('');
        setServiceImg(null);
    })
    .catch(error => {
        console.error('Error saving service:', error);
        // You can add error handling here
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
    // if(!serviceDesc || !serviceName || !servicePrice){
    //   return Swal.fire({
    //     icon:"warning",
    //     title:'error',
    //     text:'Fill All The Fields',
    //     showCloseButton:true
    //   })
    // }
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
            </div>
            <div>
              <label htmlFor="serviceDescription" className="inputLabel">Service Description</label>
              <textarea 
                placeholder="Describe the service" 
                className='inputstyle' 
                rows="2"
                name='serviceDesc'
                type="text"
                value={serviceDesc}
                onChange={(e)=> setServiceDesc(e.target.value)}
                > 
              </textarea>
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
            </div>
            <div>
              <label htmlFor="serviceImage" className="inputLabel">Service Image</label>
              <input 
                type='file'
                accept="image/*" 
                name='serviceImg' 
                value={serviceImg}
                className='inputstyle'
                onChange={(e)=> setServiceImg(e.target.files[0])}
              />
            </div>
                         {/* Submit Button */}
            <div className='buttons-container'>
              <button type="submit" className="submitButton" onClick={(e)=> saveService(e)}>Submit</button>
                          {/* Cancel Button */}
              <button type="cancel" className="cancelButton">Cancel</button>
              </div>
          </div>
        </form>
      )}
    </div>

    <div className='services-list'>
      {services.map(service => (
          <div key={service.id} className='service-list-style'>
            <p>{}</p>
            <br/>
            <p>{service.serviceName}</p>
            <button type='submit' className="deleteButton">
            <img src={DeleteIcon} className="deleteIcon" alt="Delete" style={{ marginRight: '5px' }} /> Delete</button>
          </div>
      ))}
    </div>
    </>
  );
}

export default ServiceComponent;