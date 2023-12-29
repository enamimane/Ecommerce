import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, A11y, Autoplay } from 'swiper'; // Importation des modules Swiper nécessaires
import { displayMoney } from '../../helpers/utils'; // Importation de la fonction utilitaire pour formater l'argent

// Importation des styles Swiper
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';
import 'swiper/scss/effect-coverflow';

const FeaturedSlider = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // Appel à votre API Spring Boot pour récupérer les produits en vedette
        fetch('http://localhost:8080/api/produit/Allproduits')
            .then(response => response.json())
            .then(data => setFeaturedProducts(data))
            .catch(error => console.error('Error fetching featured products:', error));
    }, []);

    // Utilisation de la méthode slice pour obtenir les 10 premiers produits
    const first10FeaturedProducts = featuredProducts.slice(0, 10);

    return (
        <Swiper
            modules={[EffectCoverflow, Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={'auto'}
            pagination={{ clickable: true }}
            effect={'coverflow'}
            centeredSlides={true}
            coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 70,
                modifier: 3,
                slideShadows: false,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            breakpoints={{
                768: {
                    slidesPerView: 2,
                    spaceBetween: 200
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 250
                },
            }}
            className="featured_swiper"
        >
            {first10FeaturedProducts.map(item => {
                const { id, nom, imageproduit, prix } = item;
                const newPrice = displayMoney(prix);

                return (
                    <SwiperSlide key={id} className="featured_slides">
                        <div className="featured_title">{nom}</div>
                        <figure className="featured_img">
                            {/* Lien vers la page du produit */}
                            <Link to={`ProductDetails/${id}`}>
                                <img src={imageproduit} alt={nom} />
                            </Link>
                        </figure>
                        <h2 className="products_price">{newPrice}</h2>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default FeaturedSlider;