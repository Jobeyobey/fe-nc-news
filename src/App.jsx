import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AppBar from "./components/AppBar";
import "./styles/App.css";

function App() {
    return (
        <>
            <AppBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </>
    );
}

export default App;
