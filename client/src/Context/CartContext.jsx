import { createContext, useEffect, useState} from "react";
import api from '../api/axios';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

const CartContextProvider = (props) => {
    // State authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    // Chứa map productId -> quantity
    const [cartData, setCartData] = useState({});

    useEffect(() => {
        const fetchCartData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                // Xử lý lỗi 401
                setCartData({});
                return;
            }
            try {
                const response = await api.get(
                    '/api/cart/get-cart-data'
                );

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

    // ===== Cart helpers =====
    const updateCartQuantity = async (productId, quantity) => {
        try {
            const res = await api.patch('/api/cart/update-quantity', {
                productId,
                quantity
            });
            if (res.data?.cartData) {
                setCartData(res.data.cartData);
            }
        } catch (error) {
            console.error('Cập nhật số lượng thất bại', error);
        }
    }

    // Tăng số lượng
    const increment = async (productId) => {
        const current = Number(cartData?.[productId] ?? 0);
        await updateCartQuantity(productId, current + 1);
    }

    // Giảm số lượng
    const decrement = async (productId) => {
        const current = Number(cartData?.[productId] ?? 0);
        const next = current - 1;
        await updateCartQuantity(productId, next < 0 ? 0 : next);
    }

    // Xóa khỏi giỏ hàng
    const removeFromCart = async (productId) => {
        await updateCartQuantity(productId, 0);
    }

    // Hiển thị tổng số lượng trong giỏ hàng
    const getTotalItems = () => {
        return Object.values(cartData || {}).reduce(
            (sum, qty) => sum + Number(qty ?? 0), 0 
        )
    };

    const contextValue = {
        cartData,
        updateIsAuthenticated,
        updateCartQuantity,
        increment,
        decrement,
        removeFromCart,
        getTotalItems
    }

    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider;