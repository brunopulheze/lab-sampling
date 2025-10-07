import api from "./axios";

export type SurveySubmission = {
    preferredLayout: string;
    shoppingFrequency: string;
    favoriteDevice: string;
    influencingFactors: string[];
    satisfactionLevel: string;
    comments?: string;
};

export const submitSurvey = async (data: SurveySubmission) => {
    const response = await api.post("/survey", data);
    return response.data;
};