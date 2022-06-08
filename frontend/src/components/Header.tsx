import React, {useContext} from "react";
import {Header} from "antd/es/layout/layout";
import {Button, Col, Dropdown, Menu, Row} from "antd";
import {DownOutlined, UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {UserContext} from "../contexts/UserContext";

export const MainHeader = ({user, setPageLoading}: any) => {
    const context = useContext(UserContext);

    const logout = () => {
        setPageLoading(true);
        setTimeout(() => {
           context.resetUser();
           window.location.reload();
        }, 1500);
    };

    const menu = (
        <Menu onClick={logout}>
            <Menu.Item key="1" icon={<LogoutOutlined />}>
                გასვლა
            </Menu.Item>
        </Menu>
    );

    return (
        <Header>
            <Row justify="space-between">
                <Col>
                    <div className="logo">
                        <h2>Task Manager</h2>
                    </div>
                </Col>
                <Col>
                    <Dropdown overlay={menu}>
                        <Button type="primary" size="large">
                            <UserOutlined/> {JSON.parse(user)?.fullName} <DownOutlined/>
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    );
}