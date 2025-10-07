import React, { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer';
import { StoreA } from './pages/StoreA';
import { ShoppingCart } from './components/ShoppingCart';

// Receive isMobile as prop from App
const VersionA: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    const [isCartOpen, setCartOpen] = useState(false);

    // On mobile, do nothing when trying to open cart
    const openCart = () => {
        if (!isMobile) setCartOpen(true);
    };
    const closeCart = () => setCartOpen(false);

    return (
        <div style={{ position: 'relative', height: '100%', minHeight: '100vh' }}>
            <Navbar openCart={openCart} containerClass="navbar-a" />
            <main>
                <StoreA />
            </main>
            {/* Cart drawer inactive on mobile: do not render */}
            {!isMobile && (
                <ShoppingCart isOpen={isCartOpen} onClose={closeCart} containerClass="cart-a" />
            )}
            <Footer />
        </div>
    );
};

export default VersionA;