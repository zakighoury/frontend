import React from "react";
import "./HeroSection.scss";
import { Button, Carousel, Typography } from "antd";
const { Title } = Typography;

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="carousel">
        <Carousel autoplay>
          <div>
            <div className="hero-section-carousel">
              <div className="carousel-content">
                <Typography>
                  <Title level={4}>T-shirt / Tops</Title>
                  <Title level={1}>
                    Summer <br /> Value Pack
                  </Title>
                  <Title level={4}>cool / colorful / comfy</Title>
                  <span className="disc-fcc-1">
                    <button className="dis-fcc">Shop Now</button>
                  </span>
                </Typography>
              </div>
            </div>
          </div>
          <div>
            <div className="hero-section-carousel">
              <div className="carousel-content">
                <Typography>
                  <Title level={4}>T-shirt / Tops</Title>
                  <Title level={1}>
                    Summer <br /> Value Pack
                  </Title>
                  <Title level={4}>cool / colorful / comfy</Title>
                  <span>
                    <button  className="dis-fcc">Shop Now</button>
                  </span>
                </Typography>
              </div>
            </div>
          </div>
        </Carousel>{" "}
      </div>
    </div>
  );
};

export default HeroSection;
