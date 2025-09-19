import { Container, Nav } from "react-bootstrap";

const NavigationMenu = () => {
  const menuItems = [
    { href: "/games/download", label: "GAME TẢI NHIỀU" },
    { href: "/games/all", label: "GAME +" },
    { href: "/games/vietnamese", label: "GAME VIỆT HÓA" },
    { href: "/games/online", label: "GAME ONLINE" },
    { href: "/games/cracked", label: "GAME BẢN QUYỀN" },
    { href: "/vip", label: "NẠP TẢI VIP" },
    { href: "/blog", label: "BLOG +" },
  ];

  return (
    <div className="bg-white border-bottom py-2" style={{ borderColor: "#e0e0e0" }}>
      <Container>
        <Nav className="justify-content-center">
          {menuItems.map((item, idx) => (
            <Nav.Item key={idx}>
              <Nav.Link
                href={item.href}
                className="text-dark fw-bold px-4 py-2"
                style={{ fontSize: "13px" }}
                onMouseEnter={(e) =>
                  e.currentTarget.style.setProperty("color", "#ff6b35", "important")
                }
                onMouseLeave={(e) =>
                  e.currentTarget.style.setProperty("color", "#080808ff", "important")
                }
              >
                {item.label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Container>
    </div>
  );
};

export default NavigationMenu;
