import React, { useEffect, useState } from "react";
import axiosInstance from "@/axios/instance";
import { ProjectT as ProjectType } from "@/lib/types";
import socket from "@/socket/socket";
import Project from "./project";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

export default function Projects() {
  const { ref } = useSectionInView("Projects", 0.5);

  const [projectsData, setProjectsData] = useState<ProjectType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [technologyFilter, setTechnologyFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [availableTechnologies, setAvailableTechnologies] = useState<string[]>(
    []
  );

  const fetchProjects = async (
    search?: string,
    technology?: string,
    status?: string
  ) => {
    try {
      const response = await axiosInstance.get<ProjectType[]>("/api/projects", {
        params: {
          search: search ?? searchQuery,
          technology: technology ?? technologyFilter,
          status: status ?? statusFilter,
        },
      });

      const projects = response.data;
      setProjectsData(projects);

      const technologiesSet = new Set<string>();
      projects.forEach((project) => {
        project.technologies.forEach((tech) => technologiesSet.add(tech));
      });

      setAvailableTechnologies(Array.from(technologiesSet));
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProjects(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    fetchProjects();
  }, [technologyFilter, statusFilter]);

  useEffect(() => {
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
      socket.off("project-created");
      socket.off("project-updated");
      socket.off("project-deleted");
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTechnologyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTechnologyFilter(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setTechnologyFilter("");
    setStatusFilter("");
  };

  return (
    <section ref={ref} id="projects" className="scroll-mt-28 mb-28">
      <SectionHeading>My projects</SectionHeading>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border p-2 rounded-md text-black w-full md:w-auto"
        />

        <select
          value={technologyFilter}
          onChange={handleTechnologyChange}
          className="border p-2 rounded-md text-black w-full md:w-auto"
        >
          <option value="">All Technologies</option>
          {availableTechnologies.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="border p-2 rounded-md text-black w-full md:w-auto"
        >
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="In progress">In progress</option>
        </select>

        <button
          onClick={clearFilters}
          className="mt-2 md:mt-0 p-2 bg-gray-500 text-white rounded-md w-full md:w-auto"
        >
          Clear Filters
        </button>
      </div>

      <div>
        {projectsData?.length === 0 && (
          <SectionHeading>No projects</SectionHeading>
        )}
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
