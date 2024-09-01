import axiosInstance from "@/axios/instance";
import { SkillsT } from "@/lib/types";
import { useEffect, useState } from "react";
import AddSkills from "./add-skills-form";
import socket from "@/socket/socket";

const SkillsAdminView = () => {
  const [skills, setSkills] = useState<SkillsT[] | null>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axiosInstance.get<SkillsT[]>("/api/skills");
        setSkills(response.data || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();

    socket.on("skill-added", (newSkill: SkillsT) => {
      setSkills((prevSkills) => [...(prevSkills || []), newSkill]);
    });

    socket.on("skill-updated", (updatedSkill: SkillsT) => {
      setSkills((prevSkills: any) =>
        prevSkills.map((skill: any) =>
          skill._id === updatedSkill._id ? updatedSkill : skill
        )
      );
    });

    socket.on("skill-deleted", (deletedSkillId: string) => {
      setSkills((prevSkills: any) =>
        prevSkills.filter((skill: any) => skill._id !== deletedSkillId)
      );
    });

    return () => {
      socket.off("skill-added");
      socket.off("skill-updated");
      socket.off("skill-deleted");
    };
  }, []);

  return (
    <div className="mt-6">
      <div className="bg-gray-900">
        {skills?.map((item) => (
          <div key={item._id}>
            <AddSkills skillsId={item?._id} initialData={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsAdminView;
