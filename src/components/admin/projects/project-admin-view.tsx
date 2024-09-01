import axiosInstance from "@/axios/instance";
import { ProjectT } from "@/lib/types";
import { useEffect, useState } from "react";
import AddProjectModal from "./add-project-modal";
import DeleteProject from "./delete-project";
import EditProjectModal from "./edit-project-modal";
import ProjectCard from "./ProjectCard";
import socket from "@/socket/socket";

const ProjectAdminView = () => {
  const [projects, setProjects] = useState<ProjectT[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get<ProjectT[]>("/api/projects");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();

    socket.on("project-created", (newProject: ProjectT) => {
      setProjects((prevProjects) => [...prevProjects, newProject]);
    });

    socket.on("project-updated", (updatedProject: ProjectT) => {
      setProjects((prevProjects: any) =>
        prevProjects.map((project: any) =>
          project._id === updatedProject._id ? updatedProject : project
        )
      );
    });

    socket.on("project-deleted", (deletedProjectId: string) => {
      setProjects((prevProjects: any) =>
        prevProjects.filter((project: any) => project._id !== deletedProjectId)
      );
    });

    return () => {
      socket.off("project-created");
      socket.off("project-updated");
      socket.off("project-deleted");
    };
  }, []);

  return (
    <div className="mt-6 min-h-screen p-2">
      <AddProjectModal />
      <div className="flex flex-wrap gap-6 p-2">
        {projects?.map((item) => (
          <div key={item._id} className="flex flex-wrap gap-6 p-6">
            <ProjectCard project={item} />
            {projects?.length > 1 && (
              <>
                <EditProjectModal projectId={item._id} initialData={item} />
                <DeleteProject projectId={item._id} />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAdminView;
