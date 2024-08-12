import { useContext, useEffect, useState } from "react";
import "../styles/LoginPage.css";
import { getAllUsers } from "../api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import AppBar from "../components/AppBar";

function LoginPage() {
    const [usernameInput, setUsernameInput] = useState("grumpy19");
    const [users, setUsers] = useState([]);
    const [error, setError] = useState({});
    const [successfulLogin, setSuccessfulLogin] = useState(false);

    const navigate = useNavigate();
    const user = useContext(UserContext);

    useEffect(() => {
        if (user.user) {
            navigate("/");
        }

        getAllUsers().then((response) => {
            setUsers(response);
        });
    }, [successfulLogin]);

    function handleChange(e) {
        setUsernameInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError({});
        const inputName = e.target["username-input"].value;
        if (users.find((user) => user.username === inputName)) {
            localStorage.setItem("username", inputName);
            user.setUser(inputName);
            setSuccessfulLogin(true);
        } else {
            setError({ msg: "User does not exist. Test Account: grumpy19" });
        }
    }

    return (
        <>
            <AppBar />
            <section className="page-container">
                <div className="login-container">
                    <h1>Login</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input
                            id="username-input"
                            name="username-input"
                            placeholder="Username"
                            value={usernameInput}
                            onChange={handleChange}
                            autoComplete="off"
                        ></input>
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                    </form>
                    {Object.keys(error).length > 0 && (
                        <p className="error-text">{error.msg}</p>
                    )}
                </div>
                <div className="login-explanation">
                    <p className="user-list-title">Available users</p>
                    <ul>
                        <li>grumpy19</li>
                        <li>tickle122</li>
                        <li>happyamy2016</li>
                        <li>cooljmessy</li>
                        <li>weegembump</li>
                        <li>jessjelly</li>
                    </ul>
                    <p className="explanation-title">
                        <strong>User Authentication</strong>
                    </p>
                    <p className="explanation-text">
                        User authentication was outside of the scope of this
                        project, however if you'd like to see a project where I
                        did implement it, check out{" "}
                        <span>
                            <a
                                href="https://github.com/Jobeyobey/the-boardgame-companion"
                                target="_blank"
                            >
                                The Boardgame Companion
                            </a>
                        </span>
                        !
                    </p>
                </div>
            </section>
        </>
    );
}

export default LoginPage;
