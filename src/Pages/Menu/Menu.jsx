import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import banner from '../../assets/menu/banner3.jpg'
import dessert from '../../assets/menu/dessert-bg.jpeg'
import pizza from '../../assets/menu/pizza-bg.jpg'
import salad from '../../assets/menu/salad-bg.jpg'
import soup from '../../assets/menu/soup-bg.jpg'
import MenuCategory from './MenuCategory/MenuCategory';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useMenu from '../../Hooks/useMenu';

const Menu = () => {
    const [menu] = useMenu()

    const dessertMenu = menu.filter(mn => mn.category === 'dessert')
    const offerMenu = menu.filter(mn => mn.category === 'offered')
    const pizzaMenu = menu.filter(mn => mn.category === 'pizza')
    const saladMenu = menu.filter(mn => mn.category === 'salad')
    const soupMenu = menu.filter(mn => mn.category === 'soup')

    return (
        <div>
            <Helmet>
                <title>Food Land | Menu</title>
            </Helmet>
            {
                offerMenu && <div className='flex flex-col'>
                    <Cover img={banner} title='Our Menu' />
                    <SectionTitle heading="Today's Offer" subHeading="Don't Miss"></SectionTitle>
                    <MenuCategory data={offerMenu} category='offer'></MenuCategory>
                </div>
            }
            {
                dessertMenu && <div className='flex flex-col'>
                    <Cover img={dessert} title='Desserts' />
                    <MenuCategory data={dessertMenu} category='dessert'></MenuCategory>
                </div>
            }
            {
                pizzaMenu && <div className='flex flex-col'>
                    <Cover img={pizza} title='Pizza' />
                    <MenuCategory data={pizzaMenu} category='pizza'></MenuCategory>
                </div>
            }
            {
                saladMenu && <div className='flex flex-col'>
                    <Cover img={salad} title='Salads' />
                    <MenuCategory data={saladMenu} category='salad'></MenuCategory>
                </div>
            }
            {
                soupMenu && <div className='flex flex-col'>
                    <Cover img={soup} title='Soups' />
                    <MenuCategory data={soupMenu} category='soup'></MenuCategory>
                </div>
            }
        </div>
    );
};

export default Menu;