import React from 'react';
import FormRow from "../reusable_ui/FormRow";
import Input from "../reusable_ui/Input";
import Button from '../reusable_ui/Button';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
function AddEmployeeDocument({ register, index, removeDocument, field, setValue, control, getValues }) {
 
  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setValue(`documents[${index}].file`, event.target.files[0]);
    setTimeout(() => {
      const documents = getValues('documents');
      console.log(documents[index].file); // Log the current file value
    }, 0);
  };

 
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormRow label={`Document`}>
          <Controller
            control={control}
            name={`documents[${index}].file`}
            render={({ field }) => (
          <Input
            type="file"
            onChange={(e) => {
              field.onChange(e.target.files[0]); // Update the state with the first selected file
              onFileChange(e);
            }}
          />
            )}
            />
        </FormRow>
        <button 
          type="button" 
          onClick={() => removeDocument(index)}
          style={{
            backgroundColor: '#f44336', /* Red */
            border: 'none',
            color: 'white',
            padding: '5px 10px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '12px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '12px',
          }}
        >
          -
        </button>
      </div>
      
      
      <FormRow label="Remarks">
        <Input
          type="text"
          {...register(`documents[${index}].remarks`, {
            required: "This field is required",
          })}
          defaultValue={field.remarks} // make sure to set up defaultValue
        />
      </FormRow>
      
     
    </div>
  );
}

export default AddEmployeeDocument;