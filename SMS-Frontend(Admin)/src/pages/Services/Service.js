// import React, { useState, useEffect } from 'react';
// import img1 from '../../assets/haircutting.jpg';
// import plusicon from '../../assets/plus1.png'
// import './ServiceStyle.css'
// import DeleteIcon from '../../assets/icon-delete.png'
// import EditIcon from '../../assets/edit-icon.png'
// import Swal from 'sweetalert2';
// import ServiceList from '../../components/Service/ServiceList';

// function ServiceComponent() {
//   const [showForm, setShowForm] = useState(false);
//   const [services, setServices] = useState([]);
//   const [editingService,setEditingService] = useState([]);

//   const [serviceName, setServiceName] = useState('');
//   const [serviceDesc, setServiceDesc] = useState('');
//   const [servicePrice, setServicePrice] = useState('');
//   const [serviceDate,setServiceDate] = useState('');
//   const [serviceState,setServiceState] = useState('Active');

//   // Define state to hold category options
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');

//   // FOR FORM VALIDATION
//   const [serviceNameError, setServiceNameError] = useState('');
//   const [serviceDescError, setServiceDescError] = useState('');
//   const [servicePriceError, setServicePriceError] = useState('');
//   const [serviceDateError, setServiceDateError] = useState('');
//   const [serviceStateError, setServiceStateError] = useState('');

//   //DELETE THE SERVICE BY ID
//   const deleteService = (serviceId) => {
//     // DISPLAY CONFIRMATION DIALOG
//     Swal.fire({
//       title: 'Do you want to delete?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel!',
//       reverseButtons: true
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // If user confirms deletion
//         fetch(`http://localhost:8080/deleteservice/${serviceId}`, {
//           method: 'DELETE',
//         })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           // Remove the service from the state
//           const updatedServices = services.filter(service => service.id !== serviceId);
//           setServices(updatedServices);
//           // Show a success message
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted',
//             text: 'Service Deleted Successfully...',
//             showCloseButton: true
//           });
//         })
//         .catch(error => {
//           console.error('Error deleting service:', error);
//         });
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         // If user cancels deletion
//         Swal.fire({
//           icon: 'info',
//           title: 'Cancelled',
//           text: 'Service deletion cancelled.',
//           showCloseButton: true
//         });
//       }
//     });
//   };

//   // UPDATE FORM DETAILS
//   const updateService = () => {
//     // Check if editingService is not null
//     if (editingService) {
//       // Update the service details in the backend
//       fetch(`http://localhost:8080/updateservice/${editingService.serviceId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${access_token}`,
//         },
//         body: JSON.stringify({serviceName, serviceDesc, serviceState, servicePrice, serviceDate}),
//       })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Service updated successfully:', data);
//         Swal.fire({
//           icon: 'success',
//           title: 'Updated',
//           text: 'Service Updated Successfully...',
//           showCloseButton: true
//         });
//         // Reset form fields and editingService state
//         clearService();
//         setEditingService(null);
//       })
//       .catch(error => {
//         console.error('Error updating service:', error);
//         Swal.fire({
//           icon: 'warning',
//           title: 'Not Updated',
//           text: error,
//           showCloseButton: true
//         });
//       });
//     }
//   };

//   // ADD NEW SERVICE OR SAVE SERVICE
//   const saveService = (e) => {
//     e.preventDefault();

//     if (serviceName.trim() === '') {
//       setServiceNameError('Service name is required');
//       return;
//     } else {
//       setServiceNameError('');
//     }

//     if (serviceDesc.trim() === '') {
//       setServiceDescError('Service Description is required');
//       return;
//     } else {
//       setServiceDescError('');
//     }

//     if (serviceState.trim() === '') {
//       setServiceStateError('Service state is required');
//       return;
//     } else {
//       setServiceStateError('');
//     }

//     if (serviceDate.trim() === '') {
//       setServiceDateError('Service date is required');
//       return;
//     } else {
//       setServiceDateError('Service state is required');
//     }

//     const service = {serviceName, serviceDesc, servicePrice, serviceDate, serviceState, categoryId: selectedCategory }

//     // Hide form
//     setShowForm(false);

//     // Form submission to backend
//     fetch('http://localhost:8080/addservice', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${access_token}`,
//       },
//       body: JSON.stringify(service),
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Service saved successfully:', data);
//       Swal.fire({
//         icon: 'success',
//         title: 'Saved',
//         text: 'Service Added Successfully...',
//         showCloseButton: true
//       });
//       // Reset form fields to empty values
//       setServiceName('');
//       setServiceDesc('');
//       setServicePrice('');
//       setServiceDate('');
//       setServiceState('');
//     })
//     .catch(error => {
//       console.error('Error saving service:', error);
//       // add error handling here
//     });
//   }

//   const user = localStorage.getItem("user");
//   const { access_token } = JSON.parse(user);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('http://localhost:8080/services/allservices', {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch services');
//         }
//         const data = await response.json();
//         setServices(data);
//       } catch (error) {
//         console.error('Error fetching services:', error);
//       }
//     }
//     fetchData();
//   }, [saveService, deleteService, updateService]);

//   useEffect(() => {
//     async function fetchCategories() {
//       try {
//         const response = await fetch('http://localhost:8080/service-categories/allcategories', {
//           headers: {
//             Authorization: `Bearer ${access_token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const data = await response.json();
//         setCategories(data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     }
//     fetchCategories();
//   }, [access_token]); // Fetch categories when component mounts

//   // SET SERVICE DETAILS TO FORM FIELDS
//   const setFormDetails = (service) => {
//     setEditingService(service);
//     setShowForm(true);
//     // Set form fields with the details of the selected service
//     setServiceName(service.serviceName);
//     setServiceDesc(service.serviceDesc);
//     setServicePrice(service.servicePrice);
//     setServiceDate(service.serviceDate);
//     setServiceState(service.serviceState);
//   };

//   const handleAddServiceClick = () => {
//     setShowForm(true);
//   };

//   const handleFormSubmit = () => {
//     setShowForm(false);
//     clearService();
//     setEditingService(null);
//   };

//   const clearService = () => {
//     setServiceName('');
//     setServiceDesc('');
//     setServicePrice('');
//     setServiceDate('');
//     setServiceState('');
//   }

//   return (
//   <>
//     <div className='cover-img' style={{ position: 'relative' }}>
//       <img src={img1} alt='' className='bgimg'/>
//         {!showForm && (
//           <button onClick={handleAddServiceClick} className="addButton">
//           <img src={plusicon} alt="Plus Icon" style={{ verticalAlign: 'middle' }} />Add Service</button>
//         )}
//         {showForm && (
//           <form onSubmit={handleFormSubmit} className="formContainer" >
//             <div  className="gridContainer" style={{ width: '100%' }}>
//               <div>
//                 <label htmlFor="serviceName" className="inputLabel">Service Name</label>
//                 <input 
//                   type="text" 
//                   name='serviceName' 
//                   value={serviceName} 
//                   placeholder="Service Name" 
//                   className='inputstyle'
//                   onChange={(e)=> setServiceName(e.target.value)}
//                 />
//                 {serviceNameError && <p style={{ color: 'red' }}>{serviceNameError}</p>}
//               </div>
//               <div>
//                 <label htmlFor="serviceDescription" className="inputLabel">Service Description</label>
//                 <input 
//                   placeholder="Describe the service" 
//                   className='inputstyle' 
//                   name='serviceDesc'
//                   type="text"
//                   value={serviceDesc}
//                   onChange={(e)=> setServiceDesc(e.target.value)}
//                   /> 
//                   {serviceDescError && <p style={{ color: 'red' }}>{serviceDescError}</p>}
//               </div>
//               <div>
//                 <label htmlFor="serviceAddDate" className="inputLabel">Service Added date</label>
//                 <input 
//                   type="Date" 
//                   name='serviceDate' 
//                   value={serviceDate} 
//                   placeholder="Price" 
//                   className='inputstyle'
//                   onChange={(e)=> setServiceDate(e.target.value)}
//                 />
//                 {serviceDateError && <p style={{ color: 'red' }}>{serviceDateError}</p>}
//               </div>
//             </div>
//             <div  className="gridContainer" style={{ width: '100%' }}>
//             <div>
//                 <label htmlFor="servicePrice" className="inputLabel">Service Price</label>
//                 <input 
//                   type="number" 
//                   name='servicePrice' 
//                   value={servicePrice} 
//                   placeholder="Price" 
//                   className='inputstyle'
//                   onChange={(e)=> setServicePrice(e.target.value)}
//                 />
//                 {servicePriceError && <p style={{ color: 'red' }}>{servicePriceError}</p>}
//               </div>
//               <div>
//                 <label htmlFor="serviceCategory" className="inputLabel">Service Category</label>
//                 <select id="service_category" name="serviceCategory" className='inputstyle' value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                   <option value="">Select Category</option>
//                   {categories.map(category => (
//                     <option key={category.id} value={category.id}>{category.name}</option>
//                   ))}
//                 </select>
//                 {servicePriceError && <p style={{ color: 'red' }}>{servicePriceError}</p>}
//               </div>
//               <div>
//                 <label htmlFor="serviceState" className="inputLabel">Service State</label>
//                 <select id="service_state" name="serviceState" className='inputstyle' onChange={(e)=> setServiceState(e.target.value)}>
//                 <option value="">Select State</option>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//                 {serviceStateError && <p style={{ color: 'red' }}>{serviceStateError}</p>}
//               </div>
//             </div>
//             {/* Submit Button */}
//             <div>
//               <button type="submit" className="submitButton" onClick={(e)=> saveService(e)}>Submit</button>
//               {/* Cancel Button */}
//               <button type="cancel" className="cancelButton" onClick={clearService}>Cancel</button>
//               {/* Update Button */}
//               {editingService && <button type="update" className="updateButton" onClick={updateService}>Update</button>}
//             </div>
//           </form>
//         )}
//     </div>
//     {/* Display service list */}
//     <ServiceList />
//     {/* <div className='services-list'>
//       {services.map(service => (
//         <div className='service-list-style'>
//           <br/>
//           <p>{service.serviceName}</p>
//           <p>Rs.{service.servicePrice}.00</p>
//           <h5>{service.serviceState}</h5> 
//           <button type='submit' className="editButton" onClick={() => setFormDetails(service)}> 
//           <img src={EditIcon} className="editIcon" alt="Edit" style={{ marginRight: '5px' }} /> Edit </button>
//           <button type='submit' className="deleteButton" onClick={() => deleteService(service.serviceId)}>
//           <img src={DeleteIcon} className="deleteIcon" alt="Delete" style={{ marginRight: '5px' }} /> Delete</button>
//         </div>
//       ))}
//     </div> */}
//   </>
//   );
// }

// export default ServiceComponent;

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
  const [editingService,setEditingService] = useState([]);

  const [serviceName, setServiceName] = useState('');
  const [serviceDesc, setServiceDesc] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDate,setServiceDate] = useState('');
  const [serviceState,setServiceState] = useState('Active');

// Define state to hold category options
// const [categories, setCategories] = useState([]);
// const [selectedCategory, setSelectedCategory] = useState('');

  // FOR RORM VALIDATION
  const [serviceNameError, setServiceNameError] = useState('');
  const [serviceDescError, setServiceDescError] = useState('');
  const [servicePriceError, setServicePriceError] = useState('');
  const [serviceDateError, setServiceDateError] = useState('');
  const [serviceStateError, setServiceStateError] = useState('');

  //DELETE THE SERVICE BY ID
  const deleteService = (serviceId) => {
    // DISPLAY CONFIRMATION DIALOG
      Swal.fire({
        title: 'Do you want to delete?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            // If user confirms deletion
            fetch(`http://localhost:8080/deleteservice/${serviceId}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Remove the service from the state
                const updatedServices = services.filter(service => service.id !== serviceId);
                setServices(updatedServices);
                // Show a success messagse
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted',
                    text: 'Service Deleted Successfully...',
                    showCloseButton: true
                });
            })
            .catch(error => {
                console.error('Error deleting service:', error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // If user cancels deletion
            Swal.fire({
                icon: 'info',
                title: 'Cancelled',
                text: 'Service deletion cancelled.',
                showCloseButton: true
            });
        }
      });
  }

    //UPDATE FORM DETAILS
    const updateService = () => {
      // Check if editingService is not null
      if (editingService) {
        // Update the service details in the backend
        fetch(`http://localhost:8080/updateservice/${editingService.serviceId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({serviceName, serviceDesc, serviceState, servicePrice, serviceDate}),
          
        })
          .then(response => {
            //console.log(response)
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Service updated successfully:', data);
  
            Swal.fire({
              icon: 'success',
              title: 'Updated',
              text: 'Service Updated Successfully...',
              showCloseButton: true
            });
  
            // Reset form fields and editingService state
            clearService();
            setEditingService(null);
  
            // Refetch services after update
            //fetchServices();
          })
          .catch(error => {
            console.error('Error updating service:', error);
            Swal.fire({
              icon: 'warning',
              title: 'Not Updated',
              text: error,
              showCloseButton: true
            });
            
          });
      }
    };

  // ADD NEW SERVICE OR SAVE SERVICE
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

    // if (servicePrice.trim() === '') {
    //   setServicePriceError('Service price is required');
    //   return;
    // }else{
    //   setServicePriceError('');
    // }

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
      setServiceDateError('Service state is required');
    }

    const service = {serviceName, serviceDesc, servicePrice,serviceDate,serviceState,categoryId: selectedCategory }
    
    //Hide form
    setShowForm(false);
    
    // form submission to backend
    fetch('http://localhost:8080/addservice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
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
  
  const user = localStorage.getItem("user");

  const { access_token } = JSON.parse(user);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/getallcategories', {
  //       headers: {
  //         Authorization: `Bearer ${access_token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch categories');
  //     }
  //     const data = await response.json();
  //     setCategories(data);
  //   } catch (error) {
  //     console.error('Error fetching categories:', error);
  //   }
  // }

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await fetch("http://localhost:8080/getallservices",
        
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    }
    fetchServices();
  }, [saveService,deleteService,updateService]);

  

// SET SERVICE DETAILS TO FORM FIELDS
  const setFormDetails = (service) => {
    setEditingService(service);
    setShowForm(true);
    // Set form fields with the details of the selected service
    setServiceName(service.serviceName);
    setServiceDesc(service.serviceDesc);
    setServicePrice(service.servicePrice);
    setServiceDate(service.serviceDate);
    setServiceState(service.serviceState);
  };

  const handleAddServiceClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    clearService();
    setEditingService(null);
  };

  const clearService = () => {
    setServiceName('');
    setServiceDesc('');
    setServicePrice('');
    setServiceDate('');
    setServiceState('');
  }

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
              {/* <div>
                <label htmlFor="servicectegory" className="inputLabel">Service Category</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {servicePriceError && <p style={{ color: 'red' }}>{servicePriceError}</p>}
              </div> */}
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {serviceStateError && <p style={{ color: 'red' }}>{serviceStateError}</p>}
              </div>
            </div>
                {/* Submit Button */}
              <div>
                <button type="submit" className="submitButton" onClick={(e)=> saveService(e)}>Submit</button>
                {/* Cancel Button */}
                <button type="cancel" className="cancelButton" onClick={clearService}>Cancel</button>
                {/* Update Button */}
                {editingService && <button type="update" className="updateButton" onClick={updateService}>Update</button>}
              </div>
          </form>
        )}
    </div>
        {/* Display service list */}
    <div className='services-list'>
        {services.map(service => (
            <div className='service-list-style'>
              <br/>
              <p>{service.serviceName}</p>
              <p>Rs.{service.servicePrice}.00</p>
              <h5>{service.serviceState}</h5> 
              <button type='submit' className="editButton" onClick={() => setFormDetails(service)}> 
              <img src={EditIcon} className="editIcon" alt="Edit" style={{ marginRight: '5px' }} /> Edit </button>
              <button type='submit' className="deleteButton" onClick={() => deleteService(service.serviceId)}>
              <img src={DeleteIcon} className="deleteIcon" alt="Delete" style={{ marginRight: '5px' }} /> Delete</button>
            </div>
        ))}
    </div>
  </>
  );
}

export default ServiceComponent;
