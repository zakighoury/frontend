import React, { useState, useEffect } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { InputNumber, message } from "antd";
import "./AddToCart.scss";

function CartItems() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const userId = Cookies.get("userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/cart/items/${userId}`
        );
        if (response.data && response.data.items) {
          setCartItems(response.data.items);
          console.log(response.data.items);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        setCartItems([]);
      }
    };

    if (userId) {
      fetchCartItems();
    }
  }, [userId]);

  const applyCoupon = () => {
    if (coupon === "SALE5") {
      const discountPercent = 20;
      setDiscount(discountPercent);
    } else {
      alert("Invalid coupon code.");
    }
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedItems = cartItems.map((item) =>
      item._id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const deleteItem = async (itemId) => {
    try {
      await axios.delete(
        `http://localhost:5002/cart/items/${userId}/${itemId}`
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
      message.success("Item deleted successfully!");
    } catch (error) {
      alert("Error deleting item. Please try again.");
    }
  };

  const calculateShippingCost = () => {
    return cartItems.reduce((total, item) => {
      const shippingCost = item.productDetails.shipping;
      return total + (typeof shippingCost === "number" ? shippingCost : 0);
    }, 0);
  };

  useEffect(() => {
    const subtotalValue = cartItems.reduce((total, item) => {
      const itemPrice = item.productDetails.price;
      const itemQuantity = item.quantity;
      const itemShipping = item.productDetails.shipping;

      if (
        typeof itemPrice === "number" &&
        typeof itemQuantity === "number" &&
        typeof itemShipping === "number"
      ) {
        return total + itemPrice * itemQuantity + itemShipping;
      } else {
        return total;
      }
    }, 0);

    const shippingValue = calculateShippingCost();
    const discountAmount = (subtotalValue * discount) / 100;
    const grandTotalValue = subtotalValue - discountAmount;

    setSubtotal(subtotalValue);
    setShippingCost(shippingValue);
    setGrandTotal(grandTotalValue);
  }, [cartItems, discount]);

  const formatPrice = (price) => {
    if (typeof price === "number") {
      if (price === 0) {
        return "Free";
      } else {
        return `$${price.toFixed(2)}`;
      }
    } else if (typeof price === "string" && price.toLowerCase() === "free") {
      return "Free";
    } else {
      return price;
    }
  };

  const formatShippingCost = (shipping) => {
    if (typeof shipping === "number") {
      if (shipping === 0) {
        return "Free";
      } else {
        return `$${shipping.toFixed(2)}`;
      }
    } else {
      return shipping;
    }
  };

  const proceedToCheckout = async () => {
    const stripe = await loadStripe(
      "pk_test_51PTPUzIMVmLanO3fmzEb2wlZ8iY8jy6LNGiXlZ9JKKHbTveBVwUwL81ntDBmbbbSG9eMEjg9w7HHouXy5e3loqmB00UChmp7R7"
    );

    try {
      // Extract only the required data from cartItems
      const itemsToSend = cartItems.map((item) => ({
        name: item.productDetails.name,
        color: item.productDetails.color,
        userId:userId,
        ImgUrl: item.productDetails.ImgUrl,
        description: item.productDetails.description,
        price: item.productDetails.price,
        quantity: item.quantity,
      }));

      const response = await axios.post(
        "http://localhost:5002/create-checkout-session",
        {
          userId,
          cartItems: itemsToSend, // Send the modified data
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const session = response.data;
      console.log(session);

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
      alert(
        "An error occurred while creating the checkout session. Please try again."
      );
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-header">Cart Items</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product Details</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Shipping</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <tr key={item._id}>
                <td className="product-details">
                  <div className="product-image">
                    <img
                      className="product-img-detail"
                      src={item.productDetails.ImgUrl}
                      alt={item.productDetails.title}
                    />
                    <div className="product-info">
                      <h3>{item.productDetails.name}</h3>
                      <p>Color: {item.productDetails.color}</p>
                      <p>Size: {item.productDetails.size}</p>
                    </div>
                  </div>
                </td>
                <td>{formatPrice(item.productDetails.price)}</td>
                <td>
                  <div className="quantity-control">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                    >
                      <MinusCircleOutlined />
                    </button>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item._id, value)}
                    />
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <PlusCircleOutlined />
                    </button>
                  </div>
                </td>
                <td>{formatShippingCost(item.productDetails.shipping)}</td>
                <td>
                  {formatPrice(
                    item.productDetails.price * item.quantity +
                      item.productDetails.shipping
                  )}
                </td>
                <td>
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="delete-btn"
                  >
                    <DeleteOutlined />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No items in cart</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="cart-total">
        <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
        <h4>Shipping: ${shippingCost.toFixed(2)}</h4>
        <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
      </div>

      {/* <div className="coupon-section">
        <input
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={applyCoupon}>Apply Coupon</button>
      </div> */}

      <div className="checkout-button">
        <button onClick={proceedToCheckout}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default CartItems;
