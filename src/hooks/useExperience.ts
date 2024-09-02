import { useEffect, useState } from "react";
import axiosInstance from "@/axios/instance";
import socket from "@/socket/socket";
import { ExperienceT } from "@/lib/types"; // Adjust the path as needed

const useExperiences = () => {
  const [experiencesData, setExperiencesData] = useState<ExperienceT[]>([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await axiosInstance.get<ExperienceT[]>(
          "/api/experiences"
        );
        setExperiencesData(response.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();

    const handleExperienceCreated = (newExperience: ExperienceT) => {
      setExperiencesData((prevExperiences) => [
        newExperience,
        ...prevExperiences,
      ]);
    };

    const handleExperienceUpdated = (updatedExperience: ExperienceT) => {
      setExperiencesData((prevExperiences) =>
        prevExperiences.map((experience) =>
          experience._id === updatedExperience._id
            ? updatedExperience
            : experience
        )
      );
    };

    const handleExperienceDeleted = (deletedExperienceId: string) => {
      setExperiencesData((prevExperiences) =>
        prevExperiences.filter(
          (experience) => experience._id !== deletedExperienceId
        )
      );
    };

    socket.on("experience-created", handleExperienceCreated);
    socket.on("experience-updated", handleExperienceUpdated);
    socket.on("experience-deleted", handleExperienceDeleted);

    return () => {
      socket.off("experience-created", handleExperienceCreated);
      socket.off("experience-updated", handleExperienceUpdated);
      socket.off("experience-deleted", handleExperienceDeleted);
    };
  }, []);

  return experiencesData;
};

export default useExperiences;
