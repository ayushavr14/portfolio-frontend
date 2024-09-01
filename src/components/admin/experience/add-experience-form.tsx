import { ExperienceT } from "@/lib/types";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import Wrapper from "../../Wrapper";

type Props = {
  isLoading: boolean;
  initialData?: ExperienceT;
  onSubmit: (data: ExperienceT) => Promise<void>;
};

const AddExperienceForm = ({ isLoading, onSubmit, initialData }: Props) => {
  const [form] = Form.useForm();

  const onFinish = (data: ExperienceT) => {
    onSubmit(data);
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        ...initialData,
        startDate: initialData.startDate?.slice(0, 4),
        endDate: initialData.endDate?.slice(0, 4),
      });
    }
  }, []);

  return (
    <Wrapper>
      <div className="w-full min-h-screen px-10 py-5 rounded-lg">
        <div className="w-full">
          <Form
            form={form}
            onFinish={onFinish}
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
                  type: "date",
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
                {initialData ? "Edit Experience" : "Add Experience"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddExperienceForm;
