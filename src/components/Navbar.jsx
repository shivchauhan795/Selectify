import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import favicon from '../assets/favicon.png'

const Navbar = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();

    // Check if the token exists
    const token = cookies.get("SELECTIFY_TOKEN");

    const handleLogout = () => {
        cookies.remove("SELECTIFY_TOKEN")
        navigate('/login')
    }
    return (
        <div className='logo bg-slate-700 h-16 w-full flex flex-wrap items-center text-white px-20 justify-between'>
            <span className='text-xl flex items-center gap-2'>
                <Link to={'/'}>
                    <h1 className='text-2xl flex justify-center items-center gap-2'><img className='w-10' src={favicon} alt='favicon' />Selectify</h1>
                </Link>
            </span>

            <div className='navlinks flex gap-4'>
                {
                    token ? (
                        <>
                            <Link to={"/dashboard"}>DASHBOARD</Link>
                            <Link to={"/upload"}>UPLOAD</Link>
                            {/* <Link to={"/createevent"}>CREATE EVENT</Link> */}
                            {/* <Link to={"/scanqr"}>SCAN QR</Link> */}
                            <button onClick={handleLogout}>LOGOUT</button>
                        </>

                    ) : (
                        <>
                            <Link to={"/login"}>LOGIN</Link>
                            {/* <Link to={"/register"}>Register</Link> */}
                        </>

                    )
                }
            </div>
        </div>
    )
}

export default Navbar