import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
    isOpen: boolean;
    onClose: () => void;
    containerClass?: string;
    placement?: "left" | "right";
};

export function ShoppingCart({
    isOpen,
    onClose,
    containerClass,
    placement = "right"
}: ShoppingCartProps) {
    const { cartItems, cartQuantity, checkout, clearCart } = useShoppingCart();

    const drawerPosition = placement === "left"
        ? { left: 0, right: "auto" }
        : { right: 0, left: "auto" };

    if (!isOpen) return null;

    return (
        <div
            className={`custom-cart-drawer ${containerClass || ""}`}
            style={{
                position: 'absolute',
                top: 0,
                ...drawerPosition,
                width: '350px',
                height: '100%',
                background: 'white',
                boxShadow: '-2px 0 8px rgba(0,0,0,0.07)',
                zIndex: 100,
                transition: 'transform 0.3s ease',
            }}
        >
            {/* Close button */}
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
                <button onClick={onClose} style={{ border: "none", background: "none", fontSize: "1.5rem", cursor: "pointer" }}>
                    &times;
                </button>
            </div>
            <div style={{ padding: "1rem", height: "calc(100% - 64px)", display: "flex", flexDirection: "column" }}>
                <h4>Your Cart</h4>
                {cartItems.length === 0 ? (
                    <div className="text-muted mt-3">Your cart is empty.</div>
                ) : (
                    <>
                        <div style={{ flex: 1, overflowY: "auto", marginBottom: "1rem" }}>
                            {cartItems.map(item => (
                                <CartItem key={item.product_id} product_id={item.product_id} quantity={item.quantity} />
                            ))}
                        </div>
                        <div className="mt-3">
                            <strong>Total items:</strong> {cartQuantity}
                        </div>
                        <div className="mt-3 d-flex gap-2">
                            <button
                                className="btn btn-success"
                                onClick={checkout}
                                disabled={cartItems.length === 0}
                            >
                                Checkout
                            </button>
                            <button
                                className="btn btn-outline-secondary"
                                onClick={clearCart}
                                disabled={cartItems.length === 0}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}