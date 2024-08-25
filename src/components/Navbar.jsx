import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

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
                    Eventoz
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
                            <Link to={"/login"}>Login</Link>
                            <Link to={"/register"}>Register</Link>
                        </>

                    )
                }
            </div>
        </div>
    )
}

export default Navbar