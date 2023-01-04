import { Box, Container, Typography, Button } from "@mui/material";

const createGeneralInfoItem = (name: string, buttonName: string) => {
  return (
    <Box display="flex" gap="15px" alignItems="center">
      <Typography color="white">{name}: </Typography>
      <Button
        size="small"
        disabled
        variant="contained"
        sx={{ textTransform: "none" }}
      >
        {buttonName}
      </Button>
    </Box>
  );
};

export default createGeneralInfoItem;
