import React, {useContext} from "react";
import {Header} from "antd/es/layout/layout";
import {Button, Col, Dropdown, Menu, Row} from "antd";
import {DownOutlined, UserOutlined, LogoutOutlined} from "@ant-design/icons";
import {UserContext} from "../contexts/UserContext";
import {API} from "../util/API";

export const MainHeader = ({user, setPageLoading}: any) => {
    const context = useContext(UserContext);

    const logout = async () => {
        setPageLoading(true)
        await API.delete('/auth/logout')
                .then(res => {
                    setPageLoading(false)
                    context.resetUser()
                    window.location.reload()
                })
    };

    const menu = (
        <Menu onClick={logout}>
            <Menu.Item key="1" icon={<LogoutOutlined />}>
                Log Out
            </Menu.Item>
        </Menu>
    );

    return (
        <Header>
            <Row justify="space-between">
                <Col>
                    <div className="logo">Logo</div>
                </Col>
                <Col>
                    <Dropdown overlay={menu}>
                        <Button type="primary" size="large">
                            <UserOutlined/> {JSON.parse(user)?.username} <DownOutlined/>
                        </Button>
                    </Dropdown>
                </Col>
            </Row>
        </Header>
    );
}