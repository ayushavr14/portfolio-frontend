import { ExperienceT } from "@/lib/types";
import React from "react";

interface ExperienceCardProps {
  experience: ExperienceT;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  const startDateYear = new Date(experience?.startDate).getFullYear();
  const endDateYear = new Date(experience?.endDate).getFullYear();

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-md border border-gray-200 mb-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {experience.title}
        </h3>
        <p className="text-sm text-gray-600">{experience.company}</p>
      </div>
      <p className="text-gray-700 mb-4">{experience.description}</p>
      <p className="text-sm text-gray-500">Started: {startDateYear}</p>
      {experience?.endDate && (
        <p className="text-sm text-gray-500">Started: {endDateYear}</p>
      )}
    </div>
  );
};

export default ExperienceCard;
