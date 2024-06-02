import React from 'react';
import Star from '../Start/Start';
// import './Rating.scss';

const Rating = ({ value }) => {
  const stars = [];
  const fullStars = Math.floor(value);
  const halfStar = value % 1 !== 0;
  const emptyStars = 5 - Math.ceil(value);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} type="full" />);
  }

  if (halfStar) {
    stars.push(<Star key="half" type="half" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} type="empty" />);
  }

  return <div className="rating">{stars}</div>;
};

export default Rating;
