import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Pagination from "react-bootstrap/Pagination";

// Import components
import SortButton from "../Components/SortButton";
import DisplaySection from "../Components/DisplaySection";
import { ProductContext } from "../Context/ProductContext";

const DisplayProduct = ({ endpoint }) => {
  const { platform } = useParams();
  const { allProducts } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const normalizedEndpoint = useMemo(
    () => (endpoint || platform || "").toLowerCase(),
    [endpoint, platform]
  );

  useEffect(() => {
    const load = async () => {
      // Lấy sản phẩm mới
      if (normalizedEndpoint === "new-products") {
        setLoading(true);
        try {
          const res = await api.get(
            "/api/product/new-products"
          );
          const data = res.data?.newProducts || [];
          if (Array.isArray(data) && data.length) {
            setProducts(data);
            return;
          }
        } catch (e) {
          console.error('Error: ', e);
        } finally {
          setLoading(false);
        }
      }

      // Lấy sản phẩm nổi bật
      if (normalizedEndpoint === "featured-products") {
        setLoading(true);

        try {
          const res = await api.get('/api/product/featured-products');
          const responsedData = res.data?.featuredProducts || [];
          if (Array.isArray(responsedData) && responsedData.length) {
            setProducts(responsedData);
            return;
          }
        } catch (error) {
          console.error('Error: ', error);
        } finally {
          setLoading(false);
        }
      }

      if (normalizedEndpoint) {
        // Lấy sản phẩm theo endpoint
        const filtered = (allProducts || []).filter((p) => {
          const platform = (p?.platform || "").toLowerCase();
          return platform.includes(normalizedEndpoint);
        });
        setProducts(filtered);
      } else {
        setProducts(allProducts || []);
      }
    };

    load();
  }, [normalizedEndpoint, allProducts]);

  // Sắp xếp sản phẩm dựa trên selectedSort
  const displayedProducts = useMemo(() => {
    const arr = Array.isArray(products) ? [...products] : [];
    switch (selectedSort) {
      case "priceAsc":
        return arr.sort((a, b) => (a?.new_price ?? 0) - (b?.new_price ?? 0));
      case "priceDesc":
        return arr.sort((a, b) => (b?.new_price ?? 0) - (a?.new_price ?? 0));
      default:
        return arr;
    }
  }, [products, selectedSort]);

  // Reset đầu trang mỗi khi có thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [normalizedEndpoint, selectedSort, products.length]);

  // Xác định tổng số trang dựa trên độ dài mảng chứa Products
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(displayedProducts.length / itemsPerPage)),
    [displayedProducts.length]
  );

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return displayedProducts.slice(start, end);
  }, [displayedProducts, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageItems = () => {
    const items = [];
    const addItem = (page) => (
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => goToPage(page)}
      >
        {page}
      </Pagination.Item>
    );

    if (totalPages <= 7) {
      for (let p = 1; p <= totalPages; p++) items.push(addItem(p));
      return items;
    }

    items.push(addItem(1));
    if (currentPage > 3) items.push(<Pagination.Ellipsis key="s-ellip" disabled />);

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let p = start; p <= end; p++) items.push(addItem(p));

    if (currentPage < totalPages - 2) items.push(<Pagination.Ellipsis key="e-ellip" disabled />);
    items.push(addItem(totalPages));
    return items;
  };

  return (
    <div>
      <SortButton selectedSort={selectedSort} onSelect={setSelectedSort} />
      <DisplaySection products={paginatedProducts} />
      {loading && (
        <div className="text-center py-4">Đang tải sản phẩm...</div>
      )}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center my-4">
          <Pagination>
            <Pagination.First onClick={() => goToPage(1)} disabled={currentPage === 1} />
            <Pagination.Prev onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} />
            {renderPageItems()}
            <Pagination.Next onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} />
            <Pagination.Last onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages} />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default DisplayProduct;