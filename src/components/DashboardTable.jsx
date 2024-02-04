import Menus from "../reusable_ui/Menus"
import Table from "../reusable_ui/Table"
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmDelete from '../reusable_ui/ConfirmDelete';
import { useSelector } from 'react-redux';
import { fetchEmployees, updateEmployee } from "../redux/employees/employeeSlice";
import { useDispatch } from "react-redux";
import { deleteEmployee } from '../redux/employees/employeeSlice';
import CreateEmployeeForm from "./CreateEmployeeForm";
import { Modal } from "@mui/material";
function DashboardTable({onEdit}) {
  const employees = useSelector(state => state.employees);

  const dispatch = useDispatch();
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [employeeToEdit, setEmployeeToEdit] = useState(null); // New state for the employee to edit

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch]);
  const handleConfirmDelete = (employee) => {
    dispatch(deleteEmployee(employee.id));
  };

    
    // Update the state to remove the deleted employee

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
  {employees.map((employee, index) => (
    <Table.Row key={index}>
      <div>{employee.id}</div>
      <div>{employee.firstName + ' ' + employee.lastName}</div>
      <div>{employee.email}</div>
      <div>{employee.gender}</div>
      <div>{employee.department}</div>
      <div>{employee.salary}</div>
      <div>{employee.address}</div>
      <div>{employee.isActive ? 'Yes' : 'No'}</div>
     
      <button onClick={() =>  setEmployeeToEdit(employee)}><FaEdit /></button>
      <button onClick={() => setEmployeeToDelete(employee)}><FaTrash /></button>
      {employeeToDelete == employee&& (<ConfirmDelete 
      resourceName="employee" 
      onConfirm={() => handleConfirmDelete(employeeToDelete)} 
      onCloseModal={() => setEmployeeToDelete(null)} />)}
      
        
      <div></div>

    </Table.Row>
  ))}


          
        </Table>  
        </Menus> 
        {employeeToEdit && (
        
        <CreateEmployeeForm 
        employeeToEdit={employeeToEdit} 
        onCloseModal={() => setEmployeeToEdit(null)} 
        />
        )} 
      </div>
  );
}


export default DashboardTable
