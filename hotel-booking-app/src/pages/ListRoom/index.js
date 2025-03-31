import { useEffect, useState } from "react";
import { getListRoom } from "../../Service/RoomService";
import './ListRoom.scss'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import GridRoom from "./GridRoom";
import TableRoom from "./TableRoom";

function ListRoom() {
  const [rooms, setRooms] = useState([]);

  const fetchAPI = async () => {
    const response = await getListRoom();
    setRooms(response);
  }
  
  useEffect(() => {
    fetchAPI();
  }, [])

  const handleReload = () => {
    fetchAPI();
  }

  const items = [
    {
      key: "grid",
      label: <><AppstoreOutlined /></>,
      children: <GridRoom record={rooms} />,
    },
    {
      key: "table",
      label: <BarsOutlined />,
      children: <TableRoom record={rooms} reLoad={handleReload} />,
    }
  ]
  
  return (
    <>
      <h2>List room</h2>
      <Tabs items={items} />
    </>
  )
}

export default ListRoom;