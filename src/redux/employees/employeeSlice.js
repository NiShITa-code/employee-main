import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await fetch('https://localhost:7127/api/employee');
    const employees = await response.json();
    return employees;
});
export const addEmployee = createAsyncThunk(
  'employees/add',
  async (employee, thunkAPI) => {
    const response = await fetch('https://localhost:7127/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  }
);

export const fetchEmployeeByEmail = createAsyncThunk(
  'employees/fetchEmployeeByEmail',
  async (email, thunkAPI) => {
    const response = await fetch(`https://localhost:7127/api/employee/employee-details?email=${email}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const employee = await response.json();

    return employee;
  }
);
export const updateEmployee = createAsyncThunk(
  'employees/update',
  async ({ id, employee }, thunkAPI) => {
    const response = await fetch(`https://localhost:7127/api/employee/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(employee)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return { id, employee: data };
  }
);
  export const deleteEmployee = createAsyncThunk('employees/deleteEmployee',
    async (id, thunkAPI) => {
      const response = await fetch(`https://localhost:7127/api/employee/${id}`, {
        method: 'DELETE', // make sure to use the correct HTTP method
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return id;
  });  
  export const addQualifications = createAsyncThunk(
    'employees/addQualifications',
    async ({ id, qualifications }, thunkAPI) => {
      const response = await fetch(`https://localhost:7127/api/employee/${id}/qualifications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({qualifications})
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      return { id, qualifications: data };
    }
  );
  export const uploadDocuments = createAsyncThunk(
    'employees/uploadDocuments',
    async (employeeDocuments, thunkAPI) => {
      const formData = new FormData();
      formData.append('employeeId', employeeDocuments.employeeId);
      employeeDocuments.documents.forEach((doc, index) => {
        formData.append(`documents[${index}].file`, doc.file);
        formData.append(`documents[${index}].remark`, doc.remark);
      });
  
      const response = await fetch('https://localhost:7127/api/employee/UploadFiles', {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Response status:', response.status);
      const text = await response.text();
      console.log('Response text:', text);
  
      const data = await response.json();
     

  
      return data;
    }
  );
  
  export const fetchEmployeeDocuments = createAsyncThunk(
    'employees/fetchEmployeeDocuments',
    async (employeeId, thunkAPI) => {
      const response = await fetch(`https://localhost:7127/api/employee/GetEmployeeDocuments/${employeeId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      return data;
    }
  );

const employeeSlice = createSlice({
    name: 'employees',
    initialState: [],
    
    extraReducers: (builder) => {
        builder
          .addCase(fetchEmployees.fulfilled, (state, action) => {
            return action.payload;
          });
        builder.addCase(deleteEmployee.fulfilled, (state, action) => {
            return state.filter((employee) => employee.id !== action.payload);
          });
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.push(action.payload);
          });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            const { id, employee } = action.payload;
            const index = state.findIndex((emp) => emp.id === id);
            if (index !== -1) {
              state[index] = employee;
            }
          }); 
          builder.addCase(addQualifications.fulfilled, (state, action) => {
            const { id, qualifications } = action.payload;
            const employee = state.find((employee) => employee.id === id);
            if (employee) {
              employee.qualifications = qualifications;
            }
          });  
          builder.addCase(uploadDocuments.fulfilled, (state, action) => {
            const { employeeId, files } = action.payload;
            const employee = state.find((employee) => employee.id === employeeId);
            if (employee) {
              employee.documents = files;
            }
          });
          
          builder.addCase(fetchEmployeeDocuments.fulfilled, (state, action) => {
            const { employeeId, documents } = action.payload;
            const employee = state.find((employee) => employee.id === employeeId);
            if (employee) {
              employee.documents = documents;
            }
          });

          builder.addCase(fetchEmployeeByEmail.fulfilled, (state, action) => {
            // Here you can decide what to do with the fetched employee.
            // For example, you can add it to the state if it's not already there:
            const employee = action.payload;
            const index = state.findIndex((emp) => emp.id === employee.id);
            if (index === -1) {
              state.push(employee);
            }
          });
      },
});



export default employeeSlice.reducer;