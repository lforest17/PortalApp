import { Box, Container } from "@mui/material";
import Footer from "components/Footer";
import Header from "components/Header";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TABS = [
  {
    title: "Home",
    link: "/home",
  },
  {
    title: "Portfolio",
    link: "/portfolio",
  },
  {
    title: "Submit claim",
    link: "/claim",
  },
];

const ProtectedLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isLoggedIn]);

  return (
    <Box>
      <Header tabs={TABS} />
      <Container> {children}</Container>
      <Footer />
    </Box>
  );
};

export default ProtectedLayout;
