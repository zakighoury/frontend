import React, { useState, useEffect } from "react";
import { Layout, Select, Slider, Tabs, message } from "antd";
import { FilterOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "./Shop.scss";
import CartItems from "./../AddToCart/AddToCart";

const { Sider, Content } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

const categories = {
  Tops: ["Plain T-Shirt", "Printed T-Shirt"],
  TShirts: ["Plain T-Shirt", "Printed T-Shirt"],
  Kurtis: ["Kurti", "Long Kurti"],
  Trousers: ["Jeans", "Joggers"],
  Boxers: ["Boxers", "Shorts"],
  Payjamas: ["Payjamas", "Night Suits"],
  Loungewear: ["Lounge Pants", "Lounge T-Shirts"],
};

const colors = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Black",
  "White",
  "Pink",
  "Purple",
  "Orange",
  "Brown",
  "Gray",
  "Cyan",
];

const sizes = ["XS", "XM", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];

const dressingStyles = {
  Casual: ["Casual"],
  Formal: ["Formal"],
  Sportswear: ["Sportswear"],
  BusinessCasual: ["Business Casual"],
  PartyWear: ["Party Wear"],
};

const truncateTitle = (title, wordLimit) => {
  const words = title.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return title;
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [priceRange, setPriceRange] = useState([100, 1000]); // Default price range
  const [priceSelectorVisible, setPriceSelectorVisible] = useState(false);
  const [colorSelectorVisible, setColorSelectorVisible] = useState(false);
  const [sizeSelectorVisible, setSizeSelectorVisible] = useState(false);
  const [categorySelectorVisible, setCategorySelectorVisible] = useState(false);
  const [dressingStyleSelectorVisible, setDressingStyleSelectorVisible] =
    useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDressingStyle, setSelectedDressingStyle] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("http://localhost:5002/api/cart");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryChange = (value) => {
    setSelectedSubcategory(value);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const togglePriceSelector = () => {
    setPriceSelectorVisible(!priceSelectorVisible);
  };

  const toggleColorSelector = () => {
    setColorSelectorVisible(!colorSelectorVisible);
  };

  const toggleSizeSelector = () => {
    setSizeSelectorVisible(!sizeSelectorVisible);
  };

  const toggleCategorySelector = () => {
    setCategorySelectorVisible(!categorySelectorVisible);
  };

  const toggleDressingStyleSelector = () => {
    setDressingStyleSelectorVisible(!dressingStyleSelectorVisible);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleDressingStyleChange = (value) => {
    setSelectedDressingStyle(value);
  };

  const handleAddToWishlist = async (itemId) => {
    try {
      const userId = Cookies.get("userId");
      await axios.post("http://localhost:5002/api/wishlist/add", {
        userId,
        itemId,
      });
      setIsInWishlist((prevState) => ({ ...prevState, [itemId]: true }));
      message.success("Item added to wishlist successfully!");
    } catch (error) {
      message.error("Item already in wishlist!");
      console.error("Error adding item to wishlist:", error);
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      const userId = Cookies.get("userId"); // Get userId from your authentication system
      await axios.post("http://localhost:5002/api/wishlist/remove", {
        userId,
        itemId,
      });
      setIsInWishlist((prevState) => ({ ...prevState, [itemId]: false }));
      message.success("Item removed from wishlist successfully!");
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const handleProductClick = (itemId) => {
    navigate(`/api/cart/${itemId}`);
  };

  const filteredCartItems = cartItems.filter((item) => {
    return (
      (!selectedCategory || item.category === selectedCategory) &&
      (!selectedSubcategory || item.subcategory === selectedSubcategory) &&
      (!selectedColor || item.title.includes(selectedColor)) &&
      (!selectedSize || item.size === selectedSize) &&
      (!selectedDressingStyle ||
        item.dressingStyle === selectedDressingStyle) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
    );
  });

  return (
    <Layout>
      <Sider width={300} className="site-layout-background">
        <div className="filter-container">
          <div className="filter-header" style={{ marginBottom: 20 }}>
            Filters
            <FilterOutlined
              style={{ float: "right", fontSize: "18px", cursor: "pointer" }}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              onClick={toggleCategorySelector}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              Category
            </div>
            {categorySelectorVisible && (
              <>
                <Select
                  placeholder="Select Category"
                  onChange={handleCategoryChange}
                  style={{
                    width: "100%",
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                  value={selectedCategory}
                >
                  {Object.keys(categories).map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
                {selectedCategory && (
                  <Select
                    placeholder="Select Subcategory"
                    onChange={handleSubcategoryChange}
                    style={{
                      width: "100%",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                    value={selectedSubcategory}
                  >
                    {categories[selectedCategory].map((subcategory) => (
                      <Option key={subcategory} value={subcategory}>
                        {subcategory}
                      </Option>
                    ))}
                  </Select>
                )}
              </>
            )}
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              onClick={togglePriceSelector}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              Price
            </div>
            {priceSelectorVisible && (
              <div>
                <div style={{ marginBottom: 10 }}>Adjust Price</div>
                <Slider
                  range
                  min={100}
                  max={1000}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  style={{ marginBottom: 20 }}
                />
              </div>
            )}
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              onClick={toggleColorSelector}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              Color
            </div>
            {colorSelectorVisible && (
              <div className="color-selector">
                <div className="color-grid">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`color-swatch ${color.toLowerCase()} ${
                        selectedColor === color ? "selected" : ""
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        width: 40,
                        height: 40,
                        margin: 5,
                        borderRadius: "50%",
                        cursor: "pointer",
                        border:
                          selectedColor === color ? "2px solid black" : "none",
                      }}
                      onClick={() => handleColorChange(color)}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              onClick={toggleSizeSelector}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              Size
            </div>
            {sizeSelectorVisible && (
              <div className="size-selector">
                <div className="size-grid">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-button ${
                        selectedSize === size ? "selected" : ""
                      }`}
                      style={{
                        padding: "10px 15px",
                        margin: 5,
                        cursor: "pointer",
                        border: "1px solid #ccc",
                        backgroundColor:
                          selectedSize === size ? "#000" : "#fff",
                        color: selectedSize === size ? "#fff" : "#000",
                      }}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ marginTop: 20 }}>
            <div
              onClick={toggleDressingStyleSelector}
              style={{
                fontWeight: "bold",
                cursor: "pointer",
                marginBottom: 10,
              }}
            >
              Dressing Style
            </div>
            {dressingStyleSelectorVisible && (
              <div className="dressing-style-selector">
                {Object.keys(dressingStyles).map((style) => (
                  <Select
                    key={style}
                    placeholder={`${style}`}
                    onChange={handleDressingStyleChange}
                    style={{
                      width: "100%",
                      marginBottom: 10,
                      fontWeight: "bold",
                    }}
                    value={
                      selectedDressingStyle === style
                        ? selectedDressingStyle
                        : null
                    }
                  >
                    {dressingStyles[style].map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                ))}
              </div>
            )}
          </div>
        </div>
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: "#fff",
          }}
        >
          <Tabs defaultActiveKey="1" style={{ marginBottom: 20 }}>
            <TabPane tab="New" key="1">
              <div>New Arrivals Content</div>
            </TabPane>
            <TabPane tab="Recommended" key="2">
              <div>Recommended Products Content</div>
            </TabPane>
          </Tabs>
          <div className="cart-section">
            {filteredCartItems.map((item, index) => (
              <div
                key={index}
                className="cart-item"
                onClick={() => handleProductClick(item._id)}
                style={{ cursor: "pointer" }}
              >
                <div className="wishlist-icon">
                  {isInWishlist[item._id] ? (
                    <HeartFilled
                      style={{
                        color: "black",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(item._id);
                      }}
                    />
                  ) : (
                    <HeartOutlined
                      style={{
                        color: "black",
                        backgroundColor: "white",
                        borderRadius: "50%",
                        padding: "10px",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToWishlist(item._id);
                        Cookies.set('itemId', item._id);
                      }}
                    />
                  )}
                </div>
                <div className="cart-item-details">
                  <img
                    className="cart-item-image"
                    src={item.ImgUrl}
                    alt={item.title}
                  />
                  <div className="cart-item-info">
                    <div>
                      <h3>{truncateTitle(item.title, 3)}</h3>
                      <p>{item.brand}</p>
                    </div>
                    <div>
                      <p className="cart-item-price"> ${item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Shop;
