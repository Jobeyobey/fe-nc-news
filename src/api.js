import axios from "axios";

axios.defaults.baseURL = "https://be-nc-news-q2go.onrender.com/api/";

export function getArticles(page) {
    return axios.get("articles", { params: { page } }).then(({ data }) => {
        return data;
    });
}

export function getArticleById(articleId) {
    return axios.get(`articles/${articleId}`).then(({ data }) => {
        return data.article;
    });
}

export function getCommentsByArticleId(articleId, page) {
    return axios
        .get(`articles/${articleId}/comments`, { params: { page } })
        .then(({ data }) => {
            return data.comments;
        });
}

export function voteArticleById(articleId, vote) {
    return axios
        .patch(`articles/${articleId}`, { inc_votes: vote })
        .then(({ data }) => {
            return data.article;
        });
}
