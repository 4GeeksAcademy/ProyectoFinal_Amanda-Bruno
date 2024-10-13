import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { useNavigate } from 'react-router-dom';
import '../../styles/slideHome.css';

function SlideHome() {
  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate(`/producto/${productId}`);
  };

  const slides = [
    { id: 3, country: "Brasil", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711628.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" },
    { id: 1, country: "Colombia", image: "https://img.freepik.com/free-photo/adult-nature-coffee-harvesting_23-2151711563.jpg?t=st=1728513347~exp=1728516947~hmac=f0ae7e543632108280ccbe46d4055168390bc6807d314e2aa3b2ef7f0900a3f0&w=740" },
    { id: 5, country: "Costa Rica", image: "https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" },
    { id: 2, country: "Etiopía", image: "https://img.freepik.com/premium-photo/view-nature-landscape-with-forest_825767-7382.jpg?w=740" },
    { id: 6, country: "Guatemala", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711649.jpg?t=st=1728513578~exp=1728517178~hmac=c60290a2c520c771b1068cc37fc9dbd023df8bc4a4131c05130c963f2f92d141&w=740" },
    { id: 8, country: "Jamaica", image: "https://img.freepik.com/premium-photo/coffee-area-landscape-colombia_1033579-194880.jpg?w=740" },
    { id: 4, country: "Kenia", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711645.jpg?t=st=1728514146~exp=1728517746~hmac=40e5f2e7bd417c9c508da3d9dfb332d5df9ffd069d2cb8179e13fc9c2e75981d&w=740" },
    { id: 10, country: "India", image: "https://img.freepik.com/premium-photo/view-tea-plantation-mountains_662214-441498.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" },
    { id: 11, country: "Honduras", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711625.jpg?t=st=1728513694~exp=1728517294~hmac=cbc53b740e56e58c5baf4fad949a588fa8e43118bd09aea70f3f04ef758ceeb3&w=740" },
    { id: 9, country: "México", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711674.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" },
    { id: 12, country: "Nicaragua", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711664.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" },
    { id: 7, country: "Perú", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711592.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" },
    { id: 13, country: "Panamá", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711658.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" },
    { id: 15, country: "Indonesia", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711652.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" },
    { id: 14, country: "Vietnam", image: "https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711583.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" }
  ];

  return (
    <div className="container">
      <h1 className="heading">Orígenes de nuestros cafés</h1>
      <Swiper
  effect={'coverflow'}
  grabCursor={true}
  centeredSlides={true}
  loop={true}
  slidesPerView={3}
  spaceBetween={30}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2.5,
    slideShadows: false,
  }}
  navigation={{
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }}
  breakpoints={{
    768: {
      slidesPerView: 3,
    },
    0: {
      slidesPerView: 1,
    },
  }}
  modules={[EffectCoverflow, Pagination, Navigation]}
  className="swiper_container"
>
  {slides.map((slide) => (
    <SwiperSlide key={slide.id}>
      <div className="slide-content">
        <img src={slide.image} alt={`${slide.country} coffee`} />
        <div className="overlay">
          <a
            onClick={() => handleNavigate(slide.id)}
            className="overlay-link"
          >
            {slide.country}
          </a>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
<div className="slider-controler">
  <div className="swiper-button-prev">
    <ion-icon name="arrow-back-outline"></ion-icon>
  </div>
  <div className="swiper-button-next">
    <ion-icon name="arrow-forward-outline"></ion-icon>
  </div>
</div>
</div>
  );
}

export default SlideHome;
