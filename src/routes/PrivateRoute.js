import { Navigate, Outlet } from "react-router-dom";
import useProductStore from "../zustand/store/productStore";

const PrivateRoute = () => {

    const { user } = useProductStore();
    // const isAuthenticated = user || localStorage.getItem("token");
    // return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
    return <Outlet />;
};

export default PrivateRoute;
