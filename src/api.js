import axios from "axios";

axios.defaults.baseURL = "https://be-nc-news-q2go.onrender.com/";

export function getArticles(page) {
    return axios.get("api/articles", { params: { page } }).then(({ data }) => {
        return data;
    });
}
