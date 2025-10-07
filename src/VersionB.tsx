import React, { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer';
import { StoreB } from './pages/StoreB';
import { ShoppingCart } from './components/ShoppingCart';

const VersionB: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
    const [isCartOpen, setCartOpen] = useState(false);

    const openCart = () => {
        if (!isMobile) setCartOpen(true);
    };
    const closeCart = () => setCartOpen(false);

    return (
        <div style={{ position: 'relative', height: '100%', minHeight: '100vh' }}>
            <Navbar
                openCart={openCart}
                containerClass="navbar-b"
                authBarBgColor="#d7eaf7"
            />
            <main>
                <StoreB />
            </main>
            {!isMobile && (
                <ShoppingCart isOpen={isCartOpen} onClose={closeCart} containerClass="cart-b" placement="left" />
            )}
            <Footer bgColor="#cfc4f2" />
        </div>
    );
};

export default VersionB;