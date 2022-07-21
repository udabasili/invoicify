import FullScreenLoader from "@/components/FullScreenLoader/FullScreenLoader";
import { clearError } from "@/features/error/reducer/errorSlice";
import { useAuth } from "@/lib/auth";
import { useAppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import protectedRoute from "./private";
import { publicRoutes } from "./public";

export const AppRoutes = () => {

  let location = useLocation();
  const [isLoading, setisLoading] = useState(true)
  const dispatch = useAppDispatch()
  const { loadUser } = useAuth()

  useEffect(() => {
     dispatch(clearError())
     console.log(loadUser)

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location]);

  useEffect(() => {
   (async() => {
    await loadUser()
    setisLoading(false)

   })()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    const { isAuthenticated } = useAuth()
    // const commonRoutes = [{ path: '/', element: <GanttComponent /> }];
    const routes = isAuthenticated ? protectedRoute : publicRoutes;
    const element = useRoutes([ ...routes]);
  
    return <>{
      isLoading ? 
      <FullScreenLoader/>
      :element}
      </>;
  };