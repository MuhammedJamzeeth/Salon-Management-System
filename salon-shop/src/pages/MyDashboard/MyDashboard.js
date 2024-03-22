import React, {useState} from "react";
// import Chart from "react-apexcharts";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
// import { 
//     Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
//  }  from 'recharts';
import './MyDashboard.css'


const palette = ['#4c8cf0'];


function MainDashBoard(){

    const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490, 1398, 7800, 3908, 4800, 5000];
    const pData = [2400, 1398, 7300, 3908, 4800, 3800, 4300, 4000, 3000, 2000, 2780, 1890];
    const xLabels = ['JAN', 'FEB', 'MAR','APR', 'MAY', 'JUN','JUL', 'AUG', 'SEP','OCT', 'NOV', 'DEC'];
   
    return (
        <main className="M-Container">
            <div className="M-Title">
                <h2 className="mHeading">DASHBOARD</h2>
            </div>

            <div className="M-Cards">
                <div className="card">
                    <div className="inner-card">
                        <h4 className="pro">PRODUCTS</h4>                    
                    </div>
                    <h4 className="pro">17</h4>
                </div>

                <div className="card">
                    <div className="inner-card">
                        <h4 className="pro">SERVICES</h4>                   
                    </div>
                <h4 className="pro">7</h4>
                </div>

                <div className="card">
                    <div className="inner-card">
                        <h4 className="pro">EMPLOYEES</h4>                   
                    </div>
                <h4 className="pro">4</h4>
                </div>

                <div className="card">
                    <div className="inner-card">
                        <h4 className="pro">TOTAL APPOINMENTS</h4>                   
                    </div>
                <h4 className="pro">12</h4>
                </div>

                <div className="card">
                    <div className="inner-card">
                        <h4 className="pro">APPROVED APPOINMENTS</h4>                   
                    </div>
                <h4 className="pro">2</h4>
                </div>              

                <div className="card">
                    <div className="inner-card">
                        <h4 className="pro">TODAY APPOINMENTS</h4>                   
                    </div>
                <h4 className="pro">3</h4>
                </div>   

                <div className="card">
                    <div className="inner-card">
                        <h4 className="pro">TODAY REVENUE</h4>                   
                    </div>
                <h4 className="pro">$150</h4>
                </div>   

                <div className="card">
                    <div className="inner-card">
                        <h4 className="pro">CANCELED APPOINMENTS</h4>                   
                    </div>
                <h4 className="pro">0</h4>
                </div> 
              
            </div>

            

            <div className="Mchart"> 

                <div>
                    <BarChart
                        colors={palette}
                        xAxis={[
                            {
                            id: 'barCategories',
                            data: ['JAN', 'FEB', 'MAR','APR', 'MAY', 'JUN','JUL', 'AUG', 'SEP','OCT', 'NOV', 'DEC'],
                            scaleType: 'band',
                            },
                        ]}
                        series={[
                            {
                            data: [2, 5, 3,6,4,7,8,3,4,7,6,9],
                            },
                        ]}
                        width={550}
                        height={350}
                        />
                        <h3 className="inco">Monthly Income Of The Year</h3>
                </div>     

                <div className="line">
                    <LineChart
                        width={500}
                        height={300}
                        series={[
                            { data: pData, label: '2022', yAxisKey: 'leftAxisId' },
                            { data: uData, label: '2023', yAxisKey: 'rightAxisId' },
                        ]}
                        xAxis={[{ scaleType: 'point', data: xLabels }]}
                        yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                        rightAxis="rightAxisId"
                        />
                        <h3 className="inco">Revenue Differance Between Past 2 Years</h3>
                </div>
                
            </div>          
        </main>          
    )
}

export default MainDashBoard;