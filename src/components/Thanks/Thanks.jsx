import { Link } from "react-router-dom";
function Thanks({darkTheme}) {

    return <div className="container my-5 py-5"><h1 className="py-5" style={{color: darkTheme ? "white" : null,fontSize:"3.5rem"}}>Thanks For The Message</h1>
        <Link to="/" className="text-decoration-none"><p style={{color:"#38CCAE",fontSize:"24px"}}>go back to CryptoCoin</p></Link>
    </div>;
}

export default Thanks;
