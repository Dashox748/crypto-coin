import { Link } from "react-router-dom";

function NotFound({darkTheme}) {
  return (
    <div
      className="d-flex flex-column mx-auto gap-3
    my-5 p-5"
    >
        <h3 className="mx-auto text-muted">Error 404</h3>
        <h1 className="mx-auto text-center" style={{fontSize:"50px",color:darkTheme?"white":null}}>OOPS WE COULDNT FIND THE PAGE</h1>
        <p className="mx-auto fs-5 text-muted text-center" style={{maxWidth:"550px"}}>We couldn't fint the page you were looking for, or maybe it never existed, Try heading back to the home page.</p>
      <Link to="/" className="text-decoration-none mx-auto"><button className="mx-auto bg-primary border-0 px-4 py-2 rounded-3 text-white">BACK HOME</button></Link>
    </div>
  );
}

export default NotFound;
