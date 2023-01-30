import { Box } from "@mui/material";
import { forwardRef } from "react";

const Flex = forwardRef((props, ref) => (
  <Box ref={ref} display="flex" {...props} />
));

export default Flex;
