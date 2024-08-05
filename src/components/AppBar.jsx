import { Link } from "react-router-dom";
import "../styles/AppBar.css";

function AppBar() {
    return (
        <navbar>
            <div className="buttons-container">
                <Link className="nav-logo">Logo</Link>
                <div>
                    <Link className="nav-button">Create</Link>
                    <Link className="nav-button">Logout</Link>
                </div>
            </div>
        </navbar>
    );
}

export default AppBar;
