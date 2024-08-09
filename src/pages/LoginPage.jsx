import { useEffect, useState } from "react";
import "../styles/LoginPage.css";
import { getAllUsers } from "../api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [usernameInput, setUsernameInput] = useState("");
    const [users, setUsers] = useState([]);
    const [isError, setIsError] = useState(false);
    const [successfulLogin, setSuccessfulLogin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("username")) {
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
        setIsError(false);
        const inputName = e.target["username-input"].value;
        if (users.find((user) => user.username === inputName)) {
            localStorage.setItem("username", inputName);
            setSuccessfulLogin(() => true);
        } else {
            setIsError({ msg: "User does not exist. Test Account: grumpy19" });
        }
    }

    return (
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
                    <button type="submit">Login</button>
                </form>
                {isError && <p className="error-text">{isError.msg}</p>}
            </div>
        </section>
    );
}

export default LoginPage;
