import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppBar from "./components/AppBar";
import "./styles/App.css";
import ArticlePage from "./pages/ArticlePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NoEndpointPage from "./pages/NoEndpointPage";
import { useContext } from "react";
import { UserContext } from "./UserContext";

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
                    <Route path="*" element={<NoEndpointPage />} />
                </Routes>
            </UserContext.Provider>
        </>
    );
}

export default App;
