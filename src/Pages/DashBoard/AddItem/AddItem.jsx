import React, { useRef } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;

const AddItem = () => {
    const [axiosSecure] = useAxiosSecure()
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.recipeName.value;
        const price = parseFloat(form.price.value);
        const recipe = form.recipeDetails.value;
        const category = form.category.value;
        const photoInput = form.photo; // Get the file input element
        const photo = photoInput.files[0]; // Get the selected file from the input

        const formData = new FormData();
        formData.append('image', photo); // Assuming 'file' is the File object obtained from the file input

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.success){
                    const image = data.data.display_url
                    const newItem = {name, price, recipe, category, image}
                    axiosSecure.post('/menu', newItem)
                    .then(data => {
                        console.log(data.data)
                    })
                    console.log(newItem);
                }
            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error(error);
            });
    }
    return (
        <div>
            <SectionTitle heading='Update Item' subHeading='Add A New Item'></SectionTitle>
            <Helmet>
                <title>Food Land || Add Item</title>
            </Helmet>
            <form onSubmit={handleSubmit} className='bg-[#e8e8e8] p-10 md:w-2/3 mx-auto flex flex-col'>
                <div className='form-control'>
                    <label className='font-bold my-3'>Recipe Name*</label>
                    <input type="text" placeholder='Recipe name' name='recipeName' className='input input-bordered focus:outline-none' required />
                </div>
                <div className="flex justify-between w-full">
                    <div className="form-control w-1/2">
                        <label className='font-bold my-3'>Category*</label>
                        <div className="focus:outline-none input-group">
                            <select name='category' className="select select-bordered w-full">
                                <option value='soup'>Soup</option>
                                <option value='salad'>Salad</option>
                                <option value='pizza'>Pizza</option>
                                <option value='desert'>Desert</option>
                                <option value='drinks'>Drinks</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-control'>
                        <label className='font-bold my-3'>Price*</label>
                        <input type="text" placeholder='Price' name='price' className='input input-bordered focus:outline-none' required />
                    </div>
                </div>
                <div className="form-control">
                    <label className="font-bold my-3">Photo</label>
                    <label className="input-group">
                        {/* <button className="btn" onClick={handleBrowseClick}>Browse File</button> */}
                        <input type="file" placeholder="Photo" name="photo" className="input input-bordered focus:outline-none" />
                    </label>
                </div>
                <div className="form-control">
                    <label className='font-bold my-3'>Recipe Details*</label>
                    <textarea placeholder="Recipe Details" name='recipeDetails' className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                </div>
                <button type='submit' className='btn mt-5 bg-gradient-to-r from-[#835D23] to-[#B58130] font-bold mx-auto text-white border-none'>Update Recipe Details</button>
            </form>
        </div>
    );
};

export default AddItem;