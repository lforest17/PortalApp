import { Typography } from "@mui/material";
import Flex from "./Flex";

const Footer = () => {
  return (
    <Flex py={1} alignItems="center" flexDirection="column">
      <Typography>Contact Us: +65 8888 8888</Typography>
      <Typography variant="body2" color="#777">
        Copyright © {`${new Date().getFullYear()} | My Portal App`}
      </Typography>
    </Flex>
  );
};

export default Footer;
