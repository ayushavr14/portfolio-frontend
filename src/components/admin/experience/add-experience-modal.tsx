import axiosInstance from "@/axios/instance";
import { Modal, message, Button } from "antd";

import { useState } from "react";
import AddExperienceForm from "./add-experience-form";
import { ExperienceT } from "@/lib/types";

const AddExperienceModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: ExperienceT) => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/api/experiences", data);
      message.success("Experience added successfully");
    } catch (error) {
      console.error("Project addition failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Experiecne
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Add Project"
        destroyOnClose
        footer={false}
      >
        <AddExperienceForm isLoading={isLoading} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default AddExperienceModal;
