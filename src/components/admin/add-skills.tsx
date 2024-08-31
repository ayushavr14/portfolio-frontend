import { SkillsT } from "@/lib/types";
import { Button, Form, Input, message } from "antd";
import Wrapper from "../Wrapper";
import axiosInstance from "@/axios/instance";

const AddSkills = () => {
  const [form] = Form.useForm();

  const onSubmit = async (data: SkillsT) => {
    try {
      const skillsArray = data.name
        .split(",")
        .map((skill: string) => skill.trim())
        .filter((skill: string) => skill);

      const sendData = {
        name: skillsArray,
      };

      await axiosInstance.post("/api/skills", sendData);

      message.success("Skills added successfully");

      form.resetFields();
    } catch (error) {
      console.error("Error adding skills:", error);
      message.error("Failed to add skills");
    }
  };
  return (
    <Wrapper>
      <div className="w-full min-h-screen bg-gray-900 px-10 py-5 rounded-lg">
        <h2 className="text-3xl text-white font-semibold">Add Skills</h2>
        <div className=" bg-card w-full">
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
                  message: "Please enter skills, separated by commas.",
                },
              ]}
            >
              <Input placeholder="Skills" className="h-10" />
            </Form.Item>

            <Form.Item className="pt-5 w-[100px]">
              <Button
                htmlType="submit"
                type="primary"
                //   loading={loginLoading}
                //   disabled={loginLoading}
                block
                className="h-10 font-semibold bg-[#9747FF] "
              >
                Add skills
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddSkills;
