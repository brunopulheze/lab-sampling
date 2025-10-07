import React, { createContext, useContext, useState } from "react";

type CartItem = {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
    quantity: number;
};

type ShoppingCartContextAType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

const ShoppingCartContextA = createContext<ShoppingCartContextAType | undefined>(undefined);

export const useShoppingCartA = () => {
    const context = useContext(ShoppingCartContextA);
    if (!context) throw new Error("useShoppingCartA must be used within ShoppingCartProviderA");
    return context;
};

export const ShoppingCartProviderA: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems(prev =>
            prev.some(i => i.id === item.id)
                ? prev.map(i =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                )
                : [...prev, item]
        );
    };

    const removeFromCart = (id: string) => {
        setCartItems(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => setCartItems([]);

    return (
        <ShoppingCartContextA.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </ShoppingCartContextA.Provider>
    );
};