import React, { useState } from "react";
import api from "./api/axios";

const initialState = {
    preferredLayout: "",
    shoppingFrequency: "",
    favoriteDevice: "",
    influencingFactors: [] as string[],
    satisfactionLevel: "",
    comments: "",
};

const factors = [
    "Price",
    "Product Reviews",
    "Fast Delivery",
    "Website Usability",
    "Brand Reputation",
    "Promotions/Discounts",
];

// 100% width, no maxWidth, no margin auto
const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: "8px",
    padding: "1.5rem",
    marginBottom: "1.2rem",
    width: "100%",
    border: "1px solid #ccc",
};

const contentStyle: React.CSSProperties = {
    width: "50%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5em",
    flexWrap: "wrap"
};

const labelStyle: React.CSSProperties = {
    fontWeight: 500,
    display: "block",
    marginBottom: "0.5em",
    textAlign: "center",
};

export function Survey() {
    const [form, setForm] = useState(initialState);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const allAnswered =
        !!form.preferredLayout &&
        !!form.shoppingFrequency &&
        !!form.favoriteDevice &&
        !!form.satisfactionLevel;

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setForm((f) => ({
                ...f,
                influencingFactors: checked
                    ? [...f.influencingFactors, value]
                    : f.influencingFactors.filter((fac) => fac !== value),
            }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!allAnswered) {
            setError("Please answer all required questions before submitting.");
            return;
        }
        setError("");
        try {
            await api.post("/survey", form);
            setSubmitted(true);
        } catch {
            setError("Failed to submit survey. Please try again.");
        }
    };

    if (submitted)
        return (
            <div style={{
                ...cardStyle,
                textAlign: "center",
                marginTop: "3rem",
                maxWidth: 500,
                marginLeft: "auto",
                marginRight: "auto"
            }}>
                <h2>Thank you for participating!</h2>
                <p>Your answers have been submitted successfully.</p>
            </div>
        );

    // Main parent container with horizontal padding only
    return (
        <form
            onSubmit={handleSubmit}
            style={{
                backgroundColor: "#ffffff",
                width: '100%',
                margin: "2.5rem auto",
                paddingLeft: "1.2rem",
                paddingRight: "1.2rem",
            }}
        >
            <h3 style={{ textAlign: "center", fontWeight: 700, marginBottom: "1.5rem" }}>Survey</h3>
            <div style={cardStyle}>
                <div style={contentStyle}>
                    <label style={labelStyle}>Which layout do you prefer?</label>
                    <div>
                        <label style={{ marginRight: "1.5em" }}>
                            <input
                                type="radio"
                                name="preferredLayout"
                                value="A"
                                checked={form.preferredLayout === "A"}
                                onChange={handleChange}
                            />{" "}
                            Layout A
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="preferredLayout"
                                value="B"
                                checked={form.preferredLayout === "B"}
                                onChange={handleChange}
                            />{" "}
                            Layout B
                        </label>
                    </div>
                </div>
            </div >
            <div style={cardStyle}>
                <div style={contentStyle}>
                    <label style={labelStyle}>How often do you shop online?</label>
                    <select
                        name="shoppingFrequency"
                        value={form.shoppingFrequency}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5em", borderRadius: 4, border: "1px solid #ddd" }}
                    >
                        <option value="">Select...</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Rarely">Rarely</option>
                        <option value="Never">Never</option>
                    </select>
                </div>
            </div>
            <div style={cardStyle}>
                <div style={contentStyle}>
                    <label style={labelStyle}>What is your favorite device for online shopping?</label>
                    <select
                        name="favoriteDevice"
                        value={form.favoriteDevice}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5em", borderRadius: 4, border: "1px solid #ddd" }}
                    >
                        <option value="">Select...</option>
                        <option value="Desktop/Laptop">Desktop/Laptop</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Tablet">Tablet</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div style={cardStyle}>
                <div style={contentStyle}>
                    <label style={labelStyle}>
                        What factors most influence your decision to buy online?<br /> <span style={{ fontWeight: 400 }}>(Select all that apply)</span>
                    </label>
                    <div className="d-flex flex-wrap justify-content-center" style={{ gap: "0.5em" }}>
                        {factors.map((fac) => (
                            <label key={fac} style={{ marginRight: "1em", display: "inline-block" }}>
                                <input
                                    type="checkbox"
                                    name="influencingFactors"
                                    value={fac}
                                    checked={form.influencingFactors.includes(fac)}
                                    onChange={handleChange}
                                />{" "}
                                {fac}
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <div style={cardStyle}>
                <div style={contentStyle}>
                    <label style={labelStyle}>How satisfied are you with your overall online shopping experiences?</label>
                    <select
                        name="satisfactionLevel"
                        value={form.satisfactionLevel}
                        onChange={handleChange}
                        style={{ width: "100%", padding: "0.5em", borderRadius: 4, border: "1px solid #ddd" }}
                    >
                        <option value="">Select...</option>
                        <option value="Very satisfied">Very satisfied</option>
                        <option value="Satisfied">Satisfied</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Unsatisfied">Unsatisfied</option>
                        <option value="Very unsatisfied">Very unsatisfied</option>
                    </select>
                </div>
            </div>
            <div style={cardStyle}>
                <div style={contentStyle}>
                    <label style={labelStyle}>Comments (optional):</label>
                    <textarea
                        name="comments"
                        value={form.comments}
                        onChange={handleChange}
                        rows={3}
                        style={{ width: "100%", padding: "0.5em", borderRadius: 4, border: "1px solid #ddd" }}
                    />
                </div>
            </div>
            <div style={{ ...cardStyle, textAlign: "center", boxShadow: "none", marginBottom: 0 }}>
                <button
                    type="submit"
                    className="btn"
                    style={{
                        background: allAnswered ? "#222" : "#aaa",
                        color: "#fff",
                        border: "none",
                        padding: "0.8em",
                        borderRadius: "8px",
                        minWidth: "150px",
                        fontWeight: 600,
                        fontSize: "1.1rem",
                        cursor: allAnswered ? "pointer" : "not-allowed",
                        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                        opacity: allAnswered ? 1 : 0.7,
                        transition: "background 0.2s, opacity 0.2s",
                    }}
                    disabled={!allAnswered}
                    title={!allAnswered ? "Please answer all required questions before submitting." : ""}
                >
                    Submit
                </button>
                {!allAnswered && (
                    <div style={{ color: "#a00", marginTop: "0.7em" }}>
                        Please answer all required questions before submitting.
                    </div>
                )}
            </div>
            {
                error && (
                    <div style={{ ...cardStyle, color: "#a00", textAlign: "center" }}>
                        {error}
                    </div>
                )
            }
        </form >
    );
}
export default Survey;