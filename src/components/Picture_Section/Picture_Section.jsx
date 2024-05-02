import React from 'react';
import Picture_Section_1 from './Picture_Section_1.jpg';
import Picture_Section_2 from './Picture_Section_2.jpg';
import './Picture_Section.scss';

const Picture_Section = () => {
    return (
        <div className="picture-section">
            <div className="picture-section-content">
                <div className='picture-section-parent'>
                    <div className="picture-section-overlay">
                        <h6>Low Price</h6>
                        <h2>High Coziness</h2>
                        <h3>UPTO 50% OFF</h3>
                        <h6>Explore Items</h6>
                    </div>
                    <img className='picture-section-1' src={Picture_Section_1} alt="" />
                </div>
                <div className='picture-section-copy'>
                    <img className='picture-section-2' src={Picture_Section_2} alt="" />
                    <div className="picture-section-overlays">
                        <h6>Beyoung Presents</h6>
                        <h2>Breezy Summer
                            Style</h2>
                        <h3>UPTO 50% OFF</h3>
                        <h6>Explore Items</h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Picture_Section;
