import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'react-bootstrap';

// Import context
import { ProductContext } from '../Context/ProductContext';

// Import components
import CustomBreadcrumb from '../Components/Breadcrumb/Breadcrumb';
import ProductDetail from '../Components/ProductDetail';
import RelatedProducts from '../Components/RelatedProducts';

const Product = () => {
  const { allProducts } = useContext(ProductContext);
  const { productId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // Fetch product hiện tại từ context
  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const foundProduct = allProducts.find((productItem) => productItem._id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Redirect to 404 hoặc home nếu không tìm thấy sản phẩm
        navigate('/');
      }
      setLoading(false);
    }
  }, [allProducts, productId, navigate]);

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Đang tải...</span>
      </Spinner>
    )
  }

  return (
    <div>
      <CustomBreadcrumb product={product}/>
      <ProductDetail product={product}/>
      {product.platform && (
        <RelatedProducts 
          product={product}
        />
      )}
    </div>
  )
}

export default Product
