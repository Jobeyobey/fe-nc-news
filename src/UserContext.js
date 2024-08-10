import { createContext } from "react";

export const UserContext = createContext({
    user: localStorage.getItem("username") || null,
    setUser: function (input) {
        return (this.user = input);
    },
});
