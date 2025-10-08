import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyDashboard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import empl from '../../assets/empl.jpg';
import serImg from '../../assets/ser.jpg';
import pro from '../../assets/pro.jpg';
import appo from '../../assets/appo.jpg';

const Dashboard = () => {
  const [employeeCount, setEmployeeCount] = useState(0);
//   const [serviceCount, setServiceCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
//   const [appCount, setAppCount] = useState(0);

  useEffect(() => {
    fetchEmployeeData();
    // fetchServiceCount();
    fetchProductCount();
    // fetchAppCount();
  }, []);
  

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/employees/vi'); 
      const employeeData = response.data;
      const totalEmployees = employeeData.length; 
      setEmployeeCount(totalEmployees);
    } catch (error) {
      console.error('Error fetching employee data:', error);    
    }
  };

  // const fetchServiceCount = () => {
  //   axios.get('http://localhost:8080/getallservices')
  //     .then(response => {
  //       setServiceCount(response.data.length);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching product count:', error);
  //     });
  // };

  const fetchProductCount = () => {
    axios.get('http://localhost:8080/getallproducts')
      .then(response => {
        setProductCount(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching product count:', error);
      });
  };


  return (
    <main className="M-Container">
    {/* <div>
      <h1>Employee Dashboard</h1>
      <div>Total Employees: {employeeCount}</div>
    </div> */}
    


<div className="M-Title">
    <h2 className="mHeading">DASHBOARD</h2>
</div>

<div className="M-Cards">
    <div >
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={empl}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Total Employees
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {employeeCount}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
    <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={serImg}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Total Service
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {/* {serviceCount} */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>

    <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={pro}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          Products
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {productCount}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>

    <div>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={appo}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           APPOINMENTS
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {/* {appCount} */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>   
    
</div>
</main>


  );
};

export default Dashboard;