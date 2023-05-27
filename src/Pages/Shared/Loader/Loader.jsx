import React from 'react';

const Loader = () => {
    return (
        <div className="flex justify-center items-center my-5">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-[#D1A054]"></div>
        </div>
    );
};

export default Loader;