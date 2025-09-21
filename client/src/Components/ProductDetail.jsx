import { Container, Row, Col, Image, Button, Card } from "react-bootstrap";
import { formatPrice } from "../utils/formatPrice";
// import { useNavigate } from "react-router-dom";

const ProductDetail = ({ product }) => {
//   const navigate = useNavigate();
  if (!product) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className="my-5">
      <Row className="align-items-start">
        {/* Hình ảnh sản phẩm */}
        <Col md={6} className="text-center mb-4 mb-md-0">
          <Image
            src={product.thumb}
            alt={product.name}
            fluid
            className="rounded shadow-sm"
          />
        </Col>

        {/* Thông tin sản phẩm */}
        <Col md={6}>
          <h2 className="mb-3">{product.name}</h2>

          {/* Giá */}
          <div className="mb-3">
            <span className="text-muted text-decoration-line-through me-3">
              {formatPrice(product.old_price)} ₫
            </span>
            <span className="fw-bold fs-4 text-danger">
              {formatPrice(product.new_price)} ₫
            </span>
          </div>

          {/* Mô tả trong box */}
          <Card className="bg-light border-0 shadow-sm mb-4">
            <Card.Body>
              <p className="mb-0">{product.description}</p>
            </Card.Body>
          </Card>

          {/* Nút thêm vào giỏ hàng */}
          <Button
            variant="primary"
            size="lg"
            className="mb-3"
            // onClick={() => addToCart(product.id, navigate)}
          >
            Thêm vào giỏ hàng
          </Button>

          {/* Nền tảng */}
          <p className="text-muted">
            <strong>Nền tảng:</strong> {product.platform}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
