import React, { useState } from "react";
import axios from "axios";
import "./Cart.scss";

const AddToCartForm = () => {
  const [item, setItem] = useState({
    ImgUrl: "",
    title: "",
    name: "",
    price: 0,
    quantity: 0,
    description: "",
    category: "",
    subcategory: "",
    color: "",
    size: "",
    dressingStyle: "",
    rating: 0, // Add rating to the state
    brand: "", // Add brand to the state
    shipping: 0 // Add shipping to the state
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("ImgUrl", imageFile);
      formData.append("title", item.title);
      formData.append("name", item.name);
      formData.append("price", item.price);
      formData.append("quantity", item.quantity);
      formData.append("description", item.description);
      formData.append("category", item.category);
      formData.append("subcategory", item.subcategory);
      formData.append("color", item.color);
      formData.append("size", item.size);
      formData.append("dressingStyle", item.dressingStyle);
      formData.append("rating", item.rating); // Include rating in form submission
      formData.append("brand", item.brand); // Include brand in form submission
      formData.append("shipping", item.shipping); // Include shipping in form submission

      await axios.post("http://localhost:5002/api/cart", formData);
      alert("Item added to cart successfully!");
      setItem({
        ImgUrl: "",
        title: "",
        name: "",
        price: 0,
        quantity: 0,
        description: "",
        category: "",
        subcategory: "",
        color: "",
        size: "",
        dressingStyle: "",
        rating: 0, // Reset rating
        brand: "", // Reset brand
        shipping: 0, // Reset shipping
      });
      setImageFile(null);
      setImagePreview("");
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Error adding item to cart. Please try again.");
    }
  };

  return (
    <div className="addToCartFormContainer">
      <h2>Add Item to Cart</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="ImgUrl"
          onChange={handleImageChange}
          className="cartInput"
        />
        {imagePreview && (
          <div className="imagePreviewContainer">
            <img src={imagePreview} alt="Preview" className="imagePreview" />
          </div>
        )}
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={item.title}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={item.name}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={item.price}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={item.quantity}
          onChange={handleChange}
          className="cartInput"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={item.description}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={item.category}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="text"
          name="subcategory"
          placeholder="Subcategory"
          value={item.subcategory}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="text"
          name="color"
          placeholder="Color"
          value={item.color}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={item.size}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="text"
          name="dressingStyle"
          placeholder="Dressing Style"
          value={item.dressingStyle}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={item.rating}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={item.brand}
          onChange={handleChange}
          className="cartInput"
        />
        <input
          type="number"
          name="shipping"
          placeholder="Shipping"
          value={item.shipping}
          onChange={handleChange}
          className="cartInput"
        />
        <button type="submit" className="cartButton">
          Add to Cart
        </button>
      </form>
    </div>
  );
};

export default AddToCartForm;
