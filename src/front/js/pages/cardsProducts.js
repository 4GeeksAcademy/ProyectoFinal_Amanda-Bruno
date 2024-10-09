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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
            <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
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
