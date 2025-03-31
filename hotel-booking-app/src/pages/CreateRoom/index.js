import { Col, Form, Row, Input, Button, InputNumber, Select, Switch } from 'antd'
import './CreateRoom.scss'
import { createRoom } from '../../Service/RoomService';
import { useState } from 'react';
const { Option } = Select;

function CreateRoom() {

  const [form] = Form.useForm();
  const rules = [
    {
      required: true,
      message: 'Please input your username!',
    },
  ]
  const [status, setStatus] = useState(true);
  const [typeRoom, setTypeRoom] =  useState(false);

  const handleSubmit =async (e) => {
    let data = {
      ...e,
      status : status
    }
    const response = await createRoom(data);
    if(response) {
      alert("Thêm thành công")
      form.resetFields();
    }
    else alert("Thêm thất bại");
  }
  return (
    <>
      <h2>Thêm phòng mới</h2>
      <Form onFinish={handleSubmit} layout="vertical" form={form}>
        <Row gutter={[20, 20]} >
          <Col span={24} xxl={12} xl={12} lg={12} md={24}>
            <Form.Item
              label="Tên phòng"
              name="name"
              rules={rules}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24} xxl={12} xl={12} lg={12} md={24}>
            <Form.Item
              label="Số lượng phòng"
              name="quantity"
              rules={rules}
            >
              <InputNumber min={1}></InputNumber>
            </Form.Item>
          </Col>
          <Col span={24} xxl={12} xl={12} lg={12} md={24}>
            <Form.Item
              label="Số lượng giường"
              name="quantity_bed"
              rules={rules}
            >
              <InputNumber min={1}></InputNumber>
            </Form.Item>
          </Col>
          <Col span={24} xxl={12} xl={12} lg={12} md={24}>
            <Form.Item
              label="Số người tối đa"
              name="people_quantity_max"
              rules={rules}
            >
              <InputNumber min={1}></InputNumber>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Tiện ích"
              name="extend"
            >
              <Select mode="multiple" placeholder="Chọn tiện ích">
                <Option value="wifi">wifi</Option>
                <Option value="điều hòa">Điều hòa</Option>
                <Option value="nóng lạnh">Nóng lạnh</Option>
                <Option value="Bể bơi">Bể bơi</Option>
                <Option value="Phòng xông hơi">Phòng xông hơi</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Mô tả"
              name="decription"
              
            >
              <Input.TextArea className='decription' showCount maxLength={2000} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Trạng thái"
              name="status" 
            >
              <Switch checkedChildren="Còn phòng" unCheckedChildren="Hết phòng" defaultChecked={status} onClick={()=> {setStatus(!status)}} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Loại phòng"
              name="type" 
            >
              <Switch checkedChildren="VIP" unCheckedChildren="Thường" defaultChecked={typeRoom} onClick={()=> {setTypeRoom(!status)}} />
            </Form.Item>
          </Col>
          <Col span={24} >
            <Form.Item >
              <Button type='primary' htmlType='submit'>Tạo phòng</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default CreateRoom;