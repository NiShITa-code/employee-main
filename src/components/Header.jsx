import { Link } from "react-router-dom";
import { useSelector } from "react-redux";


function Header() {
    const {currentUser} = useSelector(state => state.user)

    return (
        <header className="bg-gray-800 text-white shadow-md">
  <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
    
    <Link to='/' className="text-white hover:text-gray-300">
      <h1 className="font-bold text-lg sm:text-xl">
        <span className="text-blue-500">Employee</span>
        <span className="text-blue-300">Data</span>
      </h1>
    </Link>
    
    <ul className='flex gap-4'>
      <li className='hidden sm:inline text-gray-300 hover:underline'>
        <Link to='/'>Dashboard</Link>
      </li>
      <Link to='/sign-in'>
         {currentUser?(<img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt='profile'/>):(<li className=' text-gray-300 hover:underline'>Sign In</li>)}  
      </Link>
    </ul>
  
  </div>
</header>

    )
}

export default Header
