import axios from "axios";

const rawBaseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const baseURL = rawBaseURL.endsWith("/") ? rawBaseURL.slice(0, -1) : rawBaseURL;

console.log("[SupportAI] Connecting to API Base URL:", baseURL);

const API = axios.create({
    baseURL: baseURL
});


API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem(
            "token"
        );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => {

        return Promise.reject(error);
    }
);


export const loginUser = async (

    username,

    password

) => {

    const response = await API.post(

        "/login",

        {

            username,

            password
        }
    );

    return response.data;
};


export const analyzeTicket = async (

    ticket

) => {

    const response = await API.post(

        "/analyze-ticket",

        ticket
    );

    return response.data;
};


export const fetchAnalytics = async () => {

    const response = await API.get(
        "/analytics"
    );

    return response.data;
};


export const fetchIncidents = async () => {

    const response = await API.get(
        "/incidents"
    );

    return response.data;
};


export const fetchClusters = async () => {

    const response = await API.get(
        "/clusters"
    );

    return response.data;
};


export const fetchExecutiveSummary = async () => {

    const response = await API.get(
        "/executive-summary"
    );

    return response.data;
};


export const fetchTrends = async () => {

    const response = await API.get(
        "/trends"
    );

    return response.data;
};


export const fetchKnowledgeBase = async () => {

    const response = await API.get(
        "/knowledge-base"
    );

    return response.data;
};


export const fetchSemanticClusters = async () => {

    const response = await API.get(
        "/semantic-clusters"
    );

    return response.data;
};


export const logoutUser = () => {

    localStorage.removeItem(
        "token"
    );
};


export const registerUser = async (
    username, password
) => {
    const response = await API.post(
        "/register",
        {
            username,
            password
        }
    );
    return response.data;
}

export const changePassword = async (

    data

) => {

    const response = await API.post(

        "/change-password",

        data
    );

    return response.data;
};

export const fetchPreferences = async () => {

    const response = await API.get(
        "/preferences"
    );

    return response.data;
};

export const savePreferences = async (
    data
) => {

    const response = await API.post(

        "/preferences",

        data
    );

    return response.data;
};

export const googleLoginUser = async (data = {}) => {
    const response = await API.post("/google-login", data);
    return response.data;
};

export default API;