import { Row, Col, Input, Button, Checkbox, Space, Radio, DatePicker, Select } from 'antd'
import { useState } from 'react';
import './BookRoom.scss'
import { bookRoom } from '../../Service/BookRoomService';
import { useNavigate } from 'react-router-dom'
const { RangePicker } = DatePicker;

function BookRoom() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  let optionsTime = []

  for (let i = 7; i <= 24; i++) {
    optionsTime.push({
      lable: i > 9 ? `${i} giờ` : `0${i} giờ`,
      value: i > 9 ? `${i} giờ` : `0${i} giờ`
    })
  }

  const handleChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleCheckboxService = (e) => {
    setData({
      ...data,
      service: e
    })
  }

  const handleChangeDate = (_, dateString) => {
    setData({
      ...data,
      date: dateString
    })
  }

  const handleSetTime = (e) => {
    setData({
      ...data,
      time: e
    })
  }

  const handleSubmit =async () => {
    const response = await bookRoom(data);
    if(response)
      alert("Đặt phòng thành công")
    else alert("Vui lòng thử lại sau ít phút")
    navigate(0);
  }

  return (
    <>
      <h2>Đặt phòng</h2>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <h4>Họ và tên</h4>
          <Input name='fullName' placeholder="Họ và tên" onChange={handleChangeInput} />
        </Col>
        <Col span={24} xxl={12} xl={12} lg={12} md={24} >
          <h4>Số điện thoại</h4>
          <Input name='phone' placeholder="Số điện thoại" onChange={handleChangeInput} />
        </Col>
        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
          <h4>Email</h4>
          <Input name='email' placeholder="Email" onChange={handleChangeInput} />
        </Col>
        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
          <h4>Dịch vụ thêm</h4>
          <Checkbox.Group onChange={handleCheckboxService}>
            <Space direction='vertical'>
              <Checkbox value="thuê xe máy">Thuê xe máy</Checkbox>
              <Checkbox value="thuê ô tô 5 chỗ">Thuê ô tô 5 chỗ</Checkbox>
              <Checkbox value="thuê ô tô 7 chỗ">Thuê ô tô 7 chỗ</Checkbox>
              <Checkbox value="thuê ô tô 16 chỗ">Thuê ô tô 16 chỗ</Checkbox>
            </Space>
          </Checkbox.Group>
        </Col>
        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
          <h4>Quà tặng</h4>
          <Radio.Group name='gift' onChange={handleChangeInput}>
            <Space direction='vertical'>
              <Radio value="áo phông">Áo phông</Radio>
              <Radio value="mũ lưỡi trai">Mũ lưỡi trai</Radio>
              <Radio value="kem chống nắng">Kem chống nắng</Radio>
              <Radio value="găng tay">Găng tay</Radio>
            </Space>
          </Radio.Group>
        </Col>
        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
          <h4>Đặt ngày</h4>
          <RangePicker format={['YYYY/MM/DD', 'YYYY/MM/DD']} placeholder={['Ngày đặt', 'Ngày trả']} onChange={handleChangeDate} />
        </Col>
        <Col span={24} xxl={12} xl={12} lg={12} md={24}>
          <h4>Đặt giờ</h4>
          <Select className='setTime' options={optionsTime} onChange={handleSetTime} placeholder='Chọn giờ'></Select>
        </Col>
        <Col span={24}>
          <Button type='primary' onClick={handleSubmit}>Đặt phòng</Button>
        </Col>
      </Row>
    </>
  )
}

export default BookRoom;