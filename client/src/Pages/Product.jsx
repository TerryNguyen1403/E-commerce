import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

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

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const foundProduct = allProducts.find((productItem) => productItem._id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Redirect to 404 or home if product not found
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

  if (!product) {
    return <div>Product not found</div>; // Fallback in case product is still not found
  }

  return (
    <div>
      <CustomBreadcrumb product={product}/>
      <ProductDetail product={product}/>
      {product.platform && <RelatedProducts props={product}/>}
    </div>
  )
}

export default Product
