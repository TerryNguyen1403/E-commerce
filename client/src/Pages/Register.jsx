import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const Register = () => {
    const navigator = useNavigate();
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    // Xử lý khi nhấn nút đăng ký
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(userPassword !== confirmPassword){
            setMessage("Mật khẩu không giống nhau");
            return;
        }

        try {
            const res = await axios.post('http://localhost:4000/api/user/register', {
                userEmail,
                userPassword
            });

            setMessage(res.data.message); // Đăng ký thành công
            alert('Đăng ký thành công, chuyển hướng sang trang đăng nhập');
            navigator('/login'); // Chuyển hướng về trang đăng nhập

        } catch (error) {
            if (axios.isAxiosError(error)){
                setMessage(error.response?.data?.message || "Đã xảy ra lỗi")
            } else {
                setMessage("Lỗi không xác định");
            }
        }
    };

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <Card
                style={{ width: "400px" }}
                className="p-4 shadow"
            >
            <h3 className="text-center mb-4">Đăng ký</h3>
            <Form
                onSubmit={handleSubmit}
            >
                {/* Email */}
                <Form.Group
                    className="mb-3"
                    controlId="email"
                >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        type="email"
                        placeholder="Nhập email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Vui lòng nhập Email
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group
                    className="mb-3"
                    controlId="password"
                >
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Nhập mật khẩu"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Mật khẩu cần tối thiểu 6 ký tự
                    </Form.Control.Feedback>
                </Form.Group>

                {/* Nhập lại password */}
                <Form.Group
                    className="mb-3"
                    controlId="confirmPassword"
                >
                    <Form.Label>Nhập lại mật khẩu</Form.Label>
                    <Form.Control
                        required
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Mật khẩu không khớp
                    </Form.Control.Feedback>
                </Form.Group>

                {message && (
                    <div className="text-danger text-center mt-3">
                        {message}
                    </div>
                )}

                <Button
                    variant="primary"
                    type="submit"
                    className="w-100"
                >
                    Đăng ký
                </Button>

                <div className="text-center">
                    <small className="text-muted">
                    Đã có tài khoản?
                    <a href="/register" className="ms-1 text-decoration-none text-primary fw-semibold">
                        Đăng nhập
                    </a>
                    </small>
                </div>
            </Form>
        </Card>
        </Container>
    );
};

export default Register;
