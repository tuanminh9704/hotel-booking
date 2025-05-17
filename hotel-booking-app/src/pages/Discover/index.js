import { Button, Col, Layout, Row } from "antd";
import { Link, Outlet, useLocation, useParams } from "react-router";
import "./Discover.scss";
import { Content, Footer } from "antd/es/layout/layout";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getHotels } from "../../Service/HotelService";
import ListHotel from "./ListHotel";
import HotelSearch from "../../components/Search";
import TopMenu from "../../components/TopMenu";
import RatingFilter from "../../components/RatingFilter";

function Discover() {
  const [hotels, setHotels] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [keywordFromURL, setKeywordFromURL] = useState("");
  const location = useLocation();
  const param = useParams()


  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await getHotels();
        setHotels(response);
      } catch (error) {
        console.error("Lỗi khi tải danh sách khách sạn:", error);
      }
    };
    fetchAPI();
  }, [param]);

  // Lọc khách sạn theo từ khóa & số sao
  const filteredHotels = useMemo(() => {
    let result = hotels;
    const searchKey = keywordFromURL.trim().toLowerCase();

    if (searchKey) {
      result = result.filter(
        (hotel) =>
          hotel?.name?.toLowerCase().includes(searchKey) ||
          hotel?.address?.toLowerCase().includes(searchKey)
      );
    }

    if (selectedRatings.length > 0) {
      result = result.filter((hotel) => selectedRatings.includes(Math.floor(hotel.rate)));
    }

    return result;
  }, [hotels, keywordFromURL, selectedRatings]);

  // Xử lý tìm kiếm và cập nhật keywordFromURL
  const handleSearch = useCallback(({ keyword }) => {
    setKeywordFromURL(keyword); // Cập nhật keyword ngay lập tức
    const newParams = new URLSearchParams(location.search);
    if (keyword) {
      newParams.set("keyword", keyword);
    } else {
      newParams.delete("keyword");
    }
    window.history.replaceState(null, "", `?${newParams.toString()}`);
  }, [location.search]);

  // Cập nhật bộ lọc số sao
  const handleFilter = useCallback((ratings) => {
    setSelectedRatings(ratings);
  }, []);

  return (
    <Layout className="layout-home">
      <header>
        <div className="layout-home__header">
          <div className="logo">
            <Link to="/">HotelBooking.com</Link>
          </div>
          <div className="option">
            <div className="language">
              <img
                src="https://t-cf.bstatic.com/design-assets/assets/v3.142.0/images-flags/Vn@3x.png"
                alt="Tiếng Việt"
              />
            </div>
            <Row className="login/logout" gutter={20}>
              <Col span={24}>
                <Button className="login">
                  <Link to={"/login"}>Đăng nhập</Link>
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <div className="menu">
          <TopMenu />
        </div>
        <div className="search">
          <HotelSearch onSearch={handleSearch} defaultKeyword={keywordFromURL} />
        </div>
      </header>

      <Content className="layout-home__content">
        {param.id ? (
          <><Outlet /></>
        ) : (
          <>
            <Row gutter={20}>
              <Col span={5} className="filter">
                <h2>Chọn lọc theo:</h2>
                <RatingFilter onFilter={handleFilter} />
              </Col>
              <Col span={19}>
                <ListHotel data={filteredHotels} />
              </Col>
            </Row>
          </>
        )}
      </Content>

      <Footer className="layout-home__footer">2025 copyright @Nhom5</Footer>
    </Layout>
  );
}

export default Discover;