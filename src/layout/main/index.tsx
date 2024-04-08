import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import BackgroundLayout from "../../components/Common/BackgroundLayout";
import { getProfile } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import Header from "./header";
import { socketService } from "../../socketManager";

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    try {
      if (!sessionStorage.getItem("userToken")) {
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
      if (sessionStorage.getItem("userToken")) {
        socketService.connect();
        socketService.auth.logout();
      }
    } catch (e) {
      console.log(e);
    }
    return () => {
      try {
        socketService.disconnect();
      } catch (e) {
        console.log(e);
      }
    };
  }, [sessionStorage.getItem("userToken")]);

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
