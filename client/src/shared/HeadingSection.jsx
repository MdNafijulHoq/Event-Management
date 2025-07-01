import React from 'react';

const HeadingSection = ({heading,subHeading}) => {
    return (
           <div className='py-10'>
             <div className='container text-center md:w-4/12 mx-auto'>
        <h3 className='text-xl md:text-3xl uppercase'>{heading}</h3>
        <p className='text-yellow-600 border-b-4 py-4'>{subHeading}</p> 
    </div>
           </div>
    );
};

export default HeadingSection;