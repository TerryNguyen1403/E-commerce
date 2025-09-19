import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CustomBreadcrumb = ({ product }) => {
    const navigator = useNavigate();

    return (
        <div className="d-flex align-items-center ms-5">
            <Breadcrumb className="mb-0">
                <Breadcrumb.Item
                    onClick={() => navigator('/')}
                    linkAs='span'
                    style={{ cursor: 'pointer' }}
                >
                    Trang chủ
                </Breadcrumb.Item>

                <Breadcrumb.Item
                    onClick={() => navigator(`/${product.platform.toLowerCase()}`)}
                    linkAs='span'
                    style={{ cursor: 'pointer' }}
                >
                    {product.platform}
                </Breadcrumb.Item>

                <Breadcrumb.Item active>
                    {product.name}
                </Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}

export default CustomBreadcrumb;