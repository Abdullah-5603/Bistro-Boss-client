import React from 'react';

const MenuCard = ({ data }) => {
    const { image, name, recipe, price } = data
    return (
        <div className="card w-96 shadow-2xl rounded-none">
            <figure><img className='w-full' src={image} alt="car!" /></figure>
            <p className='absolute right-0 m-3 p-2 bg-slate-800 text-white'>$ {price}</p>
            <div className="card-body flex flex-col justify-center items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <button className="btn border-[#BB8506] text-[#BB8506] bg-gray-100 font-bold border-0 border-b-4">Add To Cart</button>
            </div>
        </div>
    );
};

export default MenuCard;