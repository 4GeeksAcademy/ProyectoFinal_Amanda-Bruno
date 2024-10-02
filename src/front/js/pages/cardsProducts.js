import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css'; // Importação principal de CSS do Swiper
import 'swiper/css/navigation'; // Estilos de navegação
import 'swiper/css/pagination'; // Estilos de paginação
import 'swiper/css/effect-coverflow'; // Estilos do efeito Coverflow
import '../../styles/home.css';

function CardsProducts () {
    return (
        <div className="container">
      <h1 className="heading">Orígenes de nuestros cafés</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3} /* Mostra três slides de uma vez */
        spaceBetween={30} /* Espaçamento entre os slides */
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://img.freepik.com/fotos-gratis/colheita-de-cafe-adulto_23-2151711700.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727222400&semt=ais_hybrid" alt="slide_image" />
        </SwiperSlide>
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
    );
};

export default CardsProducts;
