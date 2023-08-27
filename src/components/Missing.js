import { Link, useNavigate } from "react-router-dom"

const Missing = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                <Link to="/">Visit Our Homepage</Link>
            </div>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </article>
    )
}

export default Missing
