import { Card, Col, Row, Badge } from "antd";
import phong from '../../image/phong.jpg'

function GridRoom(props) {
  const { record } = props;

  return (
    <>
      <>
        {record && record.map((item) => (
          <Row gutter={[20, 20]} key={item.id}>
            <Col span={24}>
              <Badge.Ribbon text={item.type ? "VIP" : "Thường"} color={item.type ? "purple" : "blue"}>
                <Card title={item.name} key={item.id}>
                  <Row gutter={[20]}>
                    <Col xl={12} lg={24} md={24} sm={24} span={24}>
                      <img className="image-room" src={phong} alt="phòng gia đình"></img>
                    </Col>
                    <Col className="room-info" span={12}>
                      <p>Số giường: <strong>{item.quantity_bed}</strong></p>
                      <p>Số người: <strong>{item.people_quantity_max}</strong></p>
                      <p>Tiện ích <strong>{item.extend.map((extendItem, index) => (
                        <strong key={index} >{extendItem}, </strong>
                      ))}</strong></p>
                      <p>Mô tả: {item.decription}</p>
                      <Row>
                        <Col span={16}>
                          <p>{item.status ? (
                            <>
                              <Badge status="success" text="Còn phòng" />
                            </>
                          ) : (
                            <>
                              <Badge status="error" text="Hết phòng" />
                            </>
                          )}</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Badge.Ribbon>
            </Col>
          </Row>
        ))}
      </>
    </>
  )
}

export default GridRoom;