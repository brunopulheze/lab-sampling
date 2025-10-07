import React, { createContext, useContext, useState } from "react";

type CartItem = {
    id: string;
    name: string;
    price: number;
    imgUrl: string;
    quantity: number;
};

type ShoppingCartContextBType = {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

const ShoppingCartContextB = createContext<ShoppingCartContextBType | undefined>(undefined);

export const useShoppingCartB = () => {
    const context = useContext(ShoppingCartContextB);
    if (!context) throw new Error("useShoppingCartB must be used within ShoppingCartProviderB");
    return context;
};

export const ShoppingCartProviderB: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        <ShoppingCartContextB.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </ShoppingCartContextB.Provider>
    );
};