import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Layout } from "antd";
import './Home.scss';
import video_background from '../../videos/video_background3.mp4';
import { RightOutlined } from '@ant-design/icons';
import LanguageSelector from "../../components/LanguageSelector";
import { BsArrowRight } from "react-icons/bs";
import TopMenu from "../../components/TopMenu";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import GridHotel from "../../components/GridHotel";
import { getHotels } from "../../Service/HotelService";

const { Content, Footer } = Layout;

export default function Home() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [ data, setData ] = useState([]);

  useEffect( () => {
    const fetchAPI = async () => {
      const response = await getHotels();
      setData(response);
    }

    fetchAPI();
  }, [])

  const handleSearch = () => {
    if (!keyword.trim()) return;
    navigate(`/discover?keyword=${encodeURIComponent(keyword.trim())}`);
  };

  return (
    <>
      <Layout className="layout-welcome">
        <header className="layout-welcome__header">
          <div className="video-background">
            <video autoPlay loop muted playsInline>
              <source src={video_background} type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ video.
            </video>
            <div className="content">
              <div className="login-language">
                <Link to='/login'>Đăng nhập <RightOutlined /> / </Link>
                <LanguageSelector />
              </div>
              <div className="logo">
                <Link to={"/"}>HotelBooking.com</Link>
              </div>
              <div className="menu"><TopMenu /></div>
              <div className="title">Tìm chỗ nghỉ tiếp theo</div>
              <div className="desciption">Tìm ưu đãi khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...</div>
              <Button className="button-discover"><Link to={'/discover'}><span>Khám phá</span><BsArrowRight /></Link></Button>
            </div>
          </div>

          {/* search mới */}
          <div className="search" >
            <div className="hotel-search-bar noborder">
              <div className="search-item">
                <SearchOutlined className="icon" />
                <Input
                  placeholder="Nhập tên khách sạn hoặc địa điểm"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="input-field"
                  variant="borderless"
                  onPressEnter={handleSearch}
                />
              </div>
              <Button type="primary" className="search-button" onClick={handleSearch}>Tìm</Button>
            </div>
          </div>
        </header>

        <Content className="layout-welcome__conten">
          <h1 className="title">Gợi ý các chỗ nghỉ cho bạn</h1>
          <GridHotel data={data}/>
        </Content>
        <Footer className="layout-home__footer">
          2025 copyright @Nhom5
        </Footer>
      </Layout>
    </>
  )
}
