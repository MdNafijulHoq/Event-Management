import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import RootLayout from '../layout/RootLayout';
import CategoryStore from '../../zustandStore/useCategoryStore';
import EventCart from '../../shared/EventCart';

const CategoryDetails = () => {
    const {id} = useParams();
    const {category, getByCategory} = CategoryStore();

    useEffect(() => {
        (
            async () => {
                getByCategory(id)
            }
        )()
    },[id,getByCategory])
    
    return (
        <RootLayout>
            <div>
            <h3 className='font-semibold text-2xl mt-10'>Event By Category: </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12 place-items-center py-8'>
                {
                    category && category.length > 0 ? (
                        category.map((item) => (
                            <div key={item._id} className="w-full max-w-xs">
                                <EventCart event={item}/>
                            </div>
                        ))
                    ) : (
                        <p className='text-3xl text-red-600 font-semibold'>No Category Found</p>
                    )
                }
                </div>
        </div>
        </RootLayout>
    );
};

export default CategoryDetails;