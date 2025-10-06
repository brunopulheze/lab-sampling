import { Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../../data/data'

export function Menu() {
    return (
        <div className='d-none d-sm-block w-100 border-top'>
            <Container>
                <Nav className='d-flex justify-content-center gap-5'>
                    {navLinks.map((item, i) => (
                        <Nav.Link key={i} to={"#"} as={NavLink} className="text-muted">
                            {item}
                        </Nav.Link>
                    ))}
                </Nav>
            </Container>
        </div >
    )
}