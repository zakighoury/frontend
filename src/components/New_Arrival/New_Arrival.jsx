import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image1 from './Knitted.jpg';
import Image2 from './Full.jpg';
import Image3 from './Active.jpg';
import Image4 from './Urban.jpg';
import './New_Arrival.scss'; // Import your SCSS file

const New_Arrival = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="new-arrival-container">
            <div className='title'>
                <span className='title-line'></span>
                <h2>New Arrivals</h2>
            </div>
            <div className="slider-container">
                <Slider {...settings}>
                    <div className="image-container">
                        <img src={Image1} alt="Image 1" />
                        <h3>Knitted Joggers</h3>
                    </div>
                    <div className="image-container">
                        <img src={Image2} alt="Image 2" />
                        <h3>Full Sleeve</h3>
                    </div>
                    <div className="image-container">
                        <img src={Image3} alt="Image 3" />
                        <h3>Active T-Shirts</h3>
                    </div>
                    <div className="image-container">
                        <img src={Image4} alt="Image 4" />
                        <h3>Urban Shirts</h3>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} style={{ position: 'absolute', top: '50%', left: '10px', zIndex: 1, cursor: 'pointer' }}>Previous</div>;
};

const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return <div className={className} onClick={onClick} style={{ position: 'absolute', top: '50%', right: '10px', zIndex: 1, cursor: 'pointer' }}>Next</div>;
};

export default New_Arrival;
