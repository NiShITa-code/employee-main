import { useForm } from "react-hook-form";
import Input from "../reusable_ui/Input";
import Form from "../reusable_ui/Form";
import Button from "../reusable_ui/Button";
import FormRow from "../reusable_ui/FormRow";
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee } from "../redux/employees/employeeSlice.js";

function CreateEmployeeForm({ employeeToEdit = {}, onCloseModal}) {
    const { id: editId, ...editValues } = employeeToEdit;
    const isEditSession = Boolean(editId);

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: isEditSession ? employeeToEdit : {},
    });

    const { errors } = formState;
    const dispatch = useDispatch();
   
    
        const onSubmit =(data) => {
            try {
                if (isEditSession) {
                    dispatch(updateEmployee({ id: editId, employee: data }));
                    console.log('Employee updated successfully');
                } else {
                    dispatch(addEmployee(data));
                    console.log('Employee added successfully');
                }
                reset();
                onCloseModal?.();
            } catch (error) {
                console.error('Error:', error);
            }
        };

    return (
        <Form className="border p-7 rounded-lg" type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit)}>
            <button type="button" onClick={onCloseModal} className="absolute right-0 top-0 m-2">
        X
      </button>
            <FormRow label="S.No">
                <Input
                    type="number"
                    id="id"
                    {...register("id", {
                        required: "This field is required",
                        
                        min: { value: 1, message: "S.No should be greater than 0" },
                    })}
                />
            </FormRow>

            <FormRow label="First Name">
                <Input
                    type="text"
                    id="firstName"
                    {...register("firstName", {
                        required: "This field is required",
                        minLength: { value: 2, message: "Name should be at least 2 characters" },
                    })}
                />
            </FormRow>
            <FormRow label="Last Name">
                <Input
                    type="text"
                    id="lastName"
                    {...register("lastName", {
                        required: "This field is required",
                        minLength: { value: 2, message: "Name should be at least 2 characters" },
                    })}
                />
            </FormRow>

            <FormRow label="Email Id">
                <Input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Gender">
                <Input
                    type="text"
                    id="gender"
                    {...register("gender", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Department">
                <Input
                    type="text"
                    id="department"
                    {...register("department", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Salary">
                <Input
                    type="number"
                    id="salary"
                    {...register("salary", {
                        required: "This field is required",
                        min: { value: 1, message: "Salary should be greater than 0" },
                    })}
                />
            </FormRow>

            <FormRow label="Address">
                <Input
                    type="text"
                    id="address"
                    {...register("address", {
                        required: "This field is required",
                    })}
                />
            </FormRow>
            {isEditSession && (
            <FormRow label="Is Active">
                <Input
                    type="checkbox"
                    id="isActive"
                    {...register("isActive")}
                />
            </FormRow>)}

            <FormRow>
                <Button
                    variation="danger"
                    type="reset"
                    onClick={() => onCloseModal?.()}
                >
                    Cancel
                </Button>
                <Button>
                    {isEditSession ? "Edit" : "Create new"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateEmployeeForm;