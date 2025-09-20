import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Item from './Item/Item'

// Import utils
import axios from 'axios'

const RelatedProducts = ({ platform }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:4000/api/product/related-products/${platform}`);
            setRelatedProducts(res.data.productByPlatform);
        } catch (error) {
            console.error('Lỗi khi fetch: ', error);
        }
    }
    
    fetchNewProducts();
  }, [platform]);

  const handleNavigate = () => {
    navigate('/related-products');
  }

  return (
    <Container className="py-5">
      {/* Header */}
      <div className="position-relative mb-4">
        {/* Đường kẻ ngang full width màu cam */}
        <div 
          className="position-absolute w-100 top-50 translate-middle-y"
          style={{
            height: '3px',
            backgroundColor: '#ff6b35',
            left: '0',
            right: '0'
          }}
        ></div>
        
        {/* Header content */}
        <div className="d-flex justify-content-between align-items-center position-relative">
          <h1 
            // ref={newCollectionsRef}
            className="fw-bold text-uppercase mb-0 bg-white pe-3"
            style={{
              fontSize: 'clamp(1.2rem, 3vw, 2rem)',
              color: '#171717',
              letterSpacing: '1px',
              paddingRight: '15px',
              paddingLeft: '0'
            }}
          >
            <span style={{color: '#ff6b35'}}>GAME</span> CÙNG NỀN TẢNG
          </h1>
          
          <span 
            onClick={handleNavigate}
            className="text-decoration-none"
            style={{
              fontSize: '0.9rem',
              fontWeight: '500',
              color: '#080808ff',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              paddingLeft: '15px',
              backgroundColor: 'white'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#ff6b35';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#080808ff';
            }}
          >
            Xem tất cả →
          </span>
        </div>
      </div>

      {/* Grid sản phẩm */}
      <Row className="g-4 justify-content-center">
        {relatedProducts.slice(-4).map((product, index) => (
          <Col 
            key={index}
            xs={6}           // 2 cột trên mobile
            sm={6}           // 2 cột trên small
            md={4}           // 3 cột trên medium  
            lg={3}           // 4 cột trên large
            xl={3}           // 4 cột trên extra large
            className="d-flex justify-content-center"
          >
            <div className="item-hover">
              <Item
                product = {product}
              />
            </div>
          </Col>
        ))}
      </Row>

      {/* Inline styles cho hover effects */}
      <style>{`
        @media (max-width: 768px) {
          .hover-text {
            font-size: 0.8rem !important;
          }
        }
      `}</style>
    </Container>
  )
}

export default RelatedProducts;