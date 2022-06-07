import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {
    CarOutlined,
    DatabaseOutlined,
    PieChartOutlined,
    SettingOutlined,
    SoundOutlined,
    TeamOutlined,
    ToolOutlined,
    KeyOutlined,
    DoubleLeftOutlined
} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

const menuItems = [{
    path: '/users',
    title: 'მომხმარებლები',
    icon: <TeamOutlined/>
}, {
    path: '/administration',
    title: 'მართვა',
    icon: <SettingOutlined/>
}, /*{
	path: '/prices',
	title: 'ტარიფები',
	icon: <ControlOutlined/>
}, */{
    path: '/waiting-events',
    title: 'მიმდინარე',
    icon: <SoundOutlined/>
}, {
    path: '/',
    title: 'სრული სია',
    icon: <DatabaseOutlined/>
}, {
    path: '/cars',
    title: 'მანქანების სია',
    icon: <CarOutlined/>
},{
    path: '/accesses',
    title: 'წვდომა',
    icon: <KeyOutlined />
},{
    path: '/reports',
    title: 'რეპორტები',
    icon: <PieChartOutlined/>
}, {
    path: '/test-page',
    title: 'Test Page',
    icon: <ToolOutlined/>
}];

export const Navigation = () => (
    <Sider defaultCollapsed trigger={<DoubleLeftOutlined/>} collapsible width={250}>
        <Menu theme="dark" defaultSelectedKeys={[window.location.pathname]} mode="inline">
            {
                menuItems.map(item => {
                    return (<Menu.Item key={item.path} icon={item.icon}>
                            <span>{item.title}</span>
                            <Link to={item.path}/>
                        </Menu.Item>
                    );
                })
            }
        </Menu>
    </Sider>
);