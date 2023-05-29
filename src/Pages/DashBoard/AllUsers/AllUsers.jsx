import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { RiAdminFill } from 'react-icons/ri';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const AllUsers = () => {
    const [axiosSecure] = useAxiosSecure()

    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data
    })

    const handleMakeAdmin = user =>{
        fetch(`http://localhost:3000/users/admin/${user._id}`,{
            method : 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    icon: 'success',
                    text: `${user.name} is Admin Now!`,
                    timer: 1500 
                })
            }
            // console.log(data)
        })
    }

    const handleDelete = user => {
        fetch(`http://localhost:3000/users/admin/${user._id}`,{
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount > 0){
                refetch();
                Swal.fire({
                    icon: 'success',
                    text: `User Deleted Successfully`,
                    timer: 1500 
                })
            }
            // console.log(data)
        })
    }

    return (
        <div>
            <Helmet>
                <title>Food Land || All Users</title>
            </Helmet>
            <SectionTitle heading='Manage All Users' subHeading='How Many??' />
            <div className='md:mx-20 md:mt-10 bg-white rounded-lg md:py-8'>
                <p className='uppercase text-2xl font-[Cinzel] font-semibold p-10'>Total Users : {users.length}</p>
                <div className="overflow-x-auto px-10">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='bg-[#D1A054]'>#</th>
                                <th className='bg-[#D1A054]'>Name</th>
                                <th className='bg-[#D1A054]'>Email</th>
                                <th className='bg-[#D1A054]'>Role</th>
                                <th className='bg-[#D1A054]'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 2 */}
                            {
                                users.map((user, index) =>
                                    <tr key={user._id} className="hover">
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role === 'admin' ? <div className='bg-[#D1A054] text-white p-2 flex justify-center rounded-md md:w-1/3'><RiAdminFill/></div> : 
                                        <div onClick={()=> handleMakeAdmin(user)} className='bg-[#D1A054] text-white p-2 flex justify-center rounded-md md:w-1/3'><FaUsers/></div>
                                        }</td>
                                        <td><div onClick={() => handleDelete(user)} className='bg-red-700 text-white p-2 flex justify-center rounded-md md:w-1/3'><FaTrashAlt /></div></td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;