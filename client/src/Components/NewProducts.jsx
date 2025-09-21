import ProductSection from "./ProductSection";

const NewProducts = () => {
  return (
    <ProductSection 
      title = 'mới'
      apiEndpoint = 'http://localhost:4000/api/product/new-products'
      navigateTo = '/new-products'
      maxItems = {4}
      dataKey = 'newProducts'
    />
  )
}

export default NewProducts