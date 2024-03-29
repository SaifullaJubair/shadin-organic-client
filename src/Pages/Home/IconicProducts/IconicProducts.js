import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const IconicProducts = () => {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] = useState([]);
  const [nextTwoProducts, setNextTwoProducts] = useState([]);
  useEffect(() => {
    fetch("https://shadin-organic-server.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const availableProducts = data?.filter(
          (product) => product?.product_status === "Available"
        );
        setProducts(availableProducts);
        setSingleProduct(availableProducts[0]);
        setNextTwoProducts(availableProducts?.slice(1, 3));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // console.log(nextTwoProducts);
  return (
    <div className="max-w-[1440px] mx-auto">
      <section>
        <div className="lg:w-full md:w-4/6 sm:w-96 w-full px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-4">
          {singleProduct && (
            <header className="text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
                New Collection
              </h2>

              <p className="max-w-md mx-auto mt-4 text-gray-500">
                Our new products
              </p>
            </header>
          )}

          {nextTwoProducts.length > 1 ? (
            <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
              {nextTwoProducts.map((item) => (
                <Link to={`/singleproduct/${item?._id}`} key={item._id}>
                  <li>
                    <div className="relative block group">
                      <img
                        src={item.primary_img}
                        alt={item.product_name}
                        className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-60"
                      />

                      <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                        <h3 className="text-xl font-medium text-white">
                          {item.product_name}
                        </h3>

                        <span className="mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                          Shop Now
                        </span>
                      </div>
                    </div>
                  </li>
                </Link>
              ))}

              <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
                <Link to={`/singleproduct/${singleProduct?._id}`}>
                  <div className="relative block group">
                    <img
                      src={singleProduct.primary_img}
                      alt=""
                      className="object-cover w-full transition duration-500  aspect-square group-hover:opacity-60"
                    />

                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">
                        {singleProduct.product_name}
                      </h3>

                      <span className="mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          ) : (
            <div className="my-6">
              {singleProduct && (
                <Link to={`/singleproduct/${singleProduct?._id}`}>
                  <div className="relative block group  max-w-2xl mx-auto">
                    <img
                      src={singleProduct.primary_img}
                      alt=""
                      className="object-cover w-full transition duration-500  aspect-square group-hover:opacity-60"
                    />

                    <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                      <h3 className="text-xl font-medium text-white">
                        {singleProduct.product_name}
                      </h3>

                      <span className="mt-1.5 inline-block bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                        Shop Now
                      </span>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default IconicProducts;
