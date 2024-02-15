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
import { HiPencil, HiTrash, HiDocument } from "react-icons/hi2";
import Modal from "../reusable_ui/Modal";
import EmployeeDocuments from "./EmployeeDocuments";

function DashboardTable({onEdit}) {
  const employees = useSelector(state => state.employees);

  const dispatch = useDispatch();
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [employeeToEdit, setEmployeeToEdit] = useState(null); // New state for the employee to edit
  
  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch]);


  const handleConfirmDelete = async (employee) => {
    await dispatch(deleteEmployee(employee.id));
    setEmployeeToDelete(null)
    
  };

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
   
  };
  const handleDelete = (employee) => {
    setEmployeeToDelete(employee);
    console.log("employeeToDelete set");
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
          <div>Documents</div>  
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
          <div>
          <Modal>
          <Modal.Open opens="form">
            
          <HiDocument className="text-green-500 hover:text-green-700 text-2xl cursor-pointer m-4" />
            
          </Modal.Open>
          <Modal.Window name="form">
            <EmployeeDocuments
            employeeId={employee.id}
            />
          </Modal.Window>
        </Modal>
            
            
          </div>
      <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={employee.id}/>
              <Menus.List id={employee.id}>
                <Modal.Open opens="edit">
                <Menus.Button onClick={() => handleEdit(employee)} icon={<HiPencil />}>
                    Update
                  </Menus.Button>
              </Modal.Open>
               <Modal.Open opens="delete">
                <Menus.Button
      icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
              </Menus.List>
              
                <Modal.Window name="edit">
              <CreateEmployeeForm employeeToEdit={employee} />
            </Modal.Window>
            <Modal.Window name="delete">
              <ConfirmDelete
                
                resourceName="employee"
                onConfirm={() => handleConfirmDelete(employee)}
                onCloseModal={() => setEmployeeToDelete(null)}           
              />
            </Modal.Window>
            </Menus.Menu>
          </Modal>
      </div>

    </Table.Row>
  ))}


        </Table>  
        </Menus> 
      
      </div>
  );
}


export default DashboardTable