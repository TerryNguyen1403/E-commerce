import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { formatPrice } from '../../utils/formatPrice';
import './Item.css';

const cardTitleStyle = {
  display: '-webkit-box',
  WebkitLineClamp: 1, // Giới hạn 1 dòng
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: '1.2em'
};

const Item = ({ product }) => {
  return (
    <Card style={{ width: '19rem' }} className="product-card">
      <Link
        to={`/product/${product._id}`}
        className="text-decoration-none text-dark"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.name}
        />
      <Card.Body>
        <Card.Title style={cardTitleStyle}>{product.name}</Card.Title>
        <div className="d-flex gap-2 mb-3">
          <Card.Text className="fw-bold price-current">
            {formatPrice(product.new_price)} ₫
          </Card.Text>
          <Card.Text className="text-muted text-decoration-line-through">
            {formatPrice(product.old_price)} ₫
          </Card.Text>
        </div>
      </Card.Body>
      </Link>
    </Card>
  );
};

export default Item
