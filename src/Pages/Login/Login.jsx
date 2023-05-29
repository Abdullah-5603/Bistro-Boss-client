import React, { useContext, useEffect, useRef, useState } from 'react';
import bgImg from '../../assets/others/authentication.png';
import loginImg from '../../assets/others/authentication2.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaFacebookF } from 'react-icons/fa';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Providers/AuthProvider';
import Loader from '../Shared/Loader/Loader';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
    const { loading, setUser, setLoading, loginUser, googleLogin } = useContext(AuthContext);
    const captchaRef = useRef();
    const [disabled, setDisabled] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.form?.pathname || '/'

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('');
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        loginUser(email, password)
            .then((result) => {
                const user = result.user;
                Swal.fire({
                    icon: 'success',
                    text: 'Login Successfully',
                  })
                navigate(from, {replace : true});
                setLoading(false);
                form.reset();
            })
            .catch((error) => {
                const errorMessage = error.message;
                if (errorMessage === 'Firebase: Error (auth/invalid-email).') {
                    setError('Please enter a valid email address');
                } else {
                    setError('Login failed. Please try again.');
                }
                setLoading(false);
            });
    };

    const handleCaptcha = (event) => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Food Land | Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen" style={{ backgroundImage: `url('${bgImg}')` }}>
                <div className="hero-content flex-col justify-between md:my-10 md:flex-row w-10/12 shadow-black shadow-2xl" style={{ backgroundImage: `url('${bgImg}')` }}>
                    <div className="text-center lg:text-left w-1/2">
                        <img src={loginImg} alt="" />
                    </div>
                    <div className="w-1/2 bg-transparent">
                        {loading && <Loader />}
                        <div className="card-body">
                            <p className="text-3xl font-bold text-center pb-5">Login</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label htmlFor="" className="font-semibold mb-2">
                                        Email
                                    </label>
                                    <input type="text" name="email" placeholder="Email" className="input input-bordered focus:outline-none" required />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="" className="font-semibold mb-2">
                                        Password
                                    </label>
                                    <input type="password" name="password" placeholder="Password" className="input input-bordered focus:outline-none" required />
                                </div>
                                <div className="form-control my-3">
                                    <LoadCanvasTemplate />
                                    <input type="text" ref={captchaRef} onBlur={handleCaptcha} name="captcha" placeholder="Type the captcha text" className="input input-bordered focus:outline-none mt-3" />
                                </div>
                                <p className="text-red-800 mt-3">{error}</p>
                                <div className="form-control mt-6">
                                    <button disabled={disabled} type="submit" className="btn hover:bg-[#D1A054] hover:border-none bg-[#D1A054] border-none text-white font-bold">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <p className="text-[#D1A054] text-center">
                                New Here ? <Link to="/signUp"><span className="font-bold underline">Create An Account</span></Link>
                            </p>
                            <p className="font-bold text-center">Or Sign In With</p>
                            <SocialLogin/>
                            {/* <div className="flex justify-between md:w-1/3 mx-auto mt-3 cursor-pointer">
                                <div className="p-3 rounded-full border-2 border-[#444444]"><FaFacebookF className="h-5 w-5" /></div>
                                <div onClick={handleGoogleLogin} className="p-3 rounded-full border-2 border-[#444444]"><BsGoogle className="h-5 w-5" /></div>
                                <div className="p-3 rounded-full border-2 border-[#444444]"><BsGithub className="h-5 w-5" /></div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
