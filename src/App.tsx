import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AddSkills from "./components/admin/add-skills";
import Login from "./components/admin/login";
import AdminLayout from "./layout/admin-layout";
import RootLayout from "./layout/layout";
import AdminPanel from "./pages/admin-panel";
import ExperienceAdminView from "./components/admin/experience/experience-admin-view";

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />} />
        <Route element={<AdminLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/add-skills" element={<AddSkills />} />
          <Route path="/admin-experience" element={<ExperienceAdminView />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
