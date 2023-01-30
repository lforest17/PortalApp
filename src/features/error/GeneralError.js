import { Box, Button, Container, Typography } from "@mui/material";
import Flex from "components/Flex";

const GeneralError = ({ type = "default" }) => {
  const config = {
    404: {
      title: "404: Not Found",
      showTryAgainButton: false,
    },
    403: {
      title: "403: Forbidden",
      showTryAgainButton: false,
    },
    default: {
      title: "Something went wrong",
      showTryAgainButton: true,
    },
  };
  return (
    <Container>
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Box>
          <Typography variant="h2">{config[type]?.title}</Typography>
          <Typography mb={10}>
            The page you are looking for has a technical issue
          </Typography>

          {config[type]?.showTryAgainButton && (
            <Typography mb={3}>Do you want to?</Typography>
          )}

          <Flex gap={3} justifyContent="center" alignItems="center">
            {config[type]?.showTryAgainButton && (
              <Button
                variant="outlined"
                onClick={() => window.location.reload()}
                fullWidth
              >
                Try again
              </Button>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={() => window.location.assign("/")}
            >
              Go Home
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default GeneralError;
