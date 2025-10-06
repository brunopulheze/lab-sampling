import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/store-logo.svg";
const year = new Date().getFullYear();

interface FooterProps {
    bgColor?: string;
}

export function Footer({ bgColor = "#e4f5f0" }: FooterProps) {
    return (
        <footer className="text-dark py-1" style={{ backgroundColor: bgColor }}>
            <Container className="d-flex flex-column align-items-center">
                <div className="my-4">
                    <img src={logo} alt="" />
                </div>
                <div className="">
                    <p>
                        Copyright <span>&#169;</span> {year}
                    </p>
                </div>
            </Container>
        </footer>
    );
}