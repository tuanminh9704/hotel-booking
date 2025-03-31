import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from '@ant-design/icons'
import { deleteRoom } from "../../Service/RoomService";
 
function DeleteRoom (props) {
    const { idRoom, reLoad } = props;

    const handleDelete =async ()=> {
        const response = await deleteRoom(idRoom);
        if (response){
            alert('Xóa phòng thành công')
            reLoad();
        }
        else {
            alert('Xóa phòng thất bại')
        }
    }

    return (
        <>
            <Popconfirm title="Bạn có chắc muốn xóa không" onConfirm={handleDelete}>
            <Button danger><DeleteOutlined /></Button>
          </Popconfirm>
        </>
    )
}

export default DeleteRoom;