import React, { useEffect } from 'react';
import RootLayout from '../components/layout/RootLayout';
import Banner from '../components/home/Banner';
import Category from '../components/home/Category';
import HeadingSection from '../shared/HeadingSection';
import EventCart from '../shared/EventCart';
import EventStore from '../zustandStore/useEventStore';
import Marque from '../components/home/Marque';

const HomePage = () => {

    const {Event, getEvent}= EventStore();

    useEffect(() => {
       ( async () => {
            getEvent() 
        })()
    },[getEvent])

    return (
        <RootLayout>
            <div>
                <Banner/>
                <Marque/>
                <HeadingSection heading="🎉 Explore Events by Category" subHeading="Find what excites you — from concerts to coding bootcamps, all in one place."/>
                <Category/>
                <HeadingSection heading="🎉 Explore Upcoming Events" subHeading="Find what excites you — from concerts to coding bootcamps, all in one place."/>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12 place-items-center py-8'>
                {
                    Event && Event.length > 0 ? (
                        Event.map((item) => (
                            <div key={item._id} className="w-full max-w-xs">
                                <EventCart event={item}/>
                            </div>
                        ))
                    ) : (
                        <p>No Event</p>
                    )
                }
                </div>
            </div>
        </RootLayout>
    );
};

export default HomePage;