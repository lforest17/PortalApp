import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import { ThemeProvider } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ErrorBoundary } from "features/error/ErrorBoundary";
import theme from "layouts/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "routes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <AppRouter />
          <ToastContainer />
        </GoogleOAuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
