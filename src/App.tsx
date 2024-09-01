import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ExperienceAdminView from "./components/admin/experience/experience-admin-view";
import Login from "./components/admin/login";
import SkillsAdminView from "./components/admin/skills/add-skills";
import AdminProfile from "./components/admin/user-details/admin-profile-edit";
import AdminLayout from "./layout/admin-layout";
import RootLayout from "./layout/layout";
import AdminPanel from "./pages/admin-panel";

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
          <Route path="/add-skills" element={<SkillsAdminView />} />
          <Route path="/admin-experience" element={<ExperienceAdminView />} />
          <Route path="/admin-user-details" element={<AdminProfile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
