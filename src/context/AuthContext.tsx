import React, { createContext, useContext, useState, ReactNode } from "react";
import { login as apiLogin } from "../api/auth";

type AuthContextType = {
    token: string | null;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

    const login = async (email: string, password: string) => {
        // Receive user in the response
        const { access_token, user } = await apiLogin(email, password);
        setToken(access_token);
        localStorage.setItem("token", access_token);
        // Save user info if present
        if (user) {
            // Save name and email for AuthBar/user display
            localStorage.setItem("name", user.name || email.split("@")[0]);
            localStorage.setItem("email", user.email || email);
        } else {
            // Fallback: save email and derive a name
            localStorage.setItem("name", email.split("@")[0]);
            localStorage.setItem("email", email);
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
}