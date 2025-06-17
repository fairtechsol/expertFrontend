import { RouterProvider } from "react-router-dom";
import routes from "./routes";

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://4eb9d3f5798c43db43e9c9e08bcbbda2@o4509513401106432.ingest.us.sentry.io/4509513415983104",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

function App() {
  if (process.env.NODE_ENV === "production") console.log = () => { };
  return (
    <Sentry.ErrorBoundary fallback={<p>Something went wrong</p>} showDialog>
      <RouterProvider router={routes()} future={{ v7_startTransition: true }} />
    </Sentry.ErrorBoundary>
  );
}

export default App;
