import React, { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import { FaFacebookF } from 'react-icons/fa';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SocialLogin = () => {
    const{googleLogin, setUser, setLoading} = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.form?.pathname || '/'

    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                const savedUser = {name : user.displayName, email : user.email}

                fetch('http://localhost:3000/users',{
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify(savedUser)
                })
                .then( res => res.json())
                .then(() => {
                        navigate(from, {replace : true});
                        setLoading(false);
                        setUser(user)
                })
                Swal.fire({
                    icon: 'success',
                    text: 'Login Successfully',
                  })
            })
            .catch((error) => {
                const errorMessage = error.message;
                setLoading(false);
            });
    };
    return (
        <div className='flex justify-between md:w-1/3 mx-auto mt-3 cursor-pointer'>
            <div className='p-3 rounded-full border-2 border-[#444444]'><FaFacebookF className='h-5 w-5' /></div>
            <div onClick={handleGoogleLogin} className='p-3 rounded-full border-2 border-[#444444]'><BsGoogle className='h-5 w-5' /></div>
            <div className='p-3 rounded-full border-2 border-[#444444]'><BsGithub className='h-5 w-5' /></div>
        </div>
    );
};

export default SocialLogin;