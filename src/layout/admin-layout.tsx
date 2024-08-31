import Navbar from "@/components/admin/navbar";
import AntThemeProvider from "@/providers/ant-theme-provider";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <AntThemeProvider>
      <div className="bg-gray-900 ">
        <Navbar />
        <Outlet />
      </div>
    </AntThemeProvider>
  );
};

export default AdminLayout;
