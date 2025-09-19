import { useContext } from 'react'
import { useParams } from 'react-router-dom';

// Import context
import { ProductContext } from '../Context/ProductContext'

// Import components
import CustomBreadcrumb from '../Components/Breadcrumb/Breadcrumb'

const Product = () => {
  const { allProducts } = useContext(ProductContext);
  const { productId } = useParams();

  const product = allProducts.find((productItem) => productItem._id === productId);

  return (
    <div>
      <CustomBreadcrumb product={product}/>
    </div>
  )
}

export default Product
