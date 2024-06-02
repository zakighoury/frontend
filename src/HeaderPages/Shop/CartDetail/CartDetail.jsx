import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from 'antd';
import { useParams, useNavigate } from "react-router-dom";
import Rating from './StarRating/Rating/Rating';
import Cookies from 'js-cookie';
import './CartDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/cart/${id}`);
        const productData = response.data;
        console.log('Product data:', productData); // Debug output

        setProduct({
          ...productData,
          size: productData.size ? productData.size.split(" ") : [],
          color: productData.color ? productData.color.split(" ") : []
        });
        setSelectedImage(productData.ImgUrl); // Set the main image
        fetchSimilarProducts(productData.category); // Fetch similar products based on category
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const fetchSimilarProducts = async (category) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/similarproducts/${category}`);
      setSimilarProducts(response.data);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const userId = Cookies.get("userId");
      const productDetails = {
        userId,
        productDetails: {
          ImgUrl: product.ImgUrl,
          category: product.category,
          subcategory: product.subcategory,
          color: selectedColor || product.color[0],
          size: selectedSize || product.size[0],
          dressingStyle: product.dressingStyle,
          title: product.title,
          name: product.name,
          price: product.price,
          description: product.description,
          shipping: product.shipping,
          rating: product.rating,
        },
        quantity: 1,
      };

      const response = await axios.post('http://localhost:5002/cart/add', productDetails);
  
      if (response.status === 200) {
        message.success('Item added to cart successfully!');
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Error adding item to cart. Please try again.");
    }
  };
  
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="product-detail-container">
        <div className="product-images">
          {/* Add code to render and handle mini images if available */}
        </div>
        <div className="product-medium-image">
          <img src={selectedImage} alt="Selected product" />
        </div>
        <div className="product-description">
          <h1>{product.title}</h1>
          <p>{product.name}</p>
          <div className="product-options">
            <div className="product-rating">
              <Rating value={product.rating} /> {product.rating}
            </div>
            <div className="product-size">
              <p>Select Size:</p>
              {product.size.length > 0 ? (
                product.size.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => handleSizeChange(size)}
                    className={selectedSize === size ? 'selected' : ''}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </div>
            <div className="product-color">
              <p>Select Color:</p>
              {product.color.length > 0 ? (
                product.color.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => handleColorChange(color)}
                    className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                  >
                  </div>
                ))
              ) : (
                <p>No colors available</p>
              )}
            </div>
            <div className="product-price">
              <button className="Add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
              <button className="price-button">${product.price}</button>
            </div>
          </div>
          <div className="product-footer">
            <p>Secure Payment</p>
            <p>Size & Fit</p>
            <p>Free Shipping</p>
            <p>Free Shipping and Returns</p>
          </div>
        </div>
      </div>
      <div className="product-description-text">
        <h2>Description</h2>
        <p>{product.description}</p>
      </div>
      <div className="similar-products">
        <h2>Similar Products</h2>
        <div className="similar-products-list">
          {similarProducts.map((item) => (
            <div key={item.id} className="similar-product-item">
              <h3>{item.title}</h3>
              <img src={item.ImgUrl} alt={item.title} />
              <p>Price: ${item.price}</p>
              <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
