import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { signOutUserStart, signOutUserSuccess, signOutUserFailure } from '../redux/user/userSlice';

function Header() {
    const {currentUser} = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleSignOut() {
      

    try {
      // Dispatch the signOutUserStart action
      dispatch(signOutUserStart());

      // Remove the token from local storage
      localStorage.removeItem('token');

      // Dispatch the signOutUserSuccess action
      dispatch(signOutUserSuccess());

      // Redirect the user to the login page (or wherever you want them to go after logging out)
      navigate('/sign-in');
    } catch (error) {
      // If there's an error, dispatch the signOutUserFailure action with the error message
      dispatch(signOutUserFailure(error.message));
    }
      
    }

    return (
        <header className="bg-gray-800 text-white shadow-md">
  <div className="flex justify-between items-center max-w-7.5xl mx-auto p-3">
    <div></div>{}
    <Link to='/' className="text-white hover:text-gray-300">
      <h1 className="font-bold text-xl sm:text-2xl">
        <span className="text-blue-500">Employee</span>
        <span className="text-blue-300">Data</span>
      </h1>
    </Link>
    
    <ul className='flex gap-4'>
      
      {currentUser ? (
        <li className=' text-gray-300 hover:underline ' onClick={handleSignOut}>Sign Out</li>
      ) : (
          <Link to='/sign-in'>
             <li className=' text-gray-300 hover:underline'>Sign In</li>
          </Link>
      )}     
    </ul>
    
  </div>
</header>

    )
}

export default Header
