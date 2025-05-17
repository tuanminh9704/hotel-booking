import { Button, Checkbox, Form, Input } from "antd";
import { getUserByPhone, getUserByEmail } from "../../Service/UserServices";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import Cookies from "js-cookie";
import { useState } from "react";

function Login() {
    const navigate = useNavigate();
    const [islogin, setIsLogin] = useState(false);
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
            // const authResponse = await authenticateUser(username, password); // Giả định API xác thực
            // if (!authResponse.success) {
            //     message.error('Sai mật khẩu!');
            //     return;
            // }

            if (response[0].password == password) {
                setIsLogin(true);
                Cookies.set("id", response[0].id, { expires: 1, secure: true });
                Cookies.set("fullName", response[0].fullName, { expires: 1, secure: true });
                Cookies.set("email", response[0].email, { expires: 1, secure: true });
                Cookies.set("phone", response[0].phone, { expires: 1, secure: true });
                Cookies.set("admin", response[0].admin, { expires: 1, secure: true });
                Cookies.set("token", response[0].token, { expires: 1, secure: true });

                // Lưu thông tin nếu chọn "remember me"
                if (remember && islogin) {
                    localStorage.setItem('token', response[0].token);
                }

                // Điều hướng và message ở đây luôn, không cần check lại islogin
                if (response[0].admin) {
                    message.success('Đăng nhập thành công!');
                    navigate('/admin', { state: { user: response } });
                } else {
                    message.success('Đăng nhập thành công!');
                    navigate('/', { state: { user: response } });
                }
            }else {
                message.error('Sai mật khẩu!!!')
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