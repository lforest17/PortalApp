import { CircularProgress } from "@mui/material";
import Flex from "components/Flex";

const Loader = () => (
  <Flex height="100%" width="100%">
    <CircularProgress color="secondary" />
  </Flex>
);

export default Loader;
