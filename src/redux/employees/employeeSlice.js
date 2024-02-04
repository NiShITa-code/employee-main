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
      },
});



export default employeeSlice.reducer;