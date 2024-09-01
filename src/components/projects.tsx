// src/Projects.tsx
import axiosInstance from "@/axios/instance";
import { ProjectT as ProjectType } from "@/lib/types";
import socket from "@/socket/socket";
import React, { useEffect, useState } from "react";
import { useSectionInView } from "../lib/hooks";
import Project from "./project";
import SectionHeading from "./section-heading";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);
  const [projectsData, setProjectsData] = useState<ProjectType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get<ProjectType[]>(
          "/api/projects"
        );
        setProjectsData(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();

    socket.on("project-created", (newProject: ProjectType) => {
      setProjectsData((prevProjects) => [...prevProjects, newProject]);
    });

    socket.on("project-updated", (updatedProject: ProjectType) => {
      setProjectsData((prevProjects) =>
        prevProjects.map((project) =>
          project._id === updatedProject._id ? updatedProject : project
        )
      );
    });

    socket.on("project-deleted", (deletedProjectId: string) => {
      setProjectsData((prevProjects) =>
        prevProjects.filter((project) => project._id !== deletedProjectId)
      );
    });

    return () => {
      socket.off("project-added");
      socket.off("project-updated");
      socket.off("project-deleted");
    };
  }, []);

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>
      <div>
        {projectsData?.map((project) => (
          <React.Fragment key={project._id}>
            <Project
              sourceCodeLink={project?.sourceCodeLink}
              demoLink={project?.demoLink}
              technologies={project.technologies}
              image={project?.image}
              description={project.description}
              title={project.title}
            />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
