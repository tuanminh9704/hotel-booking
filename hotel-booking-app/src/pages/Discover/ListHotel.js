import { Badge, Button, Card, Col, Row } from "antd";
import { CheckOutlined, RightOutlined } from '@ant-design/icons'
import { TiStarFullOutline, TiStarHalfOutline, TiStarOutline } from "react-icons/ti";

function ListHotel(props) {
  const { data } = props;

  const StarRating = ({ rate }) => {
    const fullStars = Math.floor(rate); // Số sao đầy đủ
    const halfStar = rate % 1 !== 0; // Kiểm tra có sao nửa hay không
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao trống

    return (
      <div className="rate">
        {[...Array(fullStars)].map((_, i) => <TiStarFullOutline className="star" key={`full-${i}`} />)}
        {halfStar && <TiStarHalfOutline className="star"/>}
        {[...Array(emptyStars)].map((_, i) => <TiStarOutline className="star" key={`empty-${i}`} />)}
      </div>
    );
  };

  return (
    <>
      <Row gutter={[20, 20]} className="list-hotel">
        {data && data.map((item) => (
          <Col span={24} key={item.id}>
            <Badge.Ribbon text={item.rate >= 4.5 ? "Tốt" : "Trung bình"} color={item.rate >= 4.5 ? "purple" : "blue"}>
              <Card className="card-item" key={item.id}
                title={item.name}
                variant="borderless"
              >
                <Row gutter={[20, 20]}>
                  <Col xxl={9} xl={9} lg={9} md={9} sm={24} span={24}>
                    <div className="image">
                        <img src={item.thumbnail} alt="ảnh khách sạn"></img>
                    </div>
                  </Col>
                  <Col xxl={11} xl={11} lg={11} md={11} sm={24} span={24}>
                    <div className="content">
                      <h2 className="title">{item.name}</h2>
                      <div className="address">{item.address}</div>
                      <a href={item.linkMap} className="link-map" target="_blank" rel="noreferrer">Xem bản đồ</a>
                      <p className="description">{item.description}</p>
                      <div className="cancel">{item.cancel ? (
                        <>
                          <CheckOutlined /> Miễn phí hủy
                        </>
                      ) : (<></>)}</div>
                      <div className="deposit">{!item.deposit ? (
                        <>
                          <CheckOutlined /> Không cọc trước, không thanh toán trước
                        </>
                      ) : (<></>)}</div>
                      <div className="rate"><StarRating rate={item.rate} /></div>
                      {/* <div className="quantity-review">{(item.reviews).length} người đã đánh giá</div> */}
                    </div>
                  </Col>
                  <Col className="card-price" xxl={4} xl={4} lg={4} md={4} sm={24} span={24}  >
                    <div className="card-price__item">
                      <p className="desc">1 đêm, 2 người lớn</p>
                      <strong className="price">{(item.roomTypes[0].price).toLocaleString("vi-VN")} VND</strong>
                      <p className="desc">Đã bao gồm thuế và phí</p>
                      <Button type="primary">Xem chỗ trống<RightOutlined /></Button>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default ListHotel;