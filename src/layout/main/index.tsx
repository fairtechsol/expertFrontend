import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import ScrollToTop from "../../components/Common/ScrollToTop";
import { socketService } from "../../socketManager";
import { getProfile } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import Header from "./header";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("jwtExpert")) {
        navigate("/expert/login");
        sessionStorage.clear();
      } else {
        dispatch(getProfile());
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("jwtExpert")) {
        socketService.connect();
        socketService.auth.logout();
      }
      return () => {
        socketService.disconnect();
      };
    } catch (e) {
      console.log(e);
    }
  }, [sessionStorage.getItem("jwtExpert")]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <BackgroundLayout>
        <Outlet />
      </BackgroundLayout>
    </>
  );
};

export default memo(MainLayout);
