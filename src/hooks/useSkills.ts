import { useEffect, useState } from "react";
import axiosInstance from "@/axios/instance";
import socket from "@/socket/socket";
import { SkillsT } from "@/lib/types";

const useSkills = () => {
  const [skillsData, setSkillsData] = useState<SkillsT[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axiosInstance.get<SkillsT[]>("/api/skills");
        setSkillsData(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchSkills();

    const handleSkillAdded = (newSkill: SkillsT) => {
      setSkillsData((prevSkills) => [...prevSkills, newSkill]);
    };

    const handleSkillUpdated = (updatedSkill: SkillsT) => {
      setSkillsData((prevSkills) =>
        prevSkills.map((skill) =>
          skill._id === updatedSkill._id ? updatedSkill : skill
        )
      );
    };

    const handleSkillDeleted = (deletedSkillId: string) => {
      setSkillsData((prevSkills) =>
        prevSkills.filter((skill) => skill._id !== deletedSkillId)
      );
    };

    socket.on("skill-added", handleSkillAdded);
    socket.on("skill-updated", handleSkillUpdated);
    socket.on("skill-deleted", handleSkillDeleted);

    return () => {
      socket.off("skill-added", handleSkillAdded);
      socket.off("skill-updated", handleSkillUpdated);
      socket.off("skill-deleted", handleSkillDeleted);
    };
  }, []);

  return skillsData;
};

export default useSkills;
