import axiosInstance from "@/axios/instance";
import { SkillsT } from "@/lib/types";
import { useEffect, useState } from "react";
import AddSkills from "./add-skills-form";

const SkillsAdminView = () => {
  const [skills, setSkills] = useState<SkillsT[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get("/api/skills");
        setSkills(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="mt-6">
      <div className="bg-gray-900">
        {skills?.map((item) => (
          <AddSkills skillsId={item?._id} initialData={item} />
        ))}
      </div>
    </div>
  );
};

export default SkillsAdminView;
