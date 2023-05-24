import React from 'react';
import Banner from '../Banner/Banner';
import PopularMenu from '../../Shared/PopularMenu/PopularMenu';
import Testimonials from '../Testimonials/Testimonials';
import Category from '../Category/Category';
import Featured from '../Featured/Featured';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Food Land | Home</title>
            </Helmet>
           <Banner/> 
           <Category/>
           <PopularMenu/>
           <Featured/>
           <Testimonials/>
        </div>
    );
};

export default Home;