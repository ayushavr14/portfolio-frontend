import axiosInstance from "@/axios/instance";
import { NormFileEventT } from "@/lib/types";
import { Button, Form, Input, message, Upload } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import Wrapper from "../Wrapper";

const AddProject = () => {
  const [form] = Form.useForm();

  const normFile = (e: NormFileEventT) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onImagePreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file?.originFileObj);
        reader.onload = () => resolve(reader?.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onSubmit = async (data: any) => {
    try {
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
    }
  };

  return (
    <Wrapper>
      <div className="w-full bg-gray-900 px-10 py-5 rounded-lg">
        <h2 className="text-3xl text-white font-semibold">Add Project</h2>
        <div className=" bg-card w-full">
          <Form
            form={form}
            onFinish={onSubmit}
            layout="vertical"
            className="label-right label-semibold label-mb-1 space-y-4 no-margin-item mt-4"
          >
            <Form.Item
              name="title"
              label="Project Title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Project title" className="h-10" />
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
              name="technologies"
              label="Technologies"
              rules={[
                {
                  required: true,
                  message: "Please enter technologies, separated by commas.",
                },
                {
                  pattern: /^[a-zA-Z]+(?:\s*,\s*[a-zA-Z]+)*$/,
                  message: "Technologies must be comma-separated words.",
                },
              ]}
            >
              <Input placeholder="Technologies" className="h-10" />
            </Form.Item>

            <Form.Item
              name="demoLink"
              label="DemoLink"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="DemoLink" className="h-10" />
            </Form.Item>

            <Form.Item
              name="sourceCodeLink"
              label="Source Code Link"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Source Code Link" className="h-10" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              label="Upload images of the product (max 4)"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                accept="image/*"
                maxCount={4}
                multiple
                listType="picture-card"
                beforeUpload={() => false}
                onPreview={onImagePreview}
              >
                <div className="flex justify-center items-center flex-col ml-1">
                  <AiOutlinePlus
                    size={18}
                    className="group-hover:text-primary"
                  />
                  <span className="mt-4 font-medium">Upload</span>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              name="tag"
              label="Tag"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Tag" className="h-10" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Status" className="h-10" />
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
                Add project
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddProject;
