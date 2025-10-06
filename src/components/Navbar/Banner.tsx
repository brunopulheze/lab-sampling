import { useState, useEffect } from "react";
import { Button, Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/store-logo.svg'

interface BannerProps {
    openCart: () => void;
    cartQuantity: number;
    containerClass?: string;
}

export function Banner({ openCart, cartQuantity, containerClass }: BannerProps) {
    const [sticky, setSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 60);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Determine if Version B
    const isVersionB = containerClass === "navbar-b";

    return (
        <div className="w-100 bg-white">
            <div className="custom-width">
                <Container className="d-flex justify-content-between align-items-center">
                    <Nav>
                        <Nav.Link to={"/"} as={NavLink} className='badge p-3 text-white d-none d-sm-block' style={{ backgroundColor: isVersionB ? "#fc0345" : "#0352fc", fontSize: ".9rem" }}>
                            Version {isVersionB ? "B" : "A"}
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
                        {isVersionB ? (
                            // Bootstrap Cart SVG for Version B
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        ) : (
                            // Original SVG for Version A
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
                        )}
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
    );
}