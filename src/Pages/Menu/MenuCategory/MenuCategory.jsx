import React from 'react';
import MenuItem from '../../Shared/MenuItem/MenuItem';
import { Link } from 'react-router-dom';

const MenuCategory = ({data, category}) => {
    return (
        <div className='flex flex-col md:w-10/12 w-11/12 mx-auto'>
        <div className="grid md:grid-cols-2 gap-10 mt-16 mb-5">
            {
                data.map(item => <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
        </div>
        <div className='mx-auto mb-10'>
         <Link to={`/orderMenu/${category}`}><button className={`btn btn-outline border-0 border-b-4 ${category == 'popular' && 'hidden'}`}>Order Your Favorite Food</button></Link>
        </div>
        </div>
            
    );
};

export default MenuCategory;