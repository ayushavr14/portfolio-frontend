import { ExperienceT } from "@/lib/types";
import { Button, Form, Input, message } from "antd";
import Wrapper from "../Wrapper";
import axiosInstance from "@/axios/instance";
import { useState } from "react";

const AddExperience = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (data: ExperienceT) => {
    try {
      setIsLoading(true);
      await axiosInstance.post("/api/experiences", data);
      message.success("Skills added successfully");
      form.resetFields();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="w-full min-h-screen bg-gray-900 px-10 py-5 rounded-lg">
        <h2 className="text-3xl text-white font-semibold">Add Experience</h2>
        <div className=" bg-card w-full">
          <Form
            form={form}
            onFinish={onSubmit}
            layout="vertical"
            className="label-right label-semibold label-mb-1 space-y-2 no-margin-item mt-5"
          >
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Title" className="h-10" />
            </Form.Item>
            <Form.Item
              name="company"
              label="Company"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Company" className="h-10" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Description" className="h-10" />
            </Form.Item>

            <Form.Item
              name="startDate"
              label="Start Date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Start Date" className="h-10" />
            </Form.Item>

            <Form.Item name="endDate" label="End Date">
              <Input placeholder="End Date" className="h-10" />
            </Form.Item>

            <Form.Item className="pt-5 w-[120px]">
              <Button
                htmlType="submit"
                type="primary"
                loading={isLoading}
                disabled={isLoading}
                block
                className="h-10 font-semibold bg-[#9747FF] "
              >
                Add Experience
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddExperience;
