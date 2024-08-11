import axios from "axios";

const API = "https://be-nc-news-q2go.onrender.com/api/";
const axiosInstance = axios.create({ baseURL: API });

export function getAllUsers() {
    return axiosInstance.get("users").then(({ data }) => {
        return data.users;
    });
}

export function getAllTopics() {
    return axiosInstance.get("topics").then(({ data }) => {
        return data.topics;
    });
}

export function postTopic(slug, description) {
    return axiosInstance.post("topics", { slug, description }).then(() => {
        return "Topic posted";
    });
}

export function getArticles(page, topic, sort_by, order) {
    if (topic === "all-topics") topic = undefined;
    return axiosInstance
        .get("articles", { params: { page, topic, sort_by, order } })
        .then(({ data }) => {
            return data;
        });
}

export function getArticleById(articleId) {
    return axiosInstance.get(`articles/${articleId}`).then(({ data }) => {
        return data.article;
    });
}

export function postArticle({ title, topic, author, body, article_img_url }) {
    return axiosInstance
        .post(`articles`, { title, topic, author, body, article_img_url })
        .then(({ data }) => {
            return data.article;
        });
}

export function getCommentsByArticleId(articleId, page) {
    return axiosInstance
        .get(`articles/${articleId}/comments`, { params: { page } })
        .then(({ data }) => {
            return data.comments;
        });
}

export function voteArticleById(articleId, vote) {
    return axiosInstance
        .patch(`articles/${articleId}`, { inc_votes: vote })
        .then(({ data }) => {
            return data.article;
        });
}

export function deleteArticleById(articleId) {
    return axiosInstance.delete(`articles/${articleId}`).then((response) => {
        console.log(response, "then");
        return "Article deleted";
    });
}

export function postCommentToArticle(articleId, body) {
    return axiosInstance
        .post(`articles/${articleId}/comments`, {
            username: localStorage.getItem("username"),
            body,
        })
        .then(({ data }) => {
            return data.comment;
        });
}

export function voteCommentById(commentId, vote) {
    return axiosInstance
        .patch(`comments/${commentId}`, { inc_votes: vote })
        .then(({ data }) => {
            return data.comment;
        });
}

export function deleteCommentById(commentId) {
    return axiosInstance.delete(`comments/${commentId}`).then(() => {
        return "Deleted";
    });
}
