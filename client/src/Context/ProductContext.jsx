import { createContext, useEffect, useState} from "react";
import api from '../api/axios';

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext(null);

const ProductContextProvider = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/api/product/all-products');
                setAllProducts(response.data.allProducts);

            } catch (error) {
                console.error('Xảy ra lỗi khi fetch sản phẩm: ', error);
            }
        }

        fetchProducts();
    }, [])

    const contextValue = {
        allProducts
    }

    return (
        <ProductContext.Provider value={contextValue}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;