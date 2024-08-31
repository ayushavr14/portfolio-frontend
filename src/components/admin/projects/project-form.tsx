import { NormFileEventT, ProjectT } from "@/lib/types";
import { Button, Form, Input, Select, Upload } from "antd";
import { useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

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

type Props = {
  isLoading: boolean;
  initialData?: ProjectT;
  onSubmit: (data: FormData) => Promise<void>;
};

const ProjectForm = ({ isLoading, onSubmit, initialData }: Props) => {
  const [form] = Form.useForm();

  const onFinish = async (data: any) => {
    const { image, ...restData } = data;
    const formData = new FormData();

    Object.keys(restData).forEach((key) => {
      formData.append(key, restData[key]);
    });

    if (image && image.length > 0) {
      image.forEach((file: any) => {
        if (file.url) {
          formData.append("image[]", file.name);
        } else {
          formData.append("image_upload", file.originFileObj);
        }
      });
    }

    await onSubmit(formData);
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        image: initialData?.image?.map((item, index) => ({
          uid: index + 1,
          name: item,
          url: item,
        })),
      });
    }
  }, []);

  return (
    <Form
      form={form}
      onFinish={onFinish}
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
        <Input.TextArea
          style={{ height: 120, resize: "none" }}
          allowClear
          placeholder="Description"
          className="h-10"
        />
      </Form.Item>

      <Form.Item
        name="technologies"
        label="Technologies"
        rules={[
          {
            required: true,
            message: "Please enter technologies, separated by commas.",
          },
        ]}
      >
        <Select mode="tags" placeholder="Technologies" />
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
            <AiOutlinePlus size={18} className="group-hover:text-primary" />
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
          loading={isLoading}
          disabled={isLoading}
          block
          className="h-10 font-semibold bg-[#9747FF] "
        >
          {initialData ? "Update Project" : "Add Project"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
