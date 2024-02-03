import { useForm } from "react-hook-form";
import Input from "../reusable_ui/Input";

import Form from "../reusable_ui/Form";
import Button from "../reusable_ui/Button";
import FileInput from "../reusable_ui/FileInput";
import FormRow from "../reusable_ui/FormRow";



function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
 

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;



  

  return (
    <Form className="border p-7 rounded-lg" 
      
      type={onCloseModal ? "modal" : "regular"}
    >
       <FormRow label="name"  >
        <div className="border  border-black">
          <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This field is required",
          })}
        />
        </div>
        
      </FormRow>
  
     

      <FormRow label="Id" >
        <div className="border border-black">
           <Input
          type="number"
          id="Id"
          {...register("Id", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
        </div>
       
      </FormRow>

      <FormRow label="JOB" error={errors?.JOB?.message}>
        <div  className="border border-black">
          <Input
          type="string"
          id="JOB"
          defaultValue={"job"}

          {...register("JOB", {
            required: "This field is required",
            
          })}
        />
        </div>
        
      </FormRow>

      <FormRow label="SNO" error={errors?.SNO?.message}>
        <div className="border border-black">
           <Input
          type="number"
          id="SNO"
          defaultValue={0}
          {...register("SNO", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().SNO
          })}
        />
        </div>
       
      </FormRow>

      

      <FormRow label=" photo">
        <div className="border border-black">
           <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
        </div>
       
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button >
          {isEditSession ? "Edit " : "Create new"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
