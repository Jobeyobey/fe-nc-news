import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("username");
        navigate("/login");
    });
    return <p>Logging out...</p>;
}

export default LogoutPage;
