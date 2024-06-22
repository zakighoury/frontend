import React from 'react';
import Content from "./Content-1.jpg";
import Contents from "./Content-2.jpg";
import { DownloadOutlined } from "@ant-design/icons";
import './Big_Saving_picture.scss';

const Big_Saving_picture = () => {
  return (
    <div>
      <div className="Big_Saving_zone-content">
        <div className="Big_Saving_zone-items">
          <div>
            <img className="Big_Saving_zone-images" src={Content} alt="" />
          </div>
          <div className="overlays">
            <h3>Urban Shirts</h3>
            <p>Live In Comfort</p>
            <p>Upto 60% off</p>
            <DownloadOutlined />
            <button>Shop Now</button>
          </div>
        </div>
        <div className="Big_Saving_zone-items">
          <div className="Big_Saving_zone-images">
            <img className="Big_Saving_zone-images" src={Contents} alt="" />
          </div>
          <div className="overlays">
            <h3>Oversized T-Shirts</h3>
            <p>Street Style Icon</p>
            <p>Upto 60% off</p>
            <DownloadOutlined />
            <button>Shop Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Big_Saving_picture;
