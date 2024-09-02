import { ProjectT } from "@/lib/types";
import React from "react";

interface ProjectCardProps {
  project: ProjectT;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
}: ProjectCardProps) => {
  return (
    <div className="max-w-md rounded overflow-hidden shadow-lg bg-white border border-gray-200 cursor-pointer w-[300px]">
      <img
        className="w-full h-20 object-cover p-2"
        src={project.image[0]}
        alt={project.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-900">
          {project.title}
        </div>
        <p className="text-gray-700 text-base mb-4 line-clamp-5">
          {project.description}
        </p>
        <div className="mb-4">
          <span className="inline-block bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
            {project.tag}
          </span>
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded ${
              project.status === "Completed"
                ? "bg-green-200 text-green-800"
                : "bg-yellow-200 text-yellow-800"
            }`}
          >
            {project.status}
          </span>
        </div>
        <div className="text-sm text-gray-700 mb-4">
          <p className="font-semibold mb-2">Technologies:</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 pt-2 pb-3 flex justify-between items-center gap-x-4">
        <a
          href={project.demoLink}
          className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo
        </a>
        <a
          href={project.sourceCodeLink}
          className="bg-gray-500 text-white font-semibold py-1 px-2 rounded hover:bg-gray-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
