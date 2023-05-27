import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
    const {signOutUser, user} = useContext(AuthContext)

    const handleSignOut = () =>{
        signOutUser()
        .then(result=>{})
        .catch(error=>{
            console.log(error.message)
        })
    }

    const navOptions = <>
        <li className="uppercase font-bold"><Link to='/'>home</Link></li>
        <li className="uppercase font-bold"><Link to='/menu'>menu</Link></li>
        <li className="uppercase font-bold"><Link to='/orderMenu/salad'>order menu</Link></li>
    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 md:px-16 bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">Food Land</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <div className="flex space-x-5 items-center">
                            {
                                user?.photoURL ? <img className="w-6 h-6 rounded-full" src={user?.photoURL} alt="" /> : <FaUser className="h-5 w-5"/>
                            }
                            <button onClick={handleSignOut} className="font-bold">Sign Out</button>
                        </div> : 
                    <Link to='/login'><button className="font-bold">Login</button></Link>
                    }
                </div>
            </div>
        </>
    );
};

export default NavBar;