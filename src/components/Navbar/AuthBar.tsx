import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"
import { AuthModal } from "./AuthModal"

interface UserInfo {
    name: string
    email: string
}

interface AuthBarProps {
    bgColor?: string;
}

// Helper function to capitalize first letter of each word
function capitalizeName(name: string) {
    return name.replace(/\b\w/g, (c) => c.toUpperCase())
}

export function AuthBar({ bgColor = "#f7d7da" }: AuthBarProps) {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" })
    const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" })
    const [showRegister, setShowRegister] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [registerError, setRegisterError] = useState("")
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [user, setUser] = useState<UserInfo | null>(null)

    const { isLoggedIn, login, logout } = useAuth()

    // Manage user info in AuthBar (name/email)
    useEffect(() => {
        if (isLoggedIn) {
            const name = localStorage.getItem("name")
            const email = localStorage.getItem("email")
            if (name && email) setUser({ name, email })
            else if (email) setUser({ name: email.split('@')[0], email }) // fallback
        } else {
            setUser(null)
        }
    }, [isLoggedIn])

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }
    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");
        try {
            // Context login now saves user info in localStorage
            await login(loginForm.email, loginForm.password);
            const name = localStorage.getItem("name") || loginForm.email.split('@')[0];
            setUser({ name, email: loginForm.email });
            setLoginForm({ email: "", password: "" });
        } catch (err: any) {
            setLoginError(err?.response?.data?.detail || "Login failed.");
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setRegisterError("")
        setRegisterSuccess(false)
        try {
            // registerForm has name, email, password
            const register = (await import("../../api/auth")).register
            await register(registerForm)
            setRegisterSuccess(true)
            setShowRegister(false)
            setRegisterForm({ name: "", email: "", password: "" })
            localStorage.setItem("name", registerForm.name)
        } catch (err: any) {
            setRegisterError(err?.response?.data?.detail || "Registration failed.")
        }
    }

    const handleLogout = () => {
        logout()
        localStorage.removeItem("email")
        localStorage.removeItem("name")
        setUser(null)
    }

    return (
        <div className="w-100" style={{ backgroundColor: bgColor }}>
            <div className="custom-width d-flex justify-content-center align-items-center my-2" style={{ gap: "1rem", flexWrap: "wrap" }}>
                {/* md+ screens: original logic */}
                <div className="d-none d-md-flex w-100 justify-content-center" style={{ gap: "1rem", flexWrap: "wrap" }}>
                    {isLoggedIn && user ? (
                        <>
                            <span>Welcome, {capitalizeName(user.name)}</span>
                            <Button variant="outline-secondary" size="sm" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            {!showRegister ? (
                                <Form onSubmit={handleLogin} className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={loginForm.email}
                                        onChange={handleLoginChange}
                                        size="sm"
                                        required
                                        style={{ width: 140 }}
                                    />
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={loginForm.password}
                                        onChange={handleLoginChange}
                                        size="sm"
                                        required
                                        style={{ width: 110 }}
                                    />
                                    <Button type="submit" variant="light" size="sm">Login</Button>
                                    <Button variant="outline-dark" size="sm" onClick={() => setShowRegister(true)} style={{ textDecoration: "none" }}>
                                        Register
                                    </Button>
                                    {loginError && <span className="text-danger ms-2">{loginError}</span>}
                                </Form>
                            ) : (
                                <Form onSubmit={handleRegister} className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
                                    <Form.Control
                                        name="name"
                                        placeholder="Name"
                                        value={registerForm.name}
                                        onChange={handleRegisterChange}
                                        size="sm"
                                        required
                                        style={{ width: 100 }}
                                    />
                                    <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        value={registerForm.email}
                                        onChange={handleRegisterChange}
                                        size="sm"
                                        required
                                        style={{ width: 140 }}
                                    />
                                    <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={registerForm.password}
                                        onChange={handleRegisterChange}
                                        size="sm"
                                        required
                                        style={{ width: 110 }}
                                    />
                                    <Button type="submit" variant="dark" size="sm">Register</Button>
                                    <Button variant="outline-dark" size="sm" onClick={() => setShowRegister(false)} style={{ textDecoration: "none" }}>
                                        Back to Login
                                    </Button>
                                    {registerError && <span className="text-danger ms-2">{registerError}</span>}
                                    {registerSuccess && <span className="text-success ms-2">Registration successful!</span>}
                                </Form>
                            )}
                        </>
                    )}
                </div>
                {/* sm and below: welcome & logout or login/register triggers */}
                <div className="d-flex d-md-none w-100 justify-content-center align-items-center" style={{ gap: "1rem", flexWrap: "wrap" }}>
                    {isLoggedIn && user ? (
                        <>
                            <span>Welcome, {capitalizeName(user.name)}</span>
                            <Button variant="outline-secondary" size="sm" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="light" size="sm" onClick={() => setShowModal(true)}>Login</Button>
                            <Button variant="outline-dark" size="sm" onClick={() => setShowModal(true)}>Register</Button>
                        </>
                    )}
                </div>
            </div>
            {/* Modal for small screens */}
            <AuthModal show={showModal} onHide={() => setShowModal(false)} />
        </div>
    )
}