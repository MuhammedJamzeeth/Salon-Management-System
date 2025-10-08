import React,{useState,useEffect} from "react";
import Swal from "sweetalert2";
import AddAttForm from "../../components/Attendance/Addattform";
import AttendanceList from "../../components/Attendance/AttendanceList";


function Attendance(){
  const [attendance, setAttendance] = useState([]);
  const [selectedAtt, setSelectedAtt] = useState([]);

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await fetch("http://localhost:8080/viewattendance",
        {method:'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch attendance');
      }
      const data = await response.json();
      setAttendance(data)
    }catch (error) {
      console.log('Error fetching attendance:', error);
      }
      
    }
    fetchService();
  }, []);

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await fetch("http://localhost:8080/employees/count",
        {method:'GET',
          headers: {
            Authorization: `Bearer ${access_token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch attendance');
      }
      const data = await response.json();
      setAttendance(data)
    }catch (error) {
      console.log('Error fetching attendance:', error);
      }
      
    }
    fetchService();
  }, []);

  const handleDeleteAttendance = async (attId) => {
    try {
      const response = await fetch(`http://localhost:8080/deleteattendance/${attId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // setAttendance(attendance.filter(attendance => attendance.AttId !== AttId));
    } catch (error) {
      console.log('Error deleting Attendance:', error);
      // Handle error
      Swal.fire({
        icon:'warning',
        title:'Error', 
        text:error,
        showCloseButton:true
      })
    }
  };
  
  const user = localStorage.getItem("user");
  const { access_token } = JSON.parse(user);

  const handleAddAtt = (newAttendance) => {
    setAttendance([attendance, newAttendance]);
  }

  const handleEditAtt = (attId) => {
    const attToEdit = attendance.find(attEntity => attEntity.attId === attId);
    setSelectedAtt(attToEdit);
  }

  const handleUpdateAtt = (updatedAtt) => {
    const index = attendance.findIndex(attEntity => attEntity.AttId === updatedAtt.AttId);
    const updatedAttendances = [...attendance];
    updatedAttendances[index] = updatedAtt;
    setAttendance(updatedAttendances);
  }

  return(
    <div className='Container'>
      {/* Pass handleAddProduct as a prop to AddProductForm */}
      <div><AddAttForm onAddAtt={handleAddAtt} attDetails={selectedAtt}  onUpdateAtt={handleUpdateAtt} access_token={access_token}/></div>
      <div><AttendanceList attendance={attendance} onDeleteAttendance={handleDeleteAttendance} onEdit={handleEditAtt}/></div>
    </div>
  )

}

export default Attendance;

