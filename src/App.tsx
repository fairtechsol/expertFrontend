import { RouterProvider } from "react-router-dom";
import routes from "./routes";

function App() {
  if (process.env.NODE_ENV === "production") console.log = () => {};
  return <RouterProvider router={routes()} />;
}

export default App;
