import axios from "axios";

const API = "https://be-nc-news-q2go.onrender.com/api/";
axios.defaults.baseURL = API;

export function getAllUsers() {
    return axios.get("users").then(({ data }) => {
        return data.users;
    });
}

export function getAllTopics() {
    return axios.get("topics").then(({ data }) => {
        return data.topics;
    });
}

export function postTopic(slug, description) {
    return axios.post("topics", { slug, description }).then(() => {
        return "Topic posted";
    });
}

export function getArticles(page, topic, sort_by, order) {
    if (topic === "all-topics") topic = undefined;
    return axios
        .get("articles", { params: { page, topic, sort_by, order } })
        .then(({ data }) => {
            return data;
        });
}

export function getArticleById(articleId) {
    return axios.get(`articles/${articleId}`).then(({ data }) => {
        return data.article;
    });
}

export function postArticle({ title, topic, author, body, article_img_url }) {
    return axios
        .post(`articles`, { title, topic, author, body, article_img_url })
        .then(({ data }) => {
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

export function postCommentToArticle(articleId, body) {
    return axios
        .post(`articles/${articleId}/comments`, {
            username: localStorage.getItem("username"),
            body,
        })
        .then(({ data }) => {
            return data.comment;
        });
}

export function deleteCommentById(commentId) {
    return axios.delete(`comments/${commentId}`).then(() => {
        return "Deleted";
    });
}
