import { Box, Container } from "@mui/material";
import Footer from "components/Footer";
import Header from "components/Header";

const TABS = [
  {
    title: "About us",
    link: "/about-us",
  },
  {
    title: "Careers",
    link: "/careers",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];

const PublicLayout = ({ children }) => {
  return (
    <Box>
      <Header tabs={TABS} />
      <Container>{children}</Container>
      <Footer />
    </Box>
  );
};

export default PublicLayout;
