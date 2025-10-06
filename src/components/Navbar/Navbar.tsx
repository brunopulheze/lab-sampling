import { Navbar as NavbarBs } from 'react-bootstrap';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { AdsBar } from "./AdsBar";
import { AuthBar } from "./AuthBar";
import { StickyBanner } from "./StickyBanner";
import { Banner } from "./Banner";
import { Menu } from "./Menu";
import { SpecialOffers } from "./SpecialOffers";

interface NavbarProps {
    containerClass?: string;
    openCart: () => void;
    authBarBgColor?: string;
}

export function Navbar({ containerClass = '', openCart, authBarBgColor }: NavbarProps) {
    const { cartQuantity } = useShoppingCart();

    return (
        <NavbarBs className={`d-flex flex-column align-items-start p-0 bg-white ${containerClass}`}>
            <AdsBar />
            <AuthBar bgColor={authBarBgColor} />
            <StickyBanner openCart={openCart} cartQuantity={cartQuantity} />
            <Banner openCart={openCart} cartQuantity={cartQuantity} containerClass={containerClass} />
            <Menu />
            <SpecialOffers />
        </NavbarBs>
    );
}