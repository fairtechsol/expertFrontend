import { memo } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import { AppDispatch } from "../../store/store";
import Header from "./header";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   if (!localStorage.getItem("userToken")) {
  //     navigate("/");
  //   }
  // }, [dispatch]);

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
