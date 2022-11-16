import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Contact() {
  const darkTheme = useSelector((state) => state.darkTheme.value);

  return (
    <>
      <div className="container">
        <h1
          className={darkTheme ? "text-white mt-5 py-5" : "mt-5 py-5"}
          style={{ fontSize: "42px" }}
        >
          Contact Us
        </h1>
        <form className="d-flex flex-column">
          <label
            style={{ fontSize: "24px", color: darkTheme ? "white" : null }}
          >
            Your Email
          </label>
          <input
            placeholder="Your Addres Email"
            className={
              darkTheme
                ? "bg-transparent mb-5 mt-2"
                : "bg-transparent mb-5 mt-2 border-dark"
            }
            style={{
              fontSize: "20px",
              padding: "15px 20px",
              color: darkTheme ? "white" : null,
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          />
          <label
            style={{ fontSize: "24px", color: darkTheme ? "white" : null }}
            placeholder=""
          >
            Your Message
          </label>
          <textarea
            className={
              darkTheme
                ? "bg-transparent mb-5 mt-2"
                : "bg-transparent mb-5 mt-2 border-dark"
            }
            style={{
              fontSize: "20px",
              padding: "15px 20px",
              color: darkTheme ? "white" : null,
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
            placeholder="Your Message"
          />
          <Link to="/Contact/Thanks" className="text-decoration-none">
            <button
              style={{ width: "250px", height: "70px", fontSize: "40px" }}
              className="bg-primary text-white"
            >
              Send
            </button>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Contact;
