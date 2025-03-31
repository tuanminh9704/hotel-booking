import { Button, Col, Form, Input, InputNumber, message, Modal, Row, Select, Switch } from "antd";
import { EditOutlined } from '@ant-design/icons'
import { useState } from "react";
import { editRoom } from "../../Service/RoomService";
const { Option } = Select;

function EditRoom(props) {
    const { record, reLoad } = props

    const [isShowModal, setIsShowModal] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const rules = [
        {
            required: true,
            message: 'Không được bỏ trống !',
        },
    ]

    const handleCancel = () => {
        setIsShowModal(false);
        form.resetFields();
    }

    const showModal = () => {
        setIsShowModal(true);

    };

    const [status, setStatus] = useState(true);
    const [typeRoom, setTypeRoom] = useState(false);

    const handleSubmit = async (e) => {
        let data = {
            ...e,
            status: status
        }
        const response = await editRoom(record.id, data);
        if (response) {
            setIsShowModal(false);
            messageApi.open({
                type: "success",
                content: "Sửa đổi thành công"
            })
            reLoad();
        }
        else {
            setIsShowModal(false);
            messageApi.open({
                type: "error",
                content: "Sửa đổi thất bại"
            })

        }
    }

    return (
        <>
            {contextHolder}
            <Button type="primary" icon={<EditOutlined />} onClick={showModal}></Button>

            <Modal title="Sửa thông tin phòng " open={isShowModal} onCancel={handleCancel} footer={null}>
                <Form onFinish={handleSubmit} layout="vertical" form={form} initialValues={record}>
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
                                <Switch checkedChildren="Còn phòng" unCheckedChildren="Hết phòng" defaultChecked={status} onClick={() => { setStatus(!status) }} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                label="Loại phòng"
                                name="type"
                            >
                                <Switch checkedChildren="VIP" unCheckedChildren="Thường" defaultChecked={typeRoom} onClick={() => { setTypeRoom(!status) }} />
                            </Form.Item>
                        </Col>
                        <Col span={24} >
                            <Form.Item >
                                <Button type='primary' htmlType='submit'>Cập nhật</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default EditRoom;