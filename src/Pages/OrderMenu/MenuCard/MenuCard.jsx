import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../../Hooks/useCart';

const MenuCard = ({ data }) => {
    const { image, name, recipe, price, _id } = data
    const { user } = useContext(AuthContext)
    const {refetch} = useCart()
    const navigate = useNavigate()
    const location = useLocation()

    const handleAddToCart = item => {
        if (user && user.email) {
            const cartItem = {foodId : _id , image, name, price, email : user.email}

            fetch(`http://localhost:3000/carts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        refetch();
                        Swal.fire({
                            icon: 'success',
                            text: 'Food added to cart successfully'
                        });
                    }
                    console.log(data); // Access the response data here
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
        } else {
            Swal.fire({
                title: 'Please login to order the food',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login'
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', {state : {from : location}})
                }
              })
            }
        }


    return (
        <div className="card w-96 shadow-2xl rounded-none">
            <figure><img className='w-full' src={image} alt="car!" /></figure>
            <p className='absolute right-0 m-3 p-2 bg-slate-800 text-white'>$ {price}</p>
            <div className="card-body flex flex-col justify-center items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <button onClick={() => handleAddToCart(data)} className="btn border-[#BB8506] text-[#BB8506] bg-gray-100 font-bold border-0 border-b-4">Add To Cart</button>
            </div>
        </div>
    );
};

export default MenuCard;