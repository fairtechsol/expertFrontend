import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import ErrorBoundary from "./helpers/errorBoundry.tsx";
import "./index.css";
import store from "./store/store.tsx";
import theme from "./theme/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <Provider store={store}>
      <ToastContainer
        style={{
          fontSize: "14px",
        }}
        stacked
      />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>
);
