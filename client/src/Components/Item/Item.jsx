import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import './Item.css';

const Item = ({ _id, image, name, new_price, old_price }) => {
  return (
    <div className="card border-0 shadow-sm h-100">
      <Link to={`/product/${_id}`} className="text-decoration-none">
        <img
          src={image}
          alt={name}
          className="card-img-top img-fluid"
          style={{ objectFit: "contain", height: "200px" }}
          onClick={() => window.scrollTo(0, 0)}
        />
      </Link>

      <div className="card-body text-center">
        <p className="card-text fw-medium">{name}</p>
        <div className="d-flex justify-content-center gap-2">
          <span className="fw-bold text-dark">
            {formatPrice(new_price)} ₫
          </span>
          <span className="text-muted text-decoration-line-through">
            {formatPrice(old_price)} ₫
          </span>
        </div>
      </div>
    </div>
  );
};

export default Item
