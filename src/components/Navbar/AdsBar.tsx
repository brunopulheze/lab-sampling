import { Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export function AdsBar() {
    return (
        <div className='d-none d-sm-block w-100 bg-secondary text-dark bg-opacity-10'>
            <Container>
                <Nav className='d-flex justify-content-center gap-5' style={{ fontSize: ".9rem" }}>
                    <Nav.Link to={"/"} as={NavLink} className='text-muted'>
                        <span className='fw-bold me-1'>
                            <svg
                                className='me-1'
                                width="10px"
                                height="10px"
                                viewBox="0 01 10 10"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M9.55313 7.43141L7.94187 5.81016C7.69813 5.56453 7.30125 5.56453 7.05688 5.80891L5.625 7.24078L2.5 4.11578L3.93375 2.68203C4.1775 2.43828 4.17812 2.04266 3.93438 1.79828L2.32188 0.183281C2.0775 -0.0610937 1.68187 -0.0610937 1.4375 0.183281L0.0025 1.61766L0 1.61578C0 6.10328 3.6375 9.74078 8.125 9.74078L9.55188 8.31391C9.79562 8.07016 9.79625 7.67578 9.55313 7.43141Z"
                                    transform="translate(0 0.2592188)"
                                    fill="currentColor">
                                </path>
                            </svg>
                            Hotline:
                        </span>
                        0800-010101010
                    </Nav.Link>
                    <Nav.Link to={"/"} as={NavLink} className='text-muted'>
                        <svg
                            className="me-1"
                            width="10px"
                            height="10px"
                            viewBox="0 0 12 12"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.44789 10.8027L0 7.23665L0.972973 6.24984L3.56757 7.89453L11.027 0L12 0.657877L4.42703 10.7408C4.31291 10.8927 4.13933 10.9869 3.9514 10.9987C3.76346 11.0106 3.57971 10.9391 3.44789 10.8027Z"
                                fill="currentColor">
                            </path>
                        </svg>
                        Free Shipping
                    </Nav.Link>
                    <Nav.Link to={"/"} as={NavLink} className='text-muted'>
                        <svg
                            className="me-1"
                            width="10px"
                            height="10px"
                            viewBox="0 0 12 12"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.44789 10.8027L0 7.23665L0.972973 6.24984L3.56757 7.89453L11.027 0L12 0.657877L4.42703 10.7408C4.31291 10.8927 4.13933 10.9869 3.9514 10.9987C3.76346 11.0106 3.57971 10.9391 3.44789 10.8027Z"
                                fill="currentColor">
                            </path>
                        </svg>
                        Shop Now
                    </Nav.Link>
                </Nav>
            </Container>
        </div>
    )
}