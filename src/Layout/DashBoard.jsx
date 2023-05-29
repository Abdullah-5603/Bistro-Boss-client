import React from 'react';
import { MdEditCalendar, MdEditDocument } from 'react-icons/md';
import { HiMail } from 'react-icons/hi';
import { ImSpoonKnife } from 'react-icons/im';
import { AiOutlineBars } from 'react-icons/ai';
import { BsPeopleFill } from 'react-icons/bs';
import { GiStarsStack } from 'react-icons/gi';
import { FaBars, FaBook, FaCalendar, FaCartPlus, FaHome, FaWallet } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';

const DashBoard = () => {

    //TODO : make admin from database and load data dynamically
    // const isAdmin = true;
    const {isAdmin} = useAdmin();


    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-[#e8e8e8]">
                <Outlet />
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

            </div>
            <div className="drawer-side bg-[#D1A054] ">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 text-base-content">
                    <li className='md:text-3xl font-bold px-3 pt-5 font-[Cinzel] text-black'>Food Land</li>
                    <li className='md:text-xl font-bold px-3 font-[Cinzel] text-black'>Restaurant</li>
                    {
                        isAdmin ? <>
                            <li className='md:mt-16 font-[Cinzel] text-black'><NavLink to='/dashboard/adminHome' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><FaHome className='w-5 h-5' />Admin Home</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/addItems' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><ImSpoonKnife className='w-5 h-5' />Add Items</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/manageItems' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><AiOutlineBars className='w-5 h-5' />Manage Items</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/manageBookings' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><FaBook className='w-5 h-5' />Manage Bookings</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/allUsers' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}> <BsPeopleFill className='w-5 h-5' />All Users</NavLink></li>
                        </> : <>

                            <li className='md:mt-16 font-[Cinzel] text-black'><NavLink to='/dashboard/userHome' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><FaHome className='w-5 h-5' />User Home</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/reservation' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><FaCalendar className='w-5 h-5' />Reservation</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/paymentHistory' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><FaWallet className='w-5 h-5' />Payment History</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/myCart' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><FaCartPlus className='w-5 h-5' />My Cart</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/addReview' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}> <GiStarsStack className='w-5 h-5' /> Add Review</NavLink></li>
                            <li className='font-[Cinzel] text-black'><NavLink to='/dashboard/myBooking' className={({ isActive, isPending }) => isPending ? "text-black" : isActive ? "text-white" : ""}><MdEditCalendar className='w-5 h-5' />My Booking</NavLink></li>
                        </>
                    }

                    <div className='p-3 mt-3 border-t-2 '></div>
                    <li className='font-[Cinzel] text-black'><NavLink to='/'><FaHome className='w-5 h-5' />Home</NavLink></li>
                    <li className='font-[Cinzel] text-black'><NavLink to='/menu'><FaBars className='w-5 h-5' />Menu</NavLink></li>
                    <li className='font-[Cinzel] text-black'><NavLink to='/orderMenu/salad'><MdEditDocument className='w-5 h-5' />Order Food</NavLink></li>
                    <li className='font-[Cinzel] text-black'><NavLink to='/contact'><HiMail className='w-5 h-5' />Contact</NavLink></li>
                </ul>

            </div>
        </div>
    );
};

export default DashBoard;