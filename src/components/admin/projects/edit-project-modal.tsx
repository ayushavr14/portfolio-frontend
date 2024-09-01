import ProjectForm from "./project-form";
import axiosInstance from "@/axios/instance";
import { ProjectT } from "@/lib/types";
import { Modal, message, Button } from "antd";

import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

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
      await axiosInstance.patch(`/api/projects/${projectId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success("Project updated successfully");
    } catch (error) {
      console.error("Project addition failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="default"
        onClick={() => setIsModalOpen(true)}
        className="bg-transparent hover:bg-transparent"
      >
        <MdModeEdit size={28} className="text-green-500" />
      </Button>
      <Modal
        width="800px"
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
