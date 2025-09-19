import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:4000/api/user/login', {
        userEmail: userEmail,
        userPassword: userPassword
      })

      // Lưu token vào localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", userEmail);

      // Chuyển hướng sau khi login thành công
      window.dispatchEvent(new Event("storageUpdated"));
      alert('Đăng nhập thành công')
      navigate('/');

    } catch (error) {
      if(axios.isAxiosError(error)){
        setError(error.response?.data?.message || "Đăng nhập thất bại!");
      } else {
        setError("Lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "400px" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Đăng nhập</h3>

        {/* 🔥 Hiển thị lỗi nếu có */}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            { loading ? "Đang đăng nhập..." : "Đăng nhập" }
          </Button>
          
          <div className="text-center">
            <small className="text-muted">
              Chưa có tài khoản?
              <a href="/register" className="ms-1 text-decoration-none text-primary fw-semibold">
                Đăng ký
              </a>
            </small>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;
