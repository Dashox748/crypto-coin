import { Button, Container } from "@mui/material";
import TextField from "@mui/material/TextField";

const Contact = () => {
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField placeholder="Your Addres Email" fullWidth />
      <TextField placeholder="Your Message" rows={4} fullWidth multiline />
      <Button variant="contained" size="large">
        Send
      </Button>
    </Container>
  );
};

export default Contact;
