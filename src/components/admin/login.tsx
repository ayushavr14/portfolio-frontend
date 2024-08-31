import { Button, Flex, Form, Input } from "antd";
import Wrapper from "../Wrapper";
import { LoginT } from "@/lib/types";

const Login = () => {
  const [form] = Form.useForm();

  const onSubmit = async (data: LoginT) => {
    console.log(data);
  };
  return (
    <Wrapper>
      <div className="w-full min-h-screen bg-gray-900 flex items-center justify-center">
        <Flex
          vertical
          gap={30}
          align="center"
          className="px-10 py-5 rounded-lg border max-w-md w-full"
        >
          <h2 className="text-3xl text-white font-semibold">Log In</h2>
          <div className=" bg-card w-full">
            <Form
              form={form}
              onFinish={onSubmit}
              layout="vertical"
              className="label-right label-semibold label-mb-1 space-y-2 no-margin-item"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  {
                    required: true,
                  },
                  {
                    type: "email",
                  },
                ]}
              >
                <Input placeholder="Email" className="h-10" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.Password placeholder="Password" className="h-10" />
              </Form.Item>
              <Form.Item className="pt-5">
                <Button
                  htmlType="submit"
                  type="primary"
                  //   loading={loginLoading}
                  //   disabled={loginLoading}
                  block
                  className="h-10 font-semibold bg-[#9747FF] "
                >
                  Log In
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Flex>
      </div>
    </Wrapper>
  );
};

export default Login;
