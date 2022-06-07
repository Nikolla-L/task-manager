import React, {useContext, useState} from 'react';
import {Button, Col, Form, Input, Row, Spin, Modal} from 'antd';
import {LoadingOutlined, LoginOutlined} from '@ant-design/icons';
import {UserContext} from "../contexts/UserContext";
import {API} from '../util/API';

export const Login = () => {
    const context = useContext(UserContext)
    const [spinning, setSpinning] = useState(false)

    const login = async (values: any) => {
        setSpinning(true)
        await API.post('auth', values)
            .then((res) => {
                if(res.status === 401) {
                    authFailed()
                    setSpinning(false)
                } else {
                    console.log(res.data)
                    context.setUser(res.data.user)

                    let path = window.location.pathname
                    path = path.slice(1)
                    if(path == 'login') {
                        window.location.href = '/'
                    } else {
                        window.location.reload()
                    }
                }
            })
    };
    
    const authFailed = () => {
        Modal.error({
            title: 'მომხმარებლის სახელი ან პაროლი არასწორია!',
            centered: true,
            maskClosable: true,
            closable: false,
            okButtonProps: {style: {display: 'none'}},
            cancelButtonProps: {style: {display: 'none'}}
        });
    }

    return (
        <Row justify="space-around" align="middle" style={{minHeight: '100vh', minWidth: '100vh'}}>
            <Col>
                <Spin spinning={spinning} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={login}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="იმეილი"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'შეიყვანეთ მომხმარებლის იმეილი',
                            }]}
                            labelCol={{span: 24}}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="პაროლი"
                            name="password"
                            rules={[{
                                required: true,
                                message: 'შეიყვანეთ პაროლი',
                            }]}
                            labelCol={{span: 24}}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item style={{marginBottom: 0, marginRight: 5}}>
                            <Button type="primary" htmlType="submit">
                                <LoginOutlined/>შესვლა
                            </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Col>
        </Row>
    )
};