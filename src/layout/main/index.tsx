import { memo, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/");
    }
  }, [dispatch]);

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
