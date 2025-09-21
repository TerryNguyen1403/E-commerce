import ProductSection from "./ProductSection";

const RelatedProducts = ({ product }) => {
  return (
    <ProductSection 
      title = 'cùng nền tảng'
      apiEndpoint = {`http://localhost:4000/api/product/related-products/${product.platform}`}
      navigateTo = '/related-products'
      maxItems = {4}
      dataKey = 'productByPlatform'
    />
  )
}

export default RelatedProducts