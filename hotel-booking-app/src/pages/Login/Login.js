import { Button, Checkbox, Form, Input } from "antd";
import { getUserByPhone, getUserByEmail } from "../../Service/UserServices";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Trạng thái loading
    

    function checkString(string) {
        const phonePattern = /^(?:\+84|0)[0-9]{9,10}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (phonePattern.test(string)) {
            return "Phone number";
        } else if (emailPattern.test(string)) {
            return "Email";
        } else {
            return "Neither";
        }
    }



    const onFinish = async (values) => {
        try {
            // Lấy và làm sạch dữ liệu từ form
            const username = values.username?.trim();
            const password = values.password?.trim();
            const remember = values.remember;

            // Kiểm tra định dạng username
            const type = checkString(username);
            if (type !== 'Phone number' && type !== 'Email') {
                message.error('Vui lòng nhập số điện thoại hoặc email hợp lệ!');
                return;
            }

            setLoading(true); // Bật loading khi gọi API

            // Gọi API để kiểm tra người dùng
            let response;
            if (type === 'Phone number') {
                response = await getUserByPhone(username);
            } else if (type === 'Email') {
                response = await getUserByEmail(username); // Giả định có API getUserByEmail
            }

            // Kiểm tra response từ API
            if (!response) {
                message.error('Người dùng không tồn tại!');
                return;
            }

            // Gửi yêu cầu xác thực tới backend thay vì so sánh mật khẩu trực tiếp
            const authResponse = await authenticateUser(username, password); // Giả định API xác thực
            if (!authResponse.success) {
                message.error('Sai mật khẩu!');
                return;
            }

            // Lưu thông tin nếu chọn "remember me"
            if (remember) {
                localStorage.setItem('token', authResponse.token); // Lưu token nếu có
            }

            // Điều hướng dựa trên vai trò người dùng
            if (response.admin) {
                message.success('Đăng nhập thành công!');
                navigate('/admin', { state: { user: response } });
            } else {
                message.error('Bạn không có quyền truy cập trang admin!');
            }
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            message.error('Đã có lỗi xảy ra, vui lòng thử lại!');
        } finally {
            setLoading(false); // Tắt loading
        }
    };

    // Giả định các hàm API

    const authenticateUser = async (username, password) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        return response.ok ? await response.json() : { success: false };
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
                <Form.Item className="username"
                    label="Email hoặc số điện thoại"
                    name="username"
                    rules={[{ required: true, message: 'Mục này không được bỏ trống!' }]}
                >
                    <Input placeholder="Email hoặc số điện thoại" />

                </Form.Item>
                <p>(Ví dụ: yourname@email.com / +84904123456)</p>
                <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: 'Mục này không được bỏ trống!' }]}
                >
                    <Input.Password placeholder="Mật khẩu " />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" label={null}>
                    <Checkbox >Nhớ tài khoản</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;