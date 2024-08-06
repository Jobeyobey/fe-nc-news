import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppBar from "./components/AppBar";
import "./styles/App.css";
import ArticlePage from "./pages/ArticlePage";

function App() {
    return (
        <>
            <AppBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:article-id" element={<ArticlePage />} />
            </Routes>
        </>
    );
}

export default App;
