import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
import { SidebarProvider } from "../context/SidebarContext";
import LayoutContent from "./LayoutContent";

const AppLayout = () => {
    // const { checkAuth } = useAuth();

    // if(!checkAuth()) {
    //     return <Navigate to="/signin" replace />;
    // }

    return (
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
    )
}

export default AppLayout;