import React from "react";
import TypeWritter from "../../shared/TypeWritter";
import BannerImg from "../../assets/bannerEvent.jpg";
import { Link } from "react-router";

const Banner = () => {
  const words = [
    "🎉 Explore Events in Your City",
    "🎤 Find Live Events & Concerts Nearby",
    "🌟 Discover Unforgettable Experiences Around You",
    "📅 Plan Your Next Adventure with Local Events",
    "🎨 Immerse Yourself in Local Art & Culture",
  ];
  return (
    <section className="py-14">
      <div className="max-w-screen-xl mx-auto md:px-8">
        <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex place-items-center">
          <div className="flex-1">
            <img
              src={BannerImg}
              className="object-fit-contain md:max-w-lg rounded-lg "
              alt="bannerimg"
            />
          </div>
          <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-8 lg:max-w-2xl">
            <h3 className="text-indigo-600 font-semibold">
              Professional services
            </h3>
            <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              <TypeWritter words={words} />
            </p>
            <p className="mt-3 text-gray-600">
              Discover events that match your vibe — from live concerts and art
              shows to business expos and tech meetups. Everything you need, all
              in one place.
            </p>
            <Link
              to="/all-events"
              className="inline-flex gap-x-1 items-center text-indigo-600 hover:text-indigo-500 duration-150 font-medium"
            >
              Browse Events
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
