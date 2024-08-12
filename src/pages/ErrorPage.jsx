import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AppBar from "../components/AppBar";
import "../styles/ErrorPage.css";
import Lottie from "lottie-react";
import noEndpointAnimation from "../../images/404.json";

function ErrorPage() {
    const [params, setParams] = useSearchParams();
    const [error, setError] = useState({
        status: 404,
        msg: "Sorry! We can't find what you were looking for.",
        animation: { noEndpointAnimation },
    });
    useState(() => {
        if (params.get("error") === "article-not-found") {
            setError({
                status: 404,
                msg: "Sorry! That article doesn't appear to exist.",
                animation: { noEndpointAnimation },
            });
        } else if (params.get("error") === "topic-not-found") {
            setError({
                status: 404,
                msg: "Sorry! We don't have anything relating to that topic.",
                animation: { noEndpointAnimation },
            });
        }
    }, []);

    return (
        <>
            <AppBar />
            <div className="page-container">
                {/* <h1 className="error-page-title">Error {error.status}</h1> */}
                <Lottie animationData={noEndpointAnimation} loop={true} />
                <p>{error.msg}</p>
                <Link to="/" className="submit-btn link-home">
                    Let's get you home
                </Link>
            </div>
        </>
    );
}

export default ErrorPage;
