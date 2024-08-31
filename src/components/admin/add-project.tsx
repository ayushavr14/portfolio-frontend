import axiosInstance from "@/axios/instance";
import { NormFileEventT } from "@/lib/types";
import { Button, Form, Input, message, Upload } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import Wrapper from "../Wrapper";
import { useState } from "react";

const AddProject = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const { image, technologies, ...restData } = data;
      const formData = new FormData();

      Object.keys(restData).forEach((key) => {
        formData.append(key, restData[key]);
      });

      if (technologies) {
        const technologiesArray = technologies
          .split(",")
          .map((tech: string) => tech.trim());
        formData.append("technologies", JSON.stringify(technologiesArray));
      }

      if (image?.length > 0) {
        image.forEach((file: any) => {
          formData.append("image", file?.originFileObj);
        });
      }

      const res = await axiosInstance.post("/api/projects", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      message.success(res.data?.msg);

      form.resetFields();
    } catch (error) {
      console.error("Project addition failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="w-full bg-gray-900 px-10 py-5 rounded-lg">
        <h2 className="text-3xl text-white font-semibold">Add Project</h2>
        <div className=" bg-card w-full">{/* form will be there */}</div>
      </div>
    </Wrapper>
  );
};

export default AddProject;
