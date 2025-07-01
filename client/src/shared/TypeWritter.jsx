import React from 'react';
import { Typewriter } from 'react-simple-typewriter'

const TypeWritter = ({words}) => {
    return (
       <span className='text-amber-600'>
         <Typewriter 
        words={words}
        typeSpeed={80}
        deleteSpeed={60}
        delaySpeed={1600}
        loop={6}
        cursor
        cursorStyle='_'
        cursorBlinking />
       </span>
    );
};

export default TypeWritter;