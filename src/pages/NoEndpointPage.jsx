import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AppBar from "../components/AppBar";

function NoEndpointPage() {
    const [params, setParams] = useSearchParams();
    const [error, setError] = useState({
        status: 404,
        msg: "Sorry! We can't find what you were looking for",
    });
    useState(() => {
        if (params.get("error") === "article-not-found") {
            setError({
                status: 404,
                msg: "Sorry! That article doesn't appear to exist",
            });
        } else if (params.get("error") === "topic-not-found") {
            setError({
                status: 404,
                msg: "Sorry! We don't have anything relating to that topic",
            });
        }
    }, []);

    return (
        <>
            <AppBar />
            <div className="page-container">
                <h1>Error {error.status}</h1>
                <p>{error.msg}</p>
                <Link to="/">Let's get you home</Link>
            </div>
        </>
    );
}

export default NoEndpointPage;
