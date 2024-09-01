import axiosInstance from "@/axios/instance";
import { ProjectT } from "@/lib/types";
import { useEffect, useState } from "react";
import AddProjectModal from "./add-project-modal";
import DeleteProject from "./delete-project";
import EditProjectModal from "./edit-project-modal";
import ProjectCard from "./ProjectCard";

const ProjectAdminView = () => {
  const [projects, setProjects] = useState<ProjectT[] | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosInstance.get("/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="mt-6">
      <AddProjectModal />
      <div className="flex flex-wrap gap-6 p-2">
        {projects?.map((item) => (
          <div key={item._id} className="flex flex-wrap gap-6 p-6">
            <ProjectCard project={item} />
            <EditProjectModal projectId={item._id} initialData={item} />
            <DeleteProject projectId={item._id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAdminView;
