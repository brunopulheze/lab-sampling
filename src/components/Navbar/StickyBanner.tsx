import { useState, useEffect } from "react";
import { Button, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../../context/ShoppingCartContext'
import logo from '../../assets/store-logo.svg'

type StickyBannerProps = {
    openCart: () => void;
    cartQuantity: number;
};

export function StickyBanner({ openCart, cartQuantity }: StickyBannerProps) {
    const [sticky, setSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    });

    return (
        <>
            {sticky ? (
                <div className="w-100 bg-white sticky shadow-sm">
                    <div className="custom-width">
                        <Container className="custom-width d-flex justify-content-center justify-content-sm-between align-items-center">
                            <Nav>
                                <Nav.Link to={"/"} as={NavLink} className='text-muted d-none d-sm-block'>
                                    Store
                                </Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link to={"/"} as={NavLink}>
                                    <img src={logo} alt="" />
                                </Nav.Link>
                            </Nav>
                            <Button
                                onClick={openCart}
                                style={{ width: "3rem", height: "3rem", position: "relative" }}
                                variant="outline-secondary"
                                className="rounded-circle"
                            >
                                <svg
                                    width="21px"
                                    height="21px"
                                    viewBox="0 0 22 22"
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g
                                        id="shopping-bag"
                                        transform="translate(0.75 0.75)">
                                        <path
                                            d="M0 0L20 0L20 20L0 20L0 0Z"
                                            id="Rectangle"
                                            fill="none"
                                            stroke="none">
                                        </path>
                                        <g
                                            id="Group"
                                            transform="translate(1.666667 0.8333333)">
                                            <path
                                                d="M16.6667 13.3333L0 13.3333L1.66667 0L15 0L16.6667 13.3333L16.6667 13.3333Z"
                                                transform="translate(0 5)"
                                                id="Path"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5">
                                            </path>
                                            <path
                                                d="M0 7.5L0 3.33333C0.00549133 1.49466 1.49466 0.00549134 3.33333 0L3.33333 0C5.172 0.00549134 6.66117 1.49466 6.66667 3.33333L6.66667 7.5"
                                                transform="translate(5 4.440892E-16)"
                                                id="Path"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5">
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                                {cartQuantity > 0 ? (
                                    <div
                                        className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                        style={{
                                            color: "white",
                                            width: "1.5rem",
                                            height: "1.5rem",
                                            position: "absolute",
                                            bottom: 0,
                                            right: 0,
                                            transform: "translate(25%, 25%)",
                                        }}
                                    >
                                        {cartQuantity}
                                    </div>
                                ) : null}
                            </Button>
                        </Container>
                    </div>
                </div>
            ) : null}
        </>
    )
}