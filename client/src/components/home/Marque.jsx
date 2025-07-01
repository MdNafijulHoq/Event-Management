import React from 'react';
import Marquee from "react-fast-marquee";
const Marque = () => {
    return (
       <div className='py-10'>
         <div className="border border-gray-300 max-w-6xl mx-auto
        border-b-orange-600 rounded-full px-8 py-4 bg-white">
         <Marquee
           className="text-cyan-600"
           pauseOnHover
           gradient={false}
           speed={70}
         >
           Book Your Spot Now! 🎤 Live Concerts Coming Soon! &nbsp;&nbsp;&nbsp; Don’t Miss Out! 💼 Networking Events Open for Registration! &nbsp;&nbsp;&nbsp; Get Your Pass! 🎭 Cultural Shows Selling Fast! &nbsp;&nbsp;&nbsp; Limited Seats! 🚀 Hackathons for Developers Happening Soon! &nbsp;&nbsp;&nbsp; Sign Up Today! 🌱 Eco Events Near You — Be the Change! &nbsp;&nbsp;&nbsp; Book Early! 🍴 Food Festivals You Can’t Miss! &nbsp;&nbsp;&nbsp;
         </Marquee>
       </div>
       </div>
    );
};

export default Marque;