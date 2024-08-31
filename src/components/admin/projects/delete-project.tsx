import axiosInstance from "@/axios/instance";
import { Button, message } from "antd";
import React from "react";
import { MdDelete } from "react-icons/md";

interface DeleteProjectProps {
  projectId: string;
}

const DeleteProject: React.FC<DeleteProjectProps> = ({ projectId }) => {
  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(`/api/projects/${projectId}`);
      message.success(res.data.msg);
    } catch (error) {
      console.error(error);
      message.error("Failed to delete the project.");
    }
  };

  return (
    <Button onClick={handleDelete} className="bg-transparent ">
      <MdDelete size={28} className="text-red-500" />
    </Button>
  );
};

export default DeleteProject;
