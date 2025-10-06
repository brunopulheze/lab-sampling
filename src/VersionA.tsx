import React, { useState } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer';
import { StoreA } from './pages/StoreA';
import { ShoppingCart } from './components/ShoppingCart';

const VersionA: React.FC = () => {
    const [isCartOpen, setCartOpen] = useState(false);

    const openCart = () => setCartOpen(true);
    const closeCart = () => setCartOpen(false);

    return (
        <div style={{ position: 'relative', height: '100%', minHeight: '100vh' }}>
            <Navbar openCart={openCart} containerClass="navbar-a" />
            <main>
                <StoreA />
            </main>
            <ShoppingCart isOpen={isCartOpen} onClose={closeCart} containerClass="cart-a" />
            <Footer />
        </div>
    );
};

export default VersionA;