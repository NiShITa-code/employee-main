import React, { useState } from 'react';
import Button from "../reusable_ui/Button";
import Modal from "../reusable_ui/Modal";
import CreateEmployeeForm from './CreateEmployeeForm';
function AddEmployee() {
    return (
      <div>
        <Modal>
          <Modal.Open opens="form">
            
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-4 px-5 rounded m-4 text-lg"> Add Employee</button>
            
          </Modal.Open>
          <Modal.Window name="form">
            <CreateEmployeeForm />
          </Modal.Window>
        </Modal>
      </div>
    );
  }
  export default AddEmployee;