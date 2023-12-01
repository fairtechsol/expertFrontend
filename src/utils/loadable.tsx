import { Suspense } from "react";
import Loader from "../components/Loader";
const Loadable = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Loader height={"100vh"} />}>
      <Component {...props} />
    </Suspense>
  );
export default Loadable;
