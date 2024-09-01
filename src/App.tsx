import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ExperienceAdminView from "./components/admin/experience/experience-admin-view";
import Login from "./components/admin/login";
import SkillsAdminView from "./components/admin/skills/add-skills";
import AdminProfile from "./components/admin/user-details/admin-profile-edit";
import AdminLayout from "./layout/admin-layout";
import RootLayout from "./layout/layout";
import AdminPanel from "./pages/admin-panel";
import AntThemeProvider from "./providers/ant-theme-provider";

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);
  return (
    <>
      <AntThemeProvider>
        <Routes>
          <Route path="/" element={<RootLayout />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AdminLayout />}>
            <Route path="/admin-project" element={<AdminPanel />} />
            <Route path="/admin-skills" element={<SkillsAdminView />} />
            <Route path="/admin-experience" element={<ExperienceAdminView />} />
            <Route path="/admin-user-details" element={<AdminProfile />} />
          </Route>
        </Routes>
      </AntThemeProvider>
    </>
  );
};

export default App;
