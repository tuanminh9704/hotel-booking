import { Layout, Menu } from 'antd'
import './layoutDefault.scss'
import logo from '../image/logo.png'
import logoFold from '../image/logo-fold.png'
import { MenuUnfoldOutlined, SearchOutlined, MenuFoldOutlined, DashboardOutlined, PlusOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Notification from '../components/notification'
const { Sider, Content } = Layout;

function LayoutDefault() {
  const [collapsed, setCollapsed] = useState(false);
  const items = [
    {
      label: <Link to="" >Bảng điều khiển</Link>,
      icon: <DashboardOutlined />,
      key: 'menu-1',
    },
    {
      label: <Link to='create-room'>Thêm phòng</Link>,
      icon: <PlusOutlined />,
      key: 'create-room'
    },
    {
      label: <Link to='list-room'>Danh sách phòng</Link>,
      icon: <UnorderedListOutlined />,
      key: 'list-room'
    }
  ]

  return (
    <>
      <Layout className='layout-default'>
        <header className='layout-default__header'>
          <div className="header">
            <div className={"header__logo " + (collapsed && 'header__logo--fold')} >
              <img src={collapsed ? (logoFold) : (logo)} alt='logo'></img>
            </div>
            <div className='header__body'>
              <div className='header__body-left'>
                <div className='menu' onClick={() => { setCollapsed(!collapsed) }}>{collapsed ? (<MenuUnfoldOutlined />):(<MenuFoldOutlined />)}</div>
                <div className='search'><SearchOutlined /></div>
              </div>
              <div className='header__body-right'>
                <Notification />
              </div>
            </div>
          </div>
        </header>
        <Layout>
          <Sider className='layout-default__sider'
            theme='light' collapsed={collapsed}
            width={250}>
            <Menu items={items} mode='inline' defaultOpenKeys={['menu-1']} defaultSelectedKeys={['menu-1']}></Menu>
          </Sider>
          <Content className={'layout-default__content '+ (collapsed && 'layout-default__content--collapsed')}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutDefault;