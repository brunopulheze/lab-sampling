import { useState, useEffect } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { useAuth } from "../../context/AuthContext"

interface UserInfo {
    name: string
    email: string
}

function capitalizeName(name: string) {
    return name.replace(/\b\w/g, (c) => c.toUpperCase())
}

interface AuthModalProps {
    show: boolean
    onHide: () => void
    bgColor?: string
}

export function AuthModal({ show, onHide, bgColor = "#f7d7da" }: AuthModalProps) {
    const [loginForm, setLoginForm] = useState({ email: "", password: "" })
    const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "" })
    const [showRegister, setShowRegister] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [registerError, setRegisterError] = useState("")
    const [registerSuccess, setRegisterSuccess] = useState(false)
    const [user, setUser] = useState<UserInfo | null>(null)
    const [justLoggedIn, setJustLoggedIn] = useState(false)

    const { token, isLoggedIn, login, logout } = useAuth()

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

    // Reset state when modal closes
    useEffect(() => {
        if (!show) {
            setShowRegister(false)
            setLoginError("")
            setRegisterError("")
            setRegisterSuccess(false)
            setJustLoggedIn(false)
            setLoginForm({ email: "", password: "" })
            setRegisterForm({ name: "", email: "", password: "" })
        }
    }, [show])

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
            await login(loginForm.email, loginForm.password);
            const name = localStorage.getItem("name") || loginForm.email.split('@')[0];
            setUser({ name, email: loginForm.email });
            setJustLoggedIn(true);
            setTimeout(() => {
                onHide();
            }, 1200);
        } catch (err: any) {
            setLoginError(err?.response?.data?.detail || "Login failed.");
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setRegisterError("")
        setRegisterSuccess(false)
        try {
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

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            contentClassName="border-0"
            dialogClassName="m-0"
            style={{ padding: 0 }}
            className="d-block d-sm-none"
            fullscreen
            centered
        >
            <div style={{ background: bgColor, minHeight: "100vh", minWidth: "100vw", position: "relative" }}>
                <Button
                    variant="link"
                    style={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        fontSize: "1.5rem",
                        color: "#333",
                        zIndex: 10,
                        textDecoration: "none",
                        padding: "0.25rem"
                    }}
                    onClick={onHide}
                    aria-label="Close"
                >
                    &times;
                </Button>
                <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "100%", maxWidth: 350, background: bgColor, padding: "2rem 1.5rem" }}>
                        {!isLoggedIn && !justLoggedIn ? (
                            <>
                                {!showRegister ? (
                                    <>
                                        <h4 className="mb-4 text-center">Login</h4>
                                        <Form onSubmit={handleLogin}>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    name="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={loginForm.email}
                                                    onChange={handleLoginChange}
                                                    size="sm"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={loginForm.password}
                                                    onChange={handleLoginChange}
                                                    size="sm"
                                                    required
                                                />
                                            </Form.Group>
                                            <div className="d-flex flex-column gap-2">
                                                <Button type="submit" variant="dark" size="sm">Login</Button>
                                                <Button variant="outline-dark" size="sm" onClick={() => setShowRegister(true)}>
                                                    Register
                                                </Button>
                                            </div>
                                            {loginError && <div className="text-danger mt-2">{loginError}</div>}
                                        </Form>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="mb-4 text-center">Register</h4>
                                        <Form onSubmit={handleRegister}>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    name="name"
                                                    placeholder="Name"
                                                    value={registerForm.name}
                                                    onChange={handleRegisterChange}
                                                    size="sm"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    name="email"
                                                    type="email"
                                                    placeholder="Email"
                                                    value={registerForm.email}
                                                    onChange={handleRegisterChange}
                                                    size="sm"
                                                    required
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    name="password"
                                                    type="password"
                                                    placeholder="Password"
                                                    value={registerForm.password}
                                                    onChange={handleRegisterChange}
                                                    size="sm"
                                                    required
                                                />
                                            </Form.Group>
                                            <div className="d-flex flex-column gap-2">
                                                <Button type="submit" variant="dark" size="sm">Register</Button>
                                                <Button variant="outline-dark" size="sm" onClick={() => setShowRegister(false)}>
                                                    Back to Login
                                                </Button>
                                            </div>
                                            {registerError && <div className="text-danger mt-2">{registerError}</div>}
                                            {registerSuccess && <div className="text-success mt-2">Registration successful!</div>}
                                        </Form>
                                    </>
                                )}
                            </>
                        ) : (
                            // When logged in, display message and close modal soon after
                            <div className="text-center py-5">
                                <h4>You're logged in</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    )
}