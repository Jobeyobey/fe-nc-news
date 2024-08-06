import { Link } from "react-router-dom";
import "../styles/AppBar.css";

function AppBar() {
    return (
        <nav>
            <div className="buttons-container">
                <Link to="/" className="nav-logo">
                    Logo
                </Link>
                <div>
                    <Link className="nav-button">Create</Link>
                    <Link className="nav-button">Logout</Link>
                </div>
            </div>
        </nav>
    );
}

export default AppBar;
