import { Badge, Button, Card, Col, Row } from "antd";
import { CheckOutlined, RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import StarRating from "../../components/StarRating";
import './GridHotel.scss'

function GridHotel(props) {
  const { data } = props;

  return (
    <>
      <Row gutter={[20, 20]} className="grid-hotel">
        {data && data.map((item) => (
          <Col xxl={6} xl={6} lg={6} md={8} sm={24} span={24} key={item.id}>
            <Badge.Ribbon text={item.rate >= 4.5 ? "Tốt" : "Trung bình"} color={item.rate >= 4.5 ? "purple" : "blue"}>
              <Card className="card-item" title={item.name} variant="borderless">
                <Row gutter={[20, 20]}>
                  <Col span={24}>
                    <div className="image">
                      <img src={item.thumbnail} alt="ảnh khách sạn" />
                    </div>
                  </Col>
                  <Col span={24}>
                    <div className="content">
                      <h2 className="title">{item.name}</h2>
                      <div className="address">{item.address}</div>
                      <a href={item.linkMap} className="link-map" target="_blank" rel="noreferrer">Xem bản đồ</a>
                      <p className="description">{item.description}</p>
                      <div className="cancel">
                        {item.cancel ? (
                          <>
                            <CheckOutlined /> Miễn phí hủy
                          </>
                        ) : (<></>)}
                      </div>
                      <div className="deposit">
                        {!item.deposit ? (
                          <>
                            <CheckOutlined /> Không cọc trước, không thanh toán trước
                          </>
                        ) : (<></>)}
                      </div>
                      <div className="rate"><StarRating rate={item.rate} /></div>
                      {/* <div className="quantity-review">{(item.reviews).length} người đã đánh giá</div> */}
                    </div>
                  </Col>
                  <Col span={24} className="card-price">
                    <div className="card-price__item">
                      <p className="desc">1 đêm, 2 người lớn</p>
                      <strong className="price">{(item.roomTypes[0].price).toLocaleString("vi-VN")} VND</strong>
                      <p className="desc">Đã bao gồm thuế và phí</p>
                      <Button type="primary">
                        <Link to={`discover/detail/${item.id}`}>Xem chỗ trống <RightOutlined /></Link>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default GridHotel;