import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IoMdStar, IoMdCheckmark } from 'react-icons/io';
import { displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
import useActive from '../hooks/useActive';
import cartContext from '../contexts/cart/cartContext';

const ProductDetails = () => {
    useDocTitle('Product Details');
    const { handleActive, activeClass } = useActive(0);
    const { addItem } = useContext(cartContext);
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([]);
    const [previewImg, setPreviewImg] = useState('');

    useEffect(() => {
        // Appel à votre API Spring Boot pour récupérer les détails du produit
        fetch(`http://localhost:8080/api/produit/${id}`)
            .then(response => response.json())
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product details:', error));

        // Appel à votre API Spring Boot pour récupérer les images du produit
        fetch(`http://localhost:8080/api/image/categorie/${id}`)
            .then(response => response.json())
            .then(data => {
                // Filtrer les images pour n'inclure que celles du produit actuel
                const filteredImages = Array.isArray(data)
                    ? data.filter(image => image.produit && image.produit.id === parseInt(id))
                    : [];

                setImages(filteredImages);
            })
            .catch(error => console.error('Error fetching product images:', error));
    }, [id]);

    useEffect(() => {
        if (images.length > 0) {
            setPreviewImg(images[0].image);
            handleActive(0);
        }
    }, [images]);

    const handleAddItem = () => {
        addItem(product);
    };

    return (
        <>
            <section id="product_details" className="section">
                <div className="container">
                    {product && (
                        <div className="wrapper prod_details_wrapper">
                            <div className="prod_details_left_col">
                                <div className="prod_details_tabs">
                                    {images.map((img, i) => (
                                        <div
                                            key={i}
                                            className={`tabs_item ${activeClass(i)}`}
                                            onClick={() => setPreviewImg(img.image)}
                                        >
                                            <img src={img.image} alt={`product-img-${i}`} />
                                        </div>
                                    ))}
                                </div>
                                <figure className="prod_details_img">
                                    <img src={previewImg} alt="product-img" />
                                </figure>
                            </div>
                            <div className="prod_details_right_col">
                                <h1 className="prod_details_title">{product.nom}</h1>
                                <h4 className="prod_details_info">{product.description}</h4>
                                <div className="prod_details_ratings">
                                    <span className="rating_star">
                                        {[...Array(product.rateCount)].map((_, i) => <IoMdStar key={i} />)}
                                    </span>
                                    <span>|</span>
                                    <Link to="*">{product.ratings} Ratings</Link>
                                </div>
                                <div className="separator"></div>
                                <div className="prod_details_price">
                                    <div className="price_box">
                                        <h2 className="price">{displayMoney(product.prix)}</h2>
                                    </div>
                                    <div className="badge">
                                        <span><IoMdCheckmark /> en Stock</span>
                                    </div>
                                </div>
                                <div className="separator"></div>
                                <div className="prod_details_buy_btn">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={handleAddItem}
                                    >
                                        ajouter au panier
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProductDetails;
