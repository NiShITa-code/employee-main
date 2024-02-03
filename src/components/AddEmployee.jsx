import React, { useState } from 'react';
import Button from "../reusable_ui/Button";
import Modal from "../reusable_ui/Modal";
import CreateEmployeeForm from './CreateEmployeeForm';
function AddEmployee() {
    return (
      <div>
        <Modal>
          <Modal.Open opens="form">
            <div >
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4 text-lg"> Add Employee</button>
            </div>
          </Modal.Open>
          <Modal.Window name="form">
            <CreateEmployeeForm />
          </Modal.Window>
        </Modal>
      </div>
    );
  }
  export default AddEmployee;