export function dateToString(createdAt) {
    const date = new Date(Date.parse(createdAt));
    return date.toDateString();
}
