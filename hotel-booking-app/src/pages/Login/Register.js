import { Button, Form, Input } from "antd";

function Register() {
    const onFinish = values => {
        console.log('Success:', values);
    };
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div>
            <Form className="form"
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email hoặc số điện thoại"
                    name="username"
                    rules={[{ required: true, message: 'Mục này không được bỏ trống!' }]}
                >
                    <Input placeholder="Email hoặc số điện thoại" />
                </Form.Item>
                <p>(Ví dụ: yourname@email.com / +84904123456)</p>
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Mục này không được bỏ trống!' }]}
                >
                    <Input placeholder="Họ và tên" />
                </Form.Item>

                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Mục này không được bỏ trống!' }]}
                >
                    <Input.Password placeholder="Mật khẩu " />
                </Form.Item>

                <Form.Item
                    label="Nhập lại mật khẩu"
                    name="verifyPassword"
                    rules={[{ required: true, message: 'Mục này không được bỏ trống!' }]}
                >
                    <Input.Password placeholder="Nhập lại mật khẩu" />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;