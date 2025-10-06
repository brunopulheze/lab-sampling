import { createContext, ReactNode, useContext, useEffect, useState, useCallback } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext"; // Make sure this points to the AuthContext provider

type ShoppingCartProviderProps = {
    children: ReactNode;
};

type CartItem = {
    product_id: string;
    quantity: number;
};

type ShoppingCartContextType = {
    openCart: () => void;
    closeCart: () => void;
    getItemQuantity: (product_id: string) => number;
    increaseCartQuantity: (product_id: string) => void;
    decreaseCartQuantity: (product_id: string) => void;
    removeFromCart: (product_id: string) => void;
    cartQuantity: number;
    cartItems: CartItem[];
    checkout: () => Promise<void>;
    fetchCart: () => Promise<void>;
    clearCart: () => void;
    onStoreCheckout: (cb: () => void) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [postCheckoutCallbacks, setPostCheckoutCallbacks] = useState<(() => void)[]>([]);
    const { token } = useAuth();

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    // Memoize onStoreCheckout to avoid infinite render loop
    const onStoreCheckout = useCallback((cb: () => void) => {
        setPostCheckoutCallbacks(prev => [...prev, cb]);
    }, []);

    // Fetch cart from backend
    const fetchCart = useCallback(async () => {
        if (!token) {
            setCartItems([]);
            return;
        }
        try {
            const res = await api.get("/cart", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCartItems(res.data.items || []);
        } catch (e) {
            setCartItems([]);
        }
    }, [token]);

    useEffect(() => {
        if (token !== undefined) {
            fetchCart();
        }
    }, [token, fetchCart]);

    const syncCart = useCallback(async (items: CartItem[]) => {
        setCartItems(items);
        if (!token) return;
        try {
            await api.post("/cart", items, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch { }
    }, [token]);

    function getItemQuantity(product_id: string) {
        return cartItems.find(item => item.product_id === product_id)?.quantity || 0;
    }

    function increaseCartQuantity(product_id: string) {
        let found = cartItems.find(i => i.product_id === product_id);
        let newCart = found
            ? cartItems.map(i => i.product_id === product_id ? { ...i, quantity: i.quantity + 1 } : i)
            : [...cartItems, { product_id, quantity: 1 }];
        syncCart(newCart);
    }

    function decreaseCartQuantity(product_id: string) {
        let found = cartItems.find(i => i.product_id === product_id);
        let newCart = found && found.quantity === 1
            ? cartItems.filter(i => i.product_id !== product_id)
            : cartItems.map(i => i.product_id === product_id ? { ...i, quantity: i.quantity - 1 } : i);
        syncCart(newCart);
    }

    function removeFromCart(product_id: string) {
        let newCart = cartItems.filter(i => i.product_id !== product_id);
        syncCart(newCart);
    }

    function clearCart() {
        setCartItems([]);
        if (!token) return;
        api.post("/cart", [], {
            headers: { Authorization: `Bearer ${token}` }
        }).catch(() => { });
    }

    // In checkout function, after clearing cart:
    async function checkout() {
        if (!token) return;
        await api.post("/checkout", {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        clearCart();
        postCheckoutCallbacks.forEach(cb => cb());
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
                checkout,
                fetchCart,
                clearCart,
                onStoreCheckout
            }}>
            {children}
            <ShoppingCart isOpen={isOpen} onClose={closeCart} />
        </ShoppingCartContext.Provider>
    );
}