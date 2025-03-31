import { Table, Tag, Badge } from "antd";
import DeleteRoom from "./DeleteRoom";
import EditRoom from "./EditRoom";

function TableRoom(props) {
    const { record, reLoad } = props;
    const columns = [
        {
            title: 'Tên phòng',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng phòng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Số lượng giường',
            dataIndex: 'quantity_bed',
            key: 'quantity_bed',
        },
        {
            title: 'Số người tối đa',
            dataIndex: 'people_quantity_max',
            key: 'people_quantity_max',
        },
        {
            title: 'tiện ích',
            dataIndex: 'extend',
            render: (_, { extend }) => {
                return (
                    <>
                        {extend.map((extend,index) => (                        
                                <Tag color="blue" key={index}>{extend}</Tag>
                        ))}
                    </>
                )
            },
            key: 'extend',
        },
        {
            title: 'Mô tả',
            dataIndex: 'decription',
            key: 'decription',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, { status }) => {
                return (
                    <>
                        {status ? (
                            <>
                                <Badge status="success" text="Còn phòng" />
                            </>
                        ) : (
                            <>
                                <Badge status="error" text="Hết phòng" />
                            </>
                        )}
                    </>
                )
            },
            key: 'status',
        },
        {
            title: 'Loại phòng',
            dataIndex: 'type',
            render: (_, { type }) => {
                return (
                    <>
                        {type ? (
                            <>
                                <Tag bordered={false} color="purple">VIP</Tag>
                            </>
                        ) : (
                            <>
                                <Tag bordered={false} color="blue">Thường</Tag>
                            </>
                        )}
                    </>
                )
            },
            key: 'type',
        },
        {
            title: 'Hành động',
            dataIndex: 'id',
            render : (_, record) => (
                <>
                    <DeleteRoom idRoom={record.id} reLoad={reLoad}/>
                    <EditRoom record= {record} reLoad = {reLoad}/>
                </>
            ),
            key: 'action',
        }
    ]


    return (
        <>
            <Table dataSource={record} columns={columns} rowKey={columns[0].key}/>
        </>
    )
}

export default TableRoom;