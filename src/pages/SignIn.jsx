import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
      event.preventDefault();

      try {
          const response = await axios.post('https://localhost:7127/api/account/login', {
              email: email,
              password: password
          });

          if (response.status === 200) {
              // Login was successful
              // If the API returns a token, you can store it in local storage or in a cookie
              console.log('Login successful');
          } else {
              // Handle login failure
              console.error('Login failed');
          }
      } catch (error) {
          // Handle error
          console.error('An error occurred while logging in', error);
      }
    };  
    return (
         <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' />
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' />
        <button type="submit" className='bg-green-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign In</button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
    </div>
    );
}

export default SignIn
