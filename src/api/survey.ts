import api from "./axios";

export const submitSurvey = async (answers: object) => {
    const response = await api.post("/survey", answers);
    return response.data;
};