import axios from "axios";

export function dateToString(createdAt) {
    const date = new Date(Date.parse(createdAt));
    return date.toDateString();
}

export function prepareSearchParams(topic, sort_by, isOrderedDesc) {
    const params = {};
    if (topic) params.topic = topic;
    if (sort_by) params.sort_by = sort_by;
    if (!isOrderedDesc) params.order = "ASC";
    return params;
}

export function checkIsImgURL(imgURL) {
    return axios
        .head(imgURL)
        .then((response) => {
            return response.headers["content-type"].startsWith("image");
        })
        .catch(() => Promise.reject());
}
