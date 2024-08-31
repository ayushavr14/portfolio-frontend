import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AddProject from "./components/admin/add-project";
import Login from "./components/admin/login";
import AdminLayout from "./layout/admin-layout";
import RootLayout from "./layout/layout";
import AddSkills from "./components/admin/add-skills";
import AddExperience from "./components/admin/add-experience";

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
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/add-skills" element={<AddSkills />} />
          <Route path="/add-experience" element={<AddExperience />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
