import React, { useState } from 'react';
import api from "./api/axios"; // Import your configured axios instance

interface SurveyData {
    preferredAuthBar: 'A' | 'B' | '';
    preferredCartIcon: 'A' | 'B' | '';
    preferredDrawerSide: 'A' | 'B' | '';
    preferredButtonColor: 'A' | 'B' | '';
    preferredFooterBg: 'A' | 'B' | '';
    comments: string;
}

const questions = [
    {
        name: "preferredAuthBar",
        label: "Which authentication bar background color felt most appealing to you?",
        options: [{ value: "A", label: "Style A" }, { value: "B", label: "Style B" }]
    },
    {
        name: "preferredCartIcon",
        label: "Which shopping cart icon caught your attention?",
        options: [{ value: "A", label: "Icon A" }, { value: "B", label: "Icon B" }]
    },
    {
        name: "preferredDrawerSide",
        label: "Did you prefer the shopping cart drawer opening from the right or left side?",
        options: [{ value: "A", label: "Right (Version A)" }, { value: "B", label: "Left (Version B)" }]
    },
    {
        name: "preferredButtonColor",
        label: "Which style of action button looked better to you?",
        options: [{ value: "A", label: "Button A" }, { value: "B", label: "Button B" }]
    },
    {
        name: "preferredFooterBg",
        label: "Which footer background color created a nicer finishing touch?",
        options: [{ value: "A", label: "Footer A" }, { value: "B", label: "Footer B" }]
    }
];

export const Survey: React.FC = () => {
    const [data, setData] = useState<SurveyData>({
        preferredAuthBar: '',
        preferredCartIcon: '',
        preferredDrawerSide: '',
        preferredButtonColor: '',
        preferredFooterBg: '',
        comments: '',
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    // Validation: all questions except comments must be answered
    const allAnswered = questions.every(q => (data as any)[q.name] !== '');

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!allAnswered) {
            setError("Please answer all questions before submitting.");
            return;
        }
        try {
            await api.post("/survey", data);
            setSubmitted(true);
        } catch (error) {
            setError("Failed to submit survey. Please try again.");
        }
    };

    if (submitted) {
        return (
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    padding: '1rem',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px'
                }}
            >
                <div className="bg-white" style={{ fontSize: "1.25rem", textAlign: "center", margin: "2rem 0" }}>
                    Thank you for your feedback! Your answers have been submitted successfully.
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                maxWidth: '1200px',
                margin: '0 auto',
                width: '100%',
            }}
        >
            <form
                onSubmit={handleSubmit}
                className='bg-white'
                style={{
                    padding: '2rem',
                    borderBottomLeftRadius: '8px',
                    borderBottomRightRadius: '8px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                }}
            >
                <h3 className='text-center mb-4'>Survey</h3>
                <div className="row g-3">
                    {questions.map(({ name, label, options }) => (
                        <div key={name} className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <label className="fw-bold mb-2">{label}</label>
                                    <div className="d-flex align-items-center" style={{ gap: "2rem" }}>
                                        {options.map(opt => (
                                            <div key={opt.value}>
                                                <input
                                                    type="radio"
                                                    name={name}
                                                    value={opt.value}
                                                    checked={(data as any)[name] === opt.value}
                                                    onChange={handleChange}
                                                    id={`${name}_${opt.value}`}
                                                    className="form-check-input me-1"
                                                />
                                                <label htmlFor={`${name}_${opt.value}`} className="form-check-label">{opt.label}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <label htmlFor="comments" className="fw-bold mb-2">
                                    Any comments or suggestions about your experience?
                                </label>
                                <textarea
                                    name="comments"
                                    id="comments"
                                    value={data.comments}
                                    onChange={handleChange}
                                    rows={3}
                                    style={{ width: '100%', resize: 'vertical' }}
                                    className="form-control mt-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {error && (
                    <div className="text-danger text-center mt-3" style={{ fontSize: "1rem" }}>
                        {error}
                    </div>
                )}
                <div className="d-flex justify-content-center">
                    <button
                        type="submit"
                        className="btn btn-dark mt-4"
                        style={{ minWidth: '150px', fontWeight: 500 }}
                        disabled={!allAnswered}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Survey;