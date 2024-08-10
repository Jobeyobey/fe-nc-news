import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import AppBar from "../components/AppBar";

function LogoutPage() {
    const navigate = useNavigate();
    useContext(UserContext).setUser(null);
    useEffect(() => {
        localStorage.removeItem("username");
        navigate("/login");
    });
    return (
        <>
            <AppBar />

            <p>Logging out...</p>
        </>
    );
}

export default LogoutPage;
