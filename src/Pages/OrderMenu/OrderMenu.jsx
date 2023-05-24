import React, { useEffect, useState } from 'react';
import coverImg from '../../assets/shop/banner2.jpg'
import Cover from '../Shared/Cover/Cover';
import useMenu from '../../Hooks/useMenu';
import MenuCard from './MenuCard/MenuCard';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const OrderMenu = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams()
    const currentIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(currentIndex)
    const [menu] = useMenu()
    const [tabMenu, setTabMenu] = useState([])
    const [loading, setLoading] = useState(true)
    // const [active, setActive] = useState('')
    // console.log(tabIndex)

    useEffect(()=>{
        if(currentIndex === 0){
            const saladMenu = menu.filter(mn => mn.category === 'salad')
            setTabMenu(saladMenu)
            setLoading(false)
        } else if (currentIndex === 1){
            const pizzaMenu = menu.filter(mn => mn.category === 'pizza')
            setTabMenu(pizzaMenu)
            setLoading(false)
        } else if( currentIndex === 2){
            const soupMenu = menu.filter(mn => mn.category === 'soup')
            setTabMenu(soupMenu)
            setLoading(false)
        } else if( currentIndex === 3){
            const dessertMenu = menu.filter(mn => mn.category === 'dessert')
            setTabMenu(dessertMenu)
            setLoading(false)
        } else if(currentIndex === 4){
            const drinksMenu = menu.filter(mn => mn.category === 'drinks')
            setTabMenu(drinksMenu)
            setLoading(false)
        }
    },[currentIndex, menu])


    const handleTab = (active) => {
        if (active == 'salad') {
            const saladMenu = menu.filter(mn => mn.category == 'salad')
            setTabMenu(saladMenu)
            setTabIndex(0)
            // setActive('salad')
        } else if (active == 'pizza') {
            const pizzaMenu = menu.filter(mn => mn.category == 'pizza')
            setTabMenu(pizzaMenu)
            setTabIndex(1)
            // setActive('pizza')
        } else if (active == 'soup') {
            const soupMenu = menu.filter(mn => mn.category == 'soup')
            setTabMenu(soupMenu)
            setTabIndex(2)
            // setActive('soup')
        } else if (active == 'dessert') {
            const dessertMenu = menu.filter(mn => mn.category == 'dessert')
            setTabMenu(dessertMenu)
            setTabIndex(3)
            // setActive('dessert')
        } else if (active == 'drinks') {
            const drinksMenu = menu.filter(mn => mn.category == 'drinks')
            setTabMenu(drinksMenu)
            setTabIndex(4)
            // setActive('drinks')
        }

    }

    return (
        <div className=''>
            <Helmet>
                <title>Food Land | Order Menu</title>
            </Helmet>
            <Cover img={coverImg} title='Our Shop' />
            <div className="tabs my-10 flex justify-center">
                <p onClick={() => handleTab('salad')} className={`tab uppercase ${tabIndex === 0 && ' tab-bordered border-[#BB8506] font-bold text-[#BB8506]'}`}>Salad</p>
                <p onClick={() => handleTab('pizza')} className={`tab uppercase ${tabIndex === 1 && ' tab-bordered border-[#BB8506] font-bold text-[#BB8506]'}`}>pizza</p>
                <p onClick={() => handleTab('soup')} className={`tab uppercase ${tabIndex === 2 && ' tab-bordered border-[#BB8506] font-bold text-[#BB8506]'}`}>Soups</p>
                <p onClick={() => handleTab('dessert')} className={`tab uppercase ${tabIndex === 3 && ' tab-bordered border-[#BB8506] font-bold text-[#BB8506]'}`}>Desserts</p>
                <p onClick={() => handleTab('drinks')} className={`tab uppercase ${tabIndex === 4 && ' tab-bordered border-[#BB8506] font-bold text-[#BB8506]'}`}>Drinks</p>
            </div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-5 my-10'>
                { 
                    loading ? <p>Loading.......</p> :
                    tabMenu.map(tm => <MenuCard
                        key={tm._id}
                        data={tm}
                    />)
                }
            </div>
        </div>
    );
};

export default OrderMenu;