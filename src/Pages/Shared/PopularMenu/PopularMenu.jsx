import React from 'react';
import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from '../../Menu/MenuCategory/MenuCategory';
import useMenu from '../../../Hooks/useMenu';



const PopularMenu = () => {
    const [menu] = useMenu()

    const popularMenu = menu.filter(mn => mn.category === 'popular')
    return (
        <div className="mb-12 flex flex-col">
            <SectionTitle
                heading="From Our Menu"
                subHeading="Popular Items"
            ></SectionTitle>
            <MenuCategory data={popularMenu} />
            <div className='mx-auto mb-10'>
                <button className="btn btn-outline border-0 border-b-4">View Full menu</button>
            </div>
        </div>
    );
};

export default PopularMenu;