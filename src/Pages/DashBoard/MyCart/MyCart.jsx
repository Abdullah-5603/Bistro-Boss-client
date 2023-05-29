import React, { useContext } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import useCart from '../../../Hooks/useCart';
import { FaTrash, FaTrashAlt } from 'react-icons/fa';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';

const MyCart = () => {
    const { cart, refetch } = useCart()
    const {user} = useContext(AuthContext)

    const totalPrice = cart.reduce((sum, item) => item.price + sum , 0);

    const handleDelete = _id => {
        fetch(`http://localhost:3000/carts?id=${_id}`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            if(data.deletedCount > 0){
                refetch();
                Swal.fire({
                    icon: 'success',
                    text: 'Item removed successfully',
                  })
            }
            console.log(data);
          })
          .catch(error => {
            console.log(error.message);
          });
      };
      
    // console.log(cart)
    return (
        <div>
            <Helmet>
                <title>Food Land | My Cart</title>
            </Helmet>
            <SectionTitle heading='Wanna Add more?' subHeading='My cart'></SectionTitle>
            <div className='md:mx-20 md:mt-10 bg-white rounded-lg md:py-8'>
                <div className='flex justify-between items-center p-10'>
                    <p className='uppercase text-2xl font-[Cinzel] font-semibold'>Total Orders : {cart.length}</p>
                    <p className='uppercase text-2xl font-[Cinzel] font-semibold'>Total Price : ${totalPrice.toFixed(2)}</p>
                    <button className='uppercase bg-[#D1A054] p-2 text-white rounded-md font-[Cinzel] font-semibold'>Pay</button>
                </div>
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
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 2 */}
                        {
                            cart.map((ct, index) =>                             
                            <tr key={ct._id} className="hover">
                            <th>{index + 1}</th>
                            <td><img className='w-18 h-14' src={ct.image} alt="" /></td>
                            <td>{ct.name}</td>
                            <td>${ct.price}</td>
                            <td><div onClick={()=>handleDelete(ct._id)} className='bg-red-700 text-white p-2 flex justify-center rounded-md md:w-1/3'><FaTrashAlt/></div></td>
                        </tr>)
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyCart;







