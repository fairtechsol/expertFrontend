// import { Suspense } from "react";
// import Loader from "../components/Loader";
// const Loadable = (Component: any) => (props: any) =>
//   (
//     <Suspense fallback={<Loader height={"100vh"} />}>
//       <Component {...props} />
//     </Suspense>
//   );
// export default Loadable;

import { lazy, Suspense } from "react";
import Loader from "../components/Loader";

const Loadable = (importFunc: any) => {
  const LazyComponent = lazy(() =>
    importFunc().catch((error: any) => {
      console.error("Dynamic import failed:", error);
      // Handle the error, e.g., show an error message
      window.location.reload();
      throw error;
    })
  );

  return (props: any) => (
    <Suspense fallback={<Loader height={"100vh"} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default Loadable;
