import { Container, Nav } from "react-bootstrap";

const NavigationMenu = () => {
  const menuItems = [
    { href: "/new-products", label: "GAME MỚI" },
    { href: "/featured-products", label: "GAME NỔI BẬT" },
    { href: "/windows", label: "GAME WINDOWS" },
    { href: "/playstation", label: "GAME PLAYSTATION" },
    { href: "/nintendo", label: "GAME NINTENDO" },
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
