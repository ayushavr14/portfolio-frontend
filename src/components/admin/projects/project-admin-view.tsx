import axiosInstance from "@/axios/instance";
import { ProjectT } from "@/lib/types";
import { useEffect, useState } from "react";
import EditProjectModal from "./edit-project-modal";
import AddProjectModal from "./add-project-modal";

type Props = {};
const ProjectAdminView = (props: Props) => {
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
    <div className="h-screen mt-6">
      <AddProjectModal />
      {projects?.map((project) => (
        <div>
          <h1 key={project._id} className="text-white">
            {project.title}
          </h1>
          <EditProjectModal projectId={project._id} initialData={project} />
        </div>
      ))}
    </div>
  );
};

export default ProjectAdminView;
/*
render cards
add edit modal in cards
refetch project api

<EditProjectModal initialData={project}/>

*/
