import axiosInstance from "@/axios/instance";
import { Button, Form, Input, message, Upload } from "antd";
import { useEffect, useState } from "react";
import Wrapper from "../../Wrapper";
import { MdOutlineFileUpload } from "react-icons/md";
import { UserT } from "@/lib/types";

const ProfileForm = ({ initialData }: { initialData: UserT }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const { cvLink, ...restData } = data;
      console.log(data);

      const formData = new FormData();

      Object.keys(restData).forEach((key) => {
        formData.append(key, restData[key]);
      });

      if (cvLink && cvLink.length > 0) {
        cvLink.forEach((file: any) => {
          if (file.url) {
            formData.append("cv", file.name);
          } else {
            formData.append("cv", file.originFileObj);
          }
        });
      }

      await axiosInstance.patch(
        `/api/auth/user-details/${initialData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      message.success("User details updated successfully");
    } catch (error) {
      console.log(error);
      message.error("Failed to update user details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        cvLink: initialData?.cvLink?.map((item: any, index: any) => ({
          uid: index + 1,
          name: item,
          url: item,
        })),
      });
    }
  }, [initialData]);

  const [form] = Form.useForm();

  return (
    <Wrapper>
      <div className="w-full min-h-screen bg-gray-900 px-10 py-5 rounded-lg">
        <div className="bg-card w-full">
          <Form
            form={form}
            onFinish={onSubmit}
            layout="vertical"
            className="label-right label-semibold label-mb-1 space-y-2 no-margin-item mt-5"
          >
            <Form.Item
              name="user"
              label="User"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="User" className="h-10" />
            </Form.Item>

            <Form.Item
              name="about"
              label="About"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="About" className="h-10" />
            </Form.Item>

            <Form.Item
              name="cvLink"
              label="Cv"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[
                {
                  required: true,
                  message: "Please upload your CV!",
                },
              ]}
            >
              <Upload beforeUpload={() => false}>
                <Button icon={<MdOutlineFileUpload />}>Click to Upload</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              name="linkedinLink"
              label="LinkedIn Link"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="LinkedIn Link" className="h-10" />
            </Form.Item>

            <Form.Item
              name="githubLink"
              label="GitHub Link"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="GitHub Link" className="h-10" />
            </Form.Item>

            <Form.Item className="pt-5 w-[100px]">
              <Button
                htmlType="submit"
                type="primary"
                loading={isLoading}
                disabled={isLoading}
                block
                className="h-10 font-semibold bg-[#9747FF]"
              >
                Update User
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileForm;
