import Navbar from "@/components/admin/navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-gray-900 ">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
