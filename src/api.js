import axios from "axios";

axios.defaults.baseURL = "https://be-nc-news-q2go.onrender.com/";

export function getArticles() {
    return axios.get("api/articles").then(({ data }) => {
        return data;
    });
}
