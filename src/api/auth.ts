import api from "./axios";

export const register = async (user: {
    name: string;
    email: string;
    password: string;
}) => {
    const response = await api.post("/register", user);
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });
    return response.data; // response.data now contains access_token, token_type, user
};