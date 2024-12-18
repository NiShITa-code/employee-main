import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice';

function SignIn() {
    const [formData, setFormData] = useState({})
    const {loading,error} = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch('https://localhost:7127/api/Account/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) { // If the status is not OK
          dispatch(signInFailure('Invalid email or password')); // Dispatch the signInFailure action
          return;
        }
        localStorage.setItem('token', data.token);
        dispatch(signInSuccess(data));
        console.log('Data:', data);
        console.log('User:', data.user);
        if (data.user && data.user.role && data.user.role.includes('Admin')) {
          navigate('/'); // Navigate to the dashboard page
        } else if (data.user && data.user.email) {
          navigate(`/employee-details/${data.user.email}`); // Navigate to the EmployeeDetails page
        } else {
          console.log('Invalid user')
        }
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    };
    return (
       <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':"Sign In"}</button>
      </form>
      {/* <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div> */}
      {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
    )
}

export default SignIn