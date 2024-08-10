import { Link } from "react-router-dom";
import "../styles/AppBar.css";
import { useContext } from "react";
import { UserContext } from "../UserContext";

function AppBar() {
    const user = useContext(UserContext).user;

    return (
        <nav>
            <div className="buttons-container">
                <Link to="/" className="nav-logo">
                    Logo
                </Link>
                <div>
                    {user ? (
                        <>
                            <Link className="nav-button" to="/article/post">
                                Create
                            </Link>
                            <Link className="nav-button" to="/logout">
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link className="nav-button" to="/login">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default AppBar;
