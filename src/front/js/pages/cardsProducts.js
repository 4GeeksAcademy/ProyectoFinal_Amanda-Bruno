import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import '../../styles/cardsProducts.css';

function CardsProducts() {
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
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711625.jpg?t=st=1728513694~exp=1728517294~hmac=cbc53b740e56e58c5baf4fad949a588fa8e43118bd09aea70f3f04ef758ceeb3&w=740" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Brasil</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-nature-coffee-harvesting_23-2151711563.jpg?t=st=1728513347~exp=1728516947~hmac=f0ae7e543632108280ccbe46d4055168390bc6807d314e2aa3b2ef7f0900a3f0&w=740" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Colombia</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Costa Rica</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/premium-photo/view-nature-landscape-with-forest_825767-7382.jpg?w=740" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Etiopía</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711649.jpg?t=st=1728513578~exp=1728517178~hmac=c60290a2c520c771b1068cc37fc9dbd023df8bc4a4131c05130c963f2f92d141&w=740" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Guatemala</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/premium-photo/coffee-area-landscape-colombia_1033579-194880.jpg?w=740" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Jamaica</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711645.jpg?t=st=1728514146~exp=1728517746~hmac=40e5f2e7bd417c9c508da3d9dfb332d5df9ffd069d2cb8179e13fc9c2e75981d&w=740" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Kenia</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/premium-photo/view-tea-plantation-mountains_662214-441498.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">India</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711628.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Honduras</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711674.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">México</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711664.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Nicaragua</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711592.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Perú</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711658.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Panamá</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
      
        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711652.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Indonesia</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>
    
        <SwiperSlide>
          <div className="slide-content">
            <img src="https://img.freepik.com/free-photo/adult-harvesting-coffee_23-2151711583.jpg?ga=GA1.1.1279640314.1728513321&semt=ais_hybrid" alt="slide_image" />
            <div className="overlay">
              <a href="#" className="overlay-link">Vietnam</a>
            </div>
          </div>
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div>

      </Swiper>
    </div>
  );
}

export default CardsProducts;
