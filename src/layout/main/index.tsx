import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header1 from "./header1";
import BackgroundLayout from "../../components/Common/BackgroundLayout";

const MainLayout = () => {
  return (
    <>
      <Header1 />
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
    </>
  );
};

export default memo(MainLayout);
