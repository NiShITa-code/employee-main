import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import Input from "../reusable_ui/Input";
import Form from "../reusable_ui/Form";
import Button from "../reusable_ui/Button";
import FormRow from "../reusable_ui/FormRow";
import AddQualificationDetails from "./AddQualificationDetails.jsx";
import AddEmployeeDocument from "./AddEmployeeDocuments.jsx";
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee, addQualifications, uploadDocuments } from "../redux/employees/employeeSlice.js";
import { useState } from "react";
import Heading from "../reusable_ui/Heading.jsx";



function CreateEmployeeForm({ employeeToEdit = {}, onCloseModal}) {
    const { id: editId, ...editValues } = employeeToEdit;
    const isEditSession = Boolean(editId);
    
    const { register, handleSubmit, reset, formState, trigger, control, setValue, getValues } = useForm({
        defaultValues: {...isEditSession ? employeeToEdit : {},
        qualifications: isEditSession ? editValues.qualifications.map(({ id, employeeId, ...rest }) => rest) : [{ QualificationName: "", Institution: "", YearOfPassing: "", Percentage: "", Stream: "" }],
        documents: [{ file: null, remarks: "" }]}
    });
    console.log(editValues.qualifications);
    const { fields: qualificationFields, append: appendQualification, remove: removeQualification } = useFieldArray({
        control,
        name: "qualifications",
        defaultValue: isEditSession && editValues.qualifications ? 
        editValues.qualifications.map(({ id, employeeId, ...rest }) => rest) 
        : [{QualificationName: "", Institution: "", Stream: "", YearOfPassing: "", Percentage: "" }] // Adjust this line
    });
    


   
    const { fields: documentFields, append: appendDocument, remove: removeDocument } = useFieldArray({
        control,
        name: "documents",
        defaultValue: isEditSession && editValues.documents ? editValues.documents : [{ file: null, remarks: "" }]
      });
      const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const { errors } = formState;
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const registerUser = async (email, password) => {
        const response = await fetch('https://localhost:7127/api/account/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Email: email,
                Password: password
            })
        });
    
        if (response.ok) {
            const result = await response.json();
            console.log(result.Message);
        } else {
            const error = await response.json();
            console.error(error);
        }
    }
    
   
    
    const onSubmit = async(data) => {
        event.preventDefault();
        
        const employeeDetails = {
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            gender: data.gender,
            department: data.department,
            salary: data.salary,
            address: data.address
        }; 
        try {
            let employeeId;
            if (isEditSession) {
                
                dispatch(updateEmployee({ id: editId, employee: { ...employeeDetails, isActive: data.isActive } }));
                console.log('Employee updated successfully');
                employeeId = editId;
            } else {
                    // Use formData instead of newEmployee
                const newEmployee = await dispatch(addEmployee(employeeDetails)).unwrap();
                console.log('Employee added successfully');
                employeeId = newEmployee.id;
                if (data.qualifications && data.qualifications.length > 0) {
                    const qualificationsWithEmployeeId = data.qualifications.map(qualification => ({
                        ...qualification,
                        EmployeeId: employeeId, // replace employeeId with the actual employee ID
                    }));
        
                    dispatch(addQualifications({ id: employeeId, qualifications: qualificationsWithEmployeeId } ));
                    console.log('Qualifications added successfully');
                }    
                reset();
                            
                if (data.documents && data.documents.length > 0) {
                    console.log('Documents:', data.documents);
                    const documents = data.documents.map(document => ({
                    file: document.file, // get the File object from the FileList
                    remark: document.remarks,
                    }));
                        console.log('Documents:', documents);
                    dispatch(uploadDocuments({ employeeId: employeeId, documents: documents }));
                    console.log('Documents uploaded successfully');
                    registerUser(data.email, "DefaultPassword123!");
                } else {
                    console.log('No documents to upload');
                }
                
              

            }
        } catch (error) {
            console.error('Error:', error);
        }
        onCloseModal?.();
            
    };

    const handleUpload = (file, remarks) => {
        // Add the uploaded document to the state
        console.log(file);
        setUploadedDocuments(prevDocuments => [...prevDocuments, { file, remarks }]);
        setValue(name, file);
    };
    const deleteDocument = (index) => {
        // Remove the document at the given index from the state
        setUploadedDocuments(prevDocuments => prevDocuments.filter((_, i) => i !== index));
        setValue(`documents[${index}].file`, null);
        setValue(`documents[${index}].remarks`, null);
    };
    
    
        const fieldsByStep = {
            1: ["id", "firstName", "lastName", "email", "gender", "department", "salary", "address", "isActive"],
            2: ["qualifications"],
            3: ["documents"],
        };

      
        const nextStep = async (event) => {
            event.preventDefault();
            const currentFields = fieldsByStep[step];
            const isValid = await trigger(currentFields);
            if (isValid) {
                
                setStep(step + 1);
            }
        };

        const prevStep = () => {
            setStep(step - 1);
        }

    return (
        <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <Form className="border p-7 rounded-lg"  type={onCloseModal ? "modal" : "regular"} onSubmit={handleSubmit(onSubmit)}>
            <h1 style={{textAlign: "center", color: "#4a5568", fontSize: "2em", fontWeight: "bold", marginBottom: "20px"}}> {step === 1 && 'Employee Information'}
        {step === 2 && 'Qualification Detail'}
        {step === 3 && 'Additional Documents'}</h1>
            {step === 1 && (
                <>
                {!isEditSession &&(
                <FormRow label="S.No">
                <Input
                    type="number"
                    id="id"
                    {...register("id", {
                        required: "This field is required",
                        
                        min: { value: 1, message: "S.No should be greater than 0" },
                    })}
                />
            </FormRow>)}

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

            {!isEditSession &&(<FormRow label="Email Id">
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
            </FormRow>)}

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

                </>
            )}
            {step === 2 && !isEditSession && (
                
                <>
    {qualificationFields.map((field, index) => (
      <AddQualificationDetails
        key={field.id}
        register={register}
        index={index}
        removeQualification={removeQualification}
        field={field}
        setValue={setValue}
      />
    ))}

     <button type="button" className="border p-2 mt-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-200"  onClick={() => appendQualification({ QualificationName: "", Institution: "", Stream: "", YearOfPassing: "", Percentage: "" })}>
             Add a qualification
    </button>
  </>

  )}
            {step === 3 && !isEditSession && (
                <>
                {documentFields.map((field, index) => (
    
      <AddEmployeeDocument
        key={field.id}
        register={register}
        index={index}
        removeDocument={removeDocument}
        field={field}
        handleUpload={handleUpload}
        control={control}
        setValue={setValue}
        getValues={getValues}
        style={{ marginBottom: '10px' }}
      />
      
    ))}
    <button 
    type="button" 
    className="border p-2 mt-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 transition-colors duration-200" 
    onClick={() => appendDocument({ file: null, remarks: "" })}
    style={{ marginBottom: '10px' }}
>
    Add a document
</button>
   
    </>
            )}
            
            {/* <FormRow>
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
            </FormRow> */}
            <FormRow>
                {step > 1 && !isEditSession && (
                    <Button
                        variation="danger"
                        type="button"
                        onClick={prevStep}
                    >
                        Back
                    </Button>
                )}
                {(step < 3 && !isEditSession) ? (
                    <Button
                        variation="primary"
                        type="button"
                        onClick={nextStep}
                    >
                        Continue
                    </Button>
                ) : (
                    <Button>
                        {isEditSession ? "Save" : "Submit"}
                    </Button>
                )}
            </FormRow>
        </Form>
        </div>
    );
}

export default CreateEmployeeForm;