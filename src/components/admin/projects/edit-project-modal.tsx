import ProjectForm from "./project-form";
import axiosInstance from "@/axios/instance";
import { ProjectT } from "@/lib/types";
import { Modal, message, Button } from "antd";

import { useState } from "react";

const EditProjectModal = ({
  projectId,
  initialData,
}: {
  projectId: string;
  initialData: ProjectT;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.patch(
        `/api/projects/${projectId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      message.success(res.data?.msg);
    } catch (error) {
      console.error("Project addition failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Edit Project
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Edit Project"
        destroyOnClose
        footer={false}
      >
        <ProjectForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          initialData={initialData}
        />
      </Modal>
    </>
  );
};

export default EditProjectModal;
