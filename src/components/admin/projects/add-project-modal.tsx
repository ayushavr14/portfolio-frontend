import ProjectForm from "./project-form";
import axiosInstance from "@/axios/instance";
import { Modal, message, Button } from "antd";

import { useState } from "react";

const AddProjectModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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
        Add Project
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Add Project"
        destroyOnClose
        footer={false}
      >
        <ProjectForm isLoading={isLoading} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default AddProjectModal;
