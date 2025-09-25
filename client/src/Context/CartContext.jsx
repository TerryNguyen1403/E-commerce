import { createContext, useEffect, useState} from "react";
import axios from 'axios';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

const CartContextProvider = (props) => {
    // State authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Chứa _id và quantity của sản phẩm trong giỏ hàng
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                // Xử lý lỗi 401
                setCartData([]);
                return;
            }
            try {
                const response = await axios.get(
                    'http://localhost:4000/api/cart/get-cart-data',
                    {
                        headers: {
                            "Content-Type": "application/json",
                            token: token,
                        }
                    },
                )

                if (response.data) {
                    setCartData(response.data);
                }

            } catch (error) {
                console.error("Lấy dữ liệu giỏ hàng thất bại", error);
            }
        }
        
        fetchCartData();
    }, [isAuthenticated]);

    // Listen for token changes (login/logout) and update auth state
    useEffect(() => {
        const handleStorageUpdate = () => {
            setIsAuthenticated(!!localStorage.getItem('token'));
        };
        window.addEventListener('storageUpdated', handleStorageUpdate);
        window.addEventListener('storage', handleStorageUpdate);
        return () => {
            window.removeEventListener('storageUpdated', handleStorageUpdate);
            window.removeEventListener('storage', handleStorageUpdate);
        };
    }, []);

    // Cập nhật authenticated
    const updateIsAuthenticated = (status) => {
        setIsAuthenticated(status);
    }

    const contextValue = {
        cartData,
        updateIsAuthenticated
    }

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;