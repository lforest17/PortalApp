import { Box, Button, Container, Typography } from "@mui/material";
import { logout } from "actions/auth";
import Flex from "components/Flex";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ tabs }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <Box bgcolor="primary.main" p={2}>
      <Container>
        <Flex justifyContent="space-between">
          <Flex
            component={Link}
            to="/"
            alignItems="center"
            gap={2}
            width="fit-content"
          >
            <Box width={40} component="img" src="images/logo.svg" />
            <Typography variant="h2" color="#fff">
              My Portal
            </Typography>
          </Flex>

          <Flex gap={3}>
            {tabs?.map((item) => {
              return (
                <Flex
                  key={item.title}
                  component={Link}
                  to={item.link}
                  alignItems="center"
                  width="fit-content"
                >
                  <Typography color="#fff">{item.title}</Typography>
                </Flex>
              );
            })}

            {isLoggedIn ? (
              <Flex
                component={Button}
                onClick={logOut}
                textTransform="none"
                alignItems="center"
                width="fit-content"
              >
                <Typography color="#fff">Logout</Typography>
              </Flex>
            ) : (
              <Flex
                component={Link}
                to="/login"
                textTransform="none"
                alignItems="center"
                width="fit-content"
              >
                <Typography color="#fff">Login</Typography>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
