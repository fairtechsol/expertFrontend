import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import BackgroundLayout from "../../components/Common/BackgroundLayout";

const MainLayout = () => {
  return (
    <>
      <Header />
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
    </>
  );
};

export default memo(MainLayout);
