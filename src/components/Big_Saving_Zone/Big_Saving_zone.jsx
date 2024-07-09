import React from "react";
import Cargo from "./Cargo_Jogger.jpg";
import Hawalian from "./Hawalian_Shirt.jpg";
import Printed from "./Printed_Shirt.jpg";
import Big_Saving_picture from "./Big_Saving_picture";
import { DownloadOutlined } from "@ant-design/icons";
import "./Big_Saving_zone.scss";

const Big_Saving_zone = () => {
  return (
    <div className="Big_Saving_zone">
      <div className="Big_Saving_zone-heading">
        <span className="title-line"></span>{" "}
        <h2 className="Big_Saving_zone-title"> Big Saving Zone</h2>
      </div>
      <div className="Big_Saving_zone-content-box">
        <div className="Big_Saving_zone-content">
          <div className="Big_Saving_zone-item">
            <img
              src={Hawalian}
              alt="Hawaiian Shirt"
              className="Big_Saving_zone-image"
            />
            <div className="overlay">
              <h3>Hawaiian Shirt</h3>
              <p>Dress up in summer vibe</p>
              <p>Upto 50% off</p>
              <DownloadOutlined  />
              <button>Shop Now</button>
            </div>
          </div>
          <div className="Big_Saving_zone-item">
            <img
              src={Printed}
              alt="Printed Shirt"
              className="Big_Saving_zone-image"
            />
            <div className="overlay">
              <h3>Printed T-Shirt</h3>
              <p>New Designs Every Week</p>
              <p>Upto 40% off</p>
              <DownloadOutlined />
              <button>Shop Now</button>
            </div>
          </div>
          <div className="Big_Saving_zone-item">
            <img
              src={Cargo}
              alt="Cargo Jogger"
              className="Big_Saving_zone-image"
            />
            <div className="overlay">
              <h3>Cargo Joggers</h3>
              <p>Move with style & comfort</p>
              <p>Upto 40% off</p>
              <DownloadOutlined />
              <button>Shop Now</button>
            </div>
          </div>
        </div>
        <Big_Saving_picture />
      </div>
    </div>
  );
};

export default Big_Saving_zone;
