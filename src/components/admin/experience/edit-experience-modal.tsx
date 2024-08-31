import axiosInstance from "@/axios/instance";
import { ExperienceT } from "@/lib/types";
import { Button, Modal, message } from "antd";

import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import AddExperienceForm from "./add-experience-form";

const EditExperienceModal = ({
  projectId,
  initialData,
}: {
  projectId: string;
  initialData: ExperienceT;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (data: ExperienceT) => {
    try {
      setIsLoading(true);
      const res = await axiosInstance.patch(
        `/api/experiences/${projectId}`,
        data
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
      <Button
        type="default"
        onClick={() => setIsModalOpen(true)}
        className="bg-transparent hover:bg-transparent"
      >
        <MdModeEdit size={28} className="text-green-500" />
      </Button>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        title="Edit Experience"
        destroyOnClose
        footer={false}
      >
        <AddExperienceForm
          isLoading={isLoading}
          onSubmit={handleSubmit}
          initialData={initialData}
        />
      </Modal>
    </>
  );
};

export default EditExperienceModal;
