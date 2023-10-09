import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { BsStarFill } from "react-icons/bs";

const ProductCard = ({ product }) => {
  const {
    _id,
    product_uid,
    product_name,
    category,
    product_heading,
    box_content,
    primary_color,
    primary_img,
    price,
    available_color,
    user_email,
    user_image,
    user_name,
    product_highlight,
    details,
    feature_img1,
    feature_img2,
    wishlist,
  } = product;
  // console.log(product);
  return (
    <div>
      <div className="group relative block overflow-hidden  hover:shadow-lg ">
        <button className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
          <span className="sr-only">Wishlist</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>

        <img
          src={primary_img}
          alt=""
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
        />

        <div className="relative border border-gray-100 bg-white ">
          <h3 className="mt-4  text-gray-700 mx-4 font-semibold">
            {product_name}
          </h3>
          <h3 className="mt-4  text-gray-500 mx-4 ">{category}</h3>

          <p className="mt-2 mx-2 font-semibold text-lg text-orange-500 flex items-center ">
            <span className="text-xl">
              <TbCurrencyTaka></TbCurrencyTaka>
            </span>
            {price}
          </p>
          <section className=" flex items-center gap-1 mt-2 mb-4 mx-4">
            <span className="flex items-center gap-1">
              <BsStarFill className="text-yellow-300 text-xs" />
              <BsStarFill className="text-yellow-300 text-xs" />
              <BsStarFill className="text-yellow-300 text-xs" />
              <BsStarFill className="text-yellow-300 text-xs" />
              <BsStarFill className="text-yellow-300 text-xs" />
            </span>
            <p className="text-xs text-gray-500">(16)</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
