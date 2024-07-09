import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { message } from "antd";
import { CloseOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "./WishlistPage.scss";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchWishlistItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5002/api/wishlist/${userId}`
        );
        setWishlistItems(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistItems();
  }, [userId]);

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await axios.delete(
        `http://localhost:5002/api/wishlist/remove/${wishlistId}`
      );
      setWishlistItems(wishlistItems.filter((item) => item._id !== wishlistId));
      message.success("Item removed from wishlist successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const userId = Cookies.get("userId");
      const productDetails = {
        userId,
        productDetails: {
          ImgUrl: product.ImgUrl,
          category: product.category,
          subcategory: product.subcategory,
          color: 'Black',
          size: 'M',
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
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Error adding item to cart. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wishlist-container">
      <h1>Wishlist</h1>
      <ul className="wishlist">
        {wishlistItems.map((item) => (
          <li key={item._id} className="wishlist-item">
            <CloseOutlined
              className="delete-icon"
              onClick={() => handleRemoveFromWishlist(item._id)}
            />
            {item.CartItem && item.CartItem[0] ? (
              <>
                <img
                  src={item.CartItem[0].ImgUrl}
                  alt={item.CartItem[0].name}
                  className="item-image"
                />
                <div className="item-details">
                  <h2 className="item-name">{item.CartItem[0].name}</h2>
                  <p>Color: {item.CartItem[0].color}</p>
                  <p>Qty: {item.CartItem[0].quantity}</p>
                </div>
                <div className="item-price-container">
                  <p className="item-price">${item.CartItem[0].price}.00</p>
                </div>
                <div className="item-actions">
                  <button
                    className="add-to-cart"
                    onClick={() => handleAddToCart(item.CartItem[0])}
                  >
                    <ShoppingCartOutlined /> Add to Cart
                  </button>
                </div>
              </>
            ) : (
              <div>No item details available</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Wishlist;
