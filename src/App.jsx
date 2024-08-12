import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import ErrorPage from "./pages/ErrorPage";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import PostArticlePage from "./pages/PostArticlePage";
import "./styles/App.css";
import "./styles/Fonts.css";

function App() {
    const user = useContext(UserContext);

    return (
        <>
            <UserContext.Provider value={user}>
                <Routes>
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/article/:article-id"
                        element={<ArticlePage />}
                    />
                    <Route path="/article/post" element={<PostArticlePage />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export default App;
