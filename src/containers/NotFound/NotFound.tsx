import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap="1rem"
    >
      <Typography variant="h4" color="#6c757d">
        Error 404
      </Typography>
      <Typography
        variant="h3"
        fontWeight="500"
        color="white"
        textAlign="center"
      >
        OOPS WE COULDNT FIND THE PAGE
      </Typography>
      <Typography
        variant="h6"
        fontWeight="500"
        color="#6c757d"
        maxWidth="550px"
        textAlign="center"
      >
        We couldn't fint the page you were looking for, or maybe it never
        existed, Try heading back to the home page.
      </Typography>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="contained">Back Home</Button>
      </Link>
    </Box>
  );
};

export default NotFound;
