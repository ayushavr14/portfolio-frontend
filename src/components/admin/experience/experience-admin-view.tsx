import axiosInstance from "@/axios/instance";
import { ExperienceT } from "@/lib/types";
import { useEffect, useState } from "react";

import AddExperienceModal from "./add-experience-modal";
import DeleteExperience from "./delete-experience";
import EditExperienceModal from "./edit-experience-modal";
import ExperienceCard from "./experience-card";

const ExperienceAdminView = () => {
  const [experience, setExperience] = useState<ExperienceT[] | null>(null);
  console.log(experience);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get("/api/experiences");
        setExperience(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="mt-6 min-h-screen">
      <AddExperienceModal />
      <div className="flex flex-wrap gap-6 p-2">
        {experience?.map((item) => (
          <>
            <div key={item._id} className="flex flex-wrap gap-6 p-6">
              <ExperienceCard experience={item} />
            </div>
            <EditExperienceModal projectId={item._id} initialData={item} />
            <DeleteExperience projectId={item._id} />
          </>
        ))}
      </div>
    </div>
  );
};

export default ExperienceAdminView;
