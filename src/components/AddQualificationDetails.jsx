import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormRow from "../reusable_ui/FormRow";
import Input from "../reusable_ui/Input";
import Button from "../reusable_ui/Button";

function AddQualificationDetails({ register, index, removeQualification, field }) {
    

    return (
        
        <div key={field.id} className='mt-5'>
            <FormRow label={`Qualification Name`}>
                <Input
                    type="text"
                    {...register(`qualifications.${index}.QualificationName`, {
                        required: "This field is required",
                    })}
                    defaultValue={field.QualificationName} // make sure to set up defaultValue
                />
                
            </FormRow>
            <FormRow label={`Institution`}>
                <Input
                    type="text"
                    {...register(`qualifications.${index}.Institution`, {
                        required: "This field is required",
                    })}
                    defaultValue={field.Institution} // make sure to set up defaultValue
                />
            </FormRow>
            <FormRow label={`Stream`}>
                <Input
                    type="text"
                    {...register(`qualifications.${index}.Stream`, {
                        required: "This field is required",
                    })}
                    defaultValue={field.Stream} // make sure to set up defaultValue
                />
            </FormRow>
            <FormRow label={`Year of Passing`}>
                <Input
                    type="number"
                    {...register(`qualifications.${index}.YearOfPassing`, {
                        required: "This field is required",
                        min: { value: 1900, message: "Year should be valid" },
                        max: { value: (new Date()).getFullYear(), message: "Year should be valid" },
                    })}
                    defaultValue={field.YearOfPassing} // make sure to set up defaultValue
                />
            </FormRow>
            <FormRow label={`Percentage`}>
                <Input
                    type="number"
                    {...register(`qualifications.${index}.Percentage`, {
                        required: "This field is required",
                        min: { value: 0, message: "Percentage should be valid" },
                        max: { value: 100, message: "Percentage should be valid" },
                    })}
                    defaultValue={field.Percentage} // make sure to set up defaultValue
                />
            </FormRow>
            {index !== 0 && (
                <button  className="bg-white-500 text-red-500" onClick={() => removeQualification(index)}>Remove</button>
            )}
        </div>
    );
}

export default AddQualificationDetails;