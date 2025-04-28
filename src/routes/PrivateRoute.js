import { Navigate, Outlet } from "react-router-dom";
import useProductStore from "../zustand/store/productStore";

const PrivateRoute = () => {

    const { user } = useProductStore();
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
