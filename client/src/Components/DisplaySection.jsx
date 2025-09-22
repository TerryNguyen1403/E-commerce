import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Import components
import Item from './Item/Item';

const DisplaySection = ({ products = [] }) => {
  const visible = Array.isArray(products) ? products.slice(0, 20) : [];

  return (
    <Container className="py-3">
      <Row className="g-4 justify-content-center">
        {visible.map((product, idx) => (
          <Col
            key={product?._id || idx}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="d-flex justify-content-center"
          >
            <Item product={product} />
          </Col>
        ))}
      </Row>

      {visible.length === 0 && (
        <div className="text-center text-muted py-4">Không có sản phẩm nào để hiển thị</div>
      )}
    </Container>
  );
}

export default DisplaySection;