import axiosInstance from "@/axios/instance";
import { SkillsT } from "@/lib/types";
import { Button, Form, message, Select } from "antd";
import { useEffect, useState } from "react";
import Wrapper from "../../Wrapper";

const AddSkills = ({
  skillsId,
  initialData,
}: {
  skillsId: string;
  initialData: SkillsT;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onSubmit = async (data: SkillsT) => {
    try {
      setIsLoading(true);

      await axiosInstance.patch(`/api/skills/${skillsId}`, data);

      message.success("Skills updated successfully");
    } catch (error) {
      console.error("Error updating skills:", error);
      message.error("Failed to update skills");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
      });
    }
  }, []);

  return (
    <Wrapper>
      <div className="w-full min-h-screen bg-gray-900 px-10 py-5 rounded-lg">
        <h2 className="text-3xl text-white font-semibold">Update Skills</h2>
        <div className="w-full">
          <Form
            form={form}
            onFinish={onSubmit}
            layout="vertical"
            className="label-right label-semibold label-mb-1 space-y-2 no-margin-item mt-5"
          >
            <Form.Item
              name="name"
              label="Skills"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select mode="tags" placeholder="Skills" className="" />
            </Form.Item>

            <Form.Item className="pt-5 w-[100px]">
              <Button
                htmlType="submit"
                type="primary"
                loading={isLoading}
                disabled={isLoading}
                block
                className="h-10 font-semibold bg-[#9747FF] "
              >
                Update skills
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddSkills;
