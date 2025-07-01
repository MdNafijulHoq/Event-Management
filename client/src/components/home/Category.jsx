import React, { useEffect } from 'react';
import CategoryStore from '../../zustandStore/useCategoryStore';
import { Link } from 'react-router';

const Category = () => {
  const {category, getCategory} = CategoryStore();

  useEffect(() => {
    (async () => {
      getCategory()
    })()
  },[getCategory])
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-12 place-items-center py-8">
          {
            category && category.length > 0 ? (
              category.map((category) => {
                return (
                  <div key={category._id}
          title={category.categoryName}
          className="container w-72 sm:w-52 bg-white flex flex-col items-center rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 duration-300"
        >
          <Link to={`/category/${category._id}`}>
          <div>
          <img
            className="w-full h-60 sm:h-40 object-cover rounded-t-lg"
            src={category.categoryImage}
            alt={category.categoryName}
          />
          <p className="font-semibold text-lg py-2 text-center">{category.categoryName}</p>
          </div>
          </Link>
        </div>
                )
              })
            ) : (
              <p className="font-semibold text-center">No Category</p>
            )
          } 
      </div>
    );
};

export default Category;