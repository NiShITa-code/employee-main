import Menus from "../reusable_ui/Menus"
import Table from "../reusable_ui/Table"
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmDelete from '../reusable_ui/ConfirmDelete';
function DashboardTable() {
  const [data, setData] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const handleCreate = () => {
    // Open the form
    setIsCreating(true);
  };
  const handleSave = async (newEmployee) => {
    // Update the state with the new data
    setData([...data, newEmployee]);
    
    // Close the form
    setIsCreating(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://localhost:7127/api/employee');
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
       
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleConfirmDelete = async () => {
    // Send a DELETE request to the delete endpoint of your API
    const response = await fetch(`https://localhost:7127/api/employee/${employeeToDelete.id}`, {
      method: 'DELETE',
    });
    
    // Update the state to remove the deleted employee
    if (response.ok) {
      setData(data.filter((employee) => employee.id !== employeeToDelete.id));
    }
    setIsDeleting(false);
    setEmployeeToDelete(null);


  };
  
  return (
      <div>
        <Menus>
        <Table columns="repeat(10, 1fr)">
  <Table.Header>
    <div>S.No</div>
    <div>Name</div>
    <div>Email Id</div>
    <div>Gender</div>
    <div>Department</div>
    <div>Salary</div>
    <div>Address</div>     
    <div>Is Active</div>     
  </Table.Header>
  {data.map((employee, index) => (
    <Table.Row key={index}>
      <div>{employee.id}</div>
      <div>{employee.firstName + ' ' + employee.lastName}</div>
      <div>{employee.email}</div>
      <div>{employee.gender}</div>
      <div>{employee.department}</div>
      <div>{employee.salary}</div>
      <div>{employee.address}</div>
      <div>{employee.isActive ? 'Yes' : 'No'}</div>
     
      <button onClick={() => handleEdit(employee.id)}><FaEdit /></button>
      <button onClick={() => setEmployeeToDelete(employee)}><FaTrash /></button>
      {employeeToDelete == employee&& (<ConfirmDelete resourceName="employee" onConfirm={handleConfirmDelete} onCloseModal={() => setEmployeeToDelete(null)} />)}
      <div></div>

    </Table.Row>
  ))}


          
        </Table>  
        </Menus>  
      </div>
  );
}


export default DashboardTable
