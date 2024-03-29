import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import "./Banner.css"

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { EffectFade, Autoplay, Pagination, Navigation } from "swiper/modules";
import { Carousel } from "flowbite-react";
import { useEffect } from "react";
import Loader from "../../../Shared/Loader/Loader";
import img1 from "../../../assets/product-img/nim.jpg";
import img2 from "../../../assets/product-img/sojnepata.jpg";
import img3 from "../../../assets/product-img/multanimati.jpg";
import img4 from "../../../assets/product-img/hortoki.jpg";

const Banner = () => {
  const [bannerImg, setBannerImg] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("https://shadin-organic-server.vercel.app/allBannerImg")
      .then((res) => res.json())
      .then((data) => {
        const activeBannerImg = data.filter((item) => item.status === "Active");
        setBannerImg(activeBannerImg);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, []);
  return (
    // <div className="">
    //   <Swiper
    //     spaceBetween={30}
    //     effect={"fade"}
    //     centeredSlides={true}
    //     autoplay={{
    //       delay: 2500,
    //       disableOnInteraction: false,
    //     }}
    //     loop={true}
    //     pagination={{
    //       clickable: true,
    //     }}
    //     navigation={true}
    //     modules={[EffectFade, Autoplay, Pagination, Navigation]}
    //     className="mySwiper"
    //   >
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1695717/pexels-photo-1695717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1961772/pexels-photo-1961772.jpeg?auto=compress&cs=tinysrgb&w=1600"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //     <SwiperSlide>
    //       <img
    //         src="https://images.pexels.com/photos/1998927/pexels-photo-1998927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //         alt=""
    //       />
    //     </SwiperSlide>
    //   </Swiper>
    // </div>

    <div className="max-w-[1440px] mx-auto">
      <div className="lg:h-[384px] md:h-[288px] sm:h-[240px] xl:h-[480px] 2xl:h-[560px] h-[200px]  w-full ">
        {isLoading ? (
          <Loader />
        ) : bannerImg.length > 1 ? (
          <Carousel>
            {bannerImg.map((item) => (
              <img
                src={item?.bannerImg}
                alt="..."
                className="w-full h-full"
                key={item._id}
              />
            ))}
          </Carousel>
        ) : (
          <Carousel className="">
            <img src={img1} alt="..." className="w-full h-full" />
            <img src={img2} alt="..." className="w-full h-full" />
            <img src={img3} alt="..." className="w-full h-full" />
            <img src={img4} alt="..." className="w-full h-full" />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Banner;
