import React from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import {ContactsOutlined, DatabaseOutlined, BlockOutlined, DoubleLeftOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

const menuItems = [ {
    path: '/',
    title: 'სრული სია',
    icon: <DatabaseOutlined/>
}, {
    path: '/my-created',
    title: 'ჩემი შექმნილი',
    icon: <BlockOutlined />
}, {
    path: '/assigned-to-me',
    title: 'ჩემზე მომაგრებული',
    icon: <ContactsOutlined />
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