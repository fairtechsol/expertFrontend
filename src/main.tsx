import { ThemeProvider } from "@mui/material/styles";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme/index.tsx";
import { Provider } from "react-redux";
import store from "./store/store.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ToastContainer />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
