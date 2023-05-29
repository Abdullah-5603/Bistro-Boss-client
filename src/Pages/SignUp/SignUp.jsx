import React, { useContext, useState } from 'react';
import bgImg from '../../assets/others/authentication.png';
import loginImg from '../../assets/others/authentication2.png'
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { AuthContext } from '../../Providers/AuthProvider';
import Loader from '../Shared/Loader/Loader';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const SignUp = () => {
    const { setUser, loading, setLoading, createUser, googleLogin, updateUserProfile } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate('/')

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;

        setError('')
        if (password.length < 6) {
            setError('Password must be at least 6 character')
            return;
        }
        createUser(email, password)
            .then(result => {
                const user = result.user;
                user.displayName = name;
                user.photoURL = photoURL

                const savedUser = {name : name, email : email}

                fetch('http://localhost:3000/users',{
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify(savedUser)
                })
                .then( res => res.json())
                .then(data => {
                    if(data.insertedId){
                        Swal.fire({
                            icon: 'success',
                            text: 'Sign Up Successfully',
                        })
                        console.log(user)
                        navigate('/')
                        setLoading(false)
                        form.reset()
                        setUser(user)
                    }
                })

            })
            .catch(error => {
                const errorMessage = error.message;
                if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
                    setError('This account already exists. Please Login')
                } else if (errorMessage == 'Firebase: Error (auth/invalid-email).') {
                    setError('Please enter a valid email address')
                }
                // console.log(errorMessage)
            })
    }


    return (
        <>
            <Helmet>
                <title>Food Land | Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen" style={{ backgroundImage: `url('${bgImg}')` }}>
                <div className="hero-content flex-col justify-between md:my-10 md:flex-row-reverse w-10/12 shadow-black shadow-2xl" style={{ backgroundImage: `url('${bgImg}')` }}>
                    <div className="text-center lg:text-left w-1/2">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="w-1/2 bg-transparent">
                        {
                            loading && <Loader />
                        }
                        <div className="card-body">
                            <p className='text-3xl font-bold text-center pb-5'>Sign Up</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label htmlFor="" className='font-semibold mb-2'>Name</label>
                                    <input type="text" name='name' placeholder="Name" className="input input-bordered focus:outline-none" />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="" className='font-semibold mb-2'>Photo Url</label>
                                    <input type="text" name='photoURL' placeholder="Photo Url" className="input input-bordered focus:outline-none" />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="" className='font-semibold mb-2'>Email</label>
                                    <input type="text" name='email' placeholder="Email" className="input input-bordered focus:outline-none" required />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="" className='font-semibold mb-2'>Password</label>
                                    <input type="password" name='password' placeholder="Password" className="input input-bordered focus:outline-none" required />
                                </div>
                                <p className='text-red-800 mt-3'>{error}</p>
                                <div className="form-control mt-6">
                                    <button type='submit' className="btn hover:bg-[#D1A054] hover:border-none bg-[#D1A054] border-none text-white font-bold">SignUp</button>
                                </div>
                            </form>
                            <p className='text-[#D1A054] text-center'>Already have an account ? <Link to='/login'><span className='font-bold underline'>Please Login</span></Link></p>
                            <p className='font-bold text-center'>Or Sign In With</p>
                            <SocialLogin/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;