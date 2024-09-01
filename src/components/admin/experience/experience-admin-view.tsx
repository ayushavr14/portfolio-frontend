import axiosInstance from "@/axios/instance";
import { ExperienceT } from "@/lib/types";
import { useEffect, useState } from "react";

import AddExperienceModal from "./add-experience-modal";
import DeleteExperience from "./delete-experience";
import EditExperienceModal from "./edit-experience-modal";
import ExperienceCard from "./experience-card";
import socket from "@/socket/socket";

const ExperienceAdminView = () => {
  const [experience, setExperience] = useState<ExperienceT[] | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axiosInstance.get<ExperienceT[]>(
          "/api/experiences"
        );
        setExperience(response?.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();

    socket.on("experience-created", (newExperience: ExperienceT) => {
      setExperience((prevExperiences) => {
        const experiencesArray = prevExperiences ?? [];
        return [newExperience, ...experiencesArray];
      });
    });

    socket.on("experience-updated", (updatedExperience: ExperienceT) => {
      setExperience((prevExperiences: any) =>
        prevExperiences.map((experience: any) =>
          experience._id === updatedExperience._id
            ? updatedExperience
            : experience
        )
      );
    });

    socket.on("experience-deleted", (deletedExperienceId: string) => {
      setExperience((prevExperiences: any) =>
        prevExperiences.filter(
          (experience: any) => experience._id !== deletedExperienceId
        )
      );
    });

    return () => {
      socket.off("experience-created");
      socket.off("experience-updated");
      socket.off("experience-deleted");
    };
  }, []);

  return (
    <div className="mt-6 min-h-screen p-2">
      <AddExperienceModal />
      <div className="flex flex-wrap gap-6 p-2">
        {experience?.map((item) => (
          <div key={item._id}>
            <div className="flex flex-wrap gap-6 p-6">
              <ExperienceCard experience={item} />
              <div className="flex gap-x-4">
                {experience.length > 1 && (
                  <>
                    <EditExperienceModal
                      projectId={item?._id}
                      initialData={item}
                    />
                    <DeleteExperience projectId={item._id} />
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceAdminView;
