import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useMenu from '../../../Hooks/useMenu';
import { Helmet } from 'react-helmet-async';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageItems = () => {
    const [menu, refetch] = useMenu();
    const [axiosSecure] = useAxiosSecure()


    const handleDelete = menu =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`http://localhost:3000/menu/${menu._id}`)
                .then(data => {
                    if (data.data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Deleted!',
                            'Menu successfully deleted',
                            'success'
                          )
                    }
                    console.log(data.data)
                })
                .catch(error =>{
                    console.log(error.message)
                })
            }
          })
    }
    return (
        <div>
            <Helmet>
                <title>Food Land || Manage Items</title>
            </Helmet>
            <SectionTitle heading='Manage All Items' subHeading='Hurry Up!!'></SectionTitle>
            <div className='md:mx-20 md:mt-10 bg-[#e8e8e8] rounded-lg md:py-8'>
                <p className='uppercase text-2xl font-[Cinzel] font-semibold p-10'>Total Menu : {menu.length}</p>
                <div className="overflow-x-auto px-10">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='bg-[#D1A054]'>#</th>
                                <th className='bg-[#D1A054]'>Item Image</th>
                                <th className='bg-[#D1A054]'>Item Name</th>
                                <th className='bg-[#D1A054]'>Price</th>
                                <th className='bg-[#D1A054]'>Action</th>
                                <th className='bg-[#D1A054]'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 2 */}
                            {
                                menu.map((mn, index) =>
                                    <tr key={mn._id} className="hover">
                                        <th>{index + 1}</th>
                                        <td><img className='w-20' src={mn.image} alt="" /></td>
                                        <td>{mn.name}</td>
                                        <td>${mn.price}</td>
                                        <td><div onClick={() => handleUpdate(mn)} className='bg-[#D1A054] text-white p-2 flex justify-center rounded-md md:w-1/3'><FaEye /></div></td>
                                        <td><div onClick={() => handleDelete(mn)} className='bg-red-700 text-white p-2 flex justify-center rounded-md md:w-1/3'><FaTrashAlt /></div></td>
                                    </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;