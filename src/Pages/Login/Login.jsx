import React, { useEffect, useRef } from 'react';
import bgImg from '../../assets/others/authentication.png';
import loginImg from '../../assets/others/authentication2.png'
import { Link } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa'
import { BsGithub, BsGoogle } from 'react-icons/bs'
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';

const Login = () => {
    const captchaRef = useRef()

    useEffect(()=>{
        loadCaptchaEnginge(6)
    },[])

    const handleSubmit = event => {

    }

    const handleCaptcha = () =>{
        const captchaValue = captchaRef.current.value;
        console.log(captchaValue)
    }
    return (

        <div className="hero bg-base-200 min-h-screen" style={{ backgroundImage: `url('${bgImg}')` }}>
            <div className="hero-content flex-col justify-between lg:flex-row w-full">
                <div className="text-center lg:text-left w-1/2">
                    <img src={loginImg} alt="" />
                </div>
                <div className="w-1/2 bg-transparent">
                    <div className="card-body">
                        <p className='text-3xl font-bold text-center pb-5'>Login</p>
                        <div className="form-control">
                            <label htmlFor="" className='font-semibold mb-2'>Email</label>
                            <input type="text" name='email' placeholder="Email" className="input input-bordered focus:outline-none" />
                        </div>
                        <div className="form-control">
                            <label htmlFor="" className='font-semibold mb-2'>Password</label>
                            <input type="password" name='password' placeholder="Password" className="input input-bordered focus:outline-none" />
                        </div>
                        <div className="form-control my-3">
                            <LoadCanvasTemplate/>
                            <input type="text" ref={captchaRef} onChange={handleCaptcha} name='captcha' placeholder="Type the captcha text" className="input input-bordered focus:outline-none mt-3" />
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn hover:bg-[#D1A054] hover:border-none bg-[#D1A054] border-none text-white font-bold">Login</button>
                        </div>
                        <p className='text-[#D1A054] text-center'>New Here ? <Link to='/signUp'><span className='font-bold underline'>Create An Account</span></Link></p>
                        <p className='font-bold text-center'>Or Sign In With</p>
                        <div className='flex justify-between md:w-1/3 mx-auto mt-3 cursor-pointer'>
                            <div className='p-3 rounded-full border-2 border-[#444444]'><FaFacebookF className='h-5 w-5' /></div>
                            <div className='p-3 rounded-full border-2 border-[#444444]'><BsGoogle className='h-5 w-5' /></div>
                            <div className='p-3 rounded-full border-2 border-[#444444]'><BsGithub className='h-5 w-5' /></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;