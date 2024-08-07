import axios from "axios";

axios.defaults.baseURL = "https://be-nc-news-q2go.onrender.com/";

export function getArticles(page) {
    return axios.get("api/articles", { params: { page } }).then(({ data }) => {
        return data;
    });
}

export function getArticleById(articleId) {
    return axios.get(`api/articles/${articleId}`).then(({ data }) => {
        return data.article;
    });
}

export function getCommentsByArticleId(articleId, page) {
    return axios
        .get(`api/articles/${articleId}/comments`, { params: { page } })
        .then(({ data }) => {
            return data.comments;
        });
}
