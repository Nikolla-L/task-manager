import React, {useContext, useState, useEffect} from 'react';
import {Button, Col, Form, Input, Row, Spin, Modal, Space} from 'antd';
import {LoadingOutlined, LoginOutlined, SaveOutlined} from '@ant-design/icons';
import {UserContext} from "../contexts/UserContext";
import {API} from '../util/API';

export const Auth = () => {
    const context = useContext(UserContext);
    const [spinning, setSpinning] = useState(false);
    const [mode, setMode] = useState('');
    const [loginForm] = Form.useForm();
    const [registrationForm] = Form.useForm();
    const [registrationValues, setRegistrationValues] = useState(null);
    const [codeId, setCodeId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');

    const register = async (values: any) => {
        setSpinning(true)
        await API.post('user', values)
            .then(res => {
                if(res.status === 400) {
                    setSpinning(false);
                } else {
                    setMode('login');
                    setSpinning(false);
                }
                setRegistrationValues(null);
            })
    }

    const getCode = async (values: any) => {
        setSpinning(true);
        await API.post('user/get-code', {email: values.email})
            .then(res => {
                setShowModal(true);
                setCodeId(res.data.codeId);
                setRegistrationValues(values);
                setSpinning(false);
            }).catch(error => {
                if(error.response.data.statusCode == 400) {
                    requestFailed('იმეილი უკვე გამოყენებულია!');
                    setShowModal(false);
                    setSpinning(false);
                }
            })
    }

    const sendCode = async() => {
        await API.post('user/confirm-code', {id: codeId, code: code})
            .then(res => {
                setCode('');
                setShowModal(false);
                setCodeId(null);
                if(res.data) {
                    register(registrationValues);
                } else {
                    requestFailed('კოდი არასწორია')
                }
            })
    }

    const login = async (values: any) => {
        setSpinning(true)
        await API.post('auth', values)
            .then((res) => {
                if(res.status === 401) {
                    requestFailed('მომხმარებლის სახელი ან პაროლი არასწორია!');
                    setSpinning(false);
                } else {
                    context.setUser({...res.data.user, token: res.data.access_token});

                    let path = window.location.pathname;
                    path = path.slice(1);
                    if(path == 'login') {
                        window.location.href = '/';
                    } else {
                        window.location.reload();
                    }
                    let searchParams = new URLSearchParams(window.location.search);
                    searchParams.delete('mode');
                    window.location.search = searchParams.toString();
                }
            })
    };
    
    const requestFailed = (text: string) => {
        Modal.error({
            title: text,
            centered: true,
            maskClosable: true,
            closable: false,
            okButtonProps: {style: {display: 'none'}},
            cancelButtonProps: {style: {display: 'none'}}
        });
    }

    const changeMode = () => {
        setSpinning(true);
        if ('URLSearchParams' in window) {
            let searchParams = new URLSearchParams(window.location.search);
            if (mode == "register") {
                searchParams.set('mode', 'login');
            } else if (mode == "login") {
                searchParams.set('mode', 'register');
            } else {
                searchParams.set('mode', 'login');
            }
            setSpinning(false);
            window.location.search = searchParams.toString();
        }
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const currentMode =  queryParams.get("mode");
        if (currentMode == "login") {
          setMode("login");
        } else if (currentMode == "register") {
          setMode("register");
        } else {
          setMode("login");
        }
    }, []);

    const validateMessages = {
        required: '${label} აუცილებელია',
        types: {
            email: '${label}ს ფორმატი არასწორია!'
        }
    }
    
    return <>
        <Modal
            visible={showModal}
            centered
            title={<span>
                    კოდის გაგზავნა
                </span>
            } okText='რეგისტრაცია'
            cancelText='გაუქმება'
            onOk={sendCode}
            okButtonProps={{disabled: code == ''}}
            onCancel={() => {
                setShowModal(false);
                setCodeId(null);
                setCodeId(null);
            }}
            maskClosable={false}
        >
            <Input value={code} onChange={e => setCode(e.target.value)}/>
        </Modal>

        <Row justify="space-around" align="middle" className='auth-wrapper'>
            <Col>
                <Spin spinning={spinning} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
                    {
                        mode === 'register' ? 
                        <Form
                            form={registrationForm}
                            onFinish={getCode}
                            className='auth-form'
                            validateMessages={validateMessages}
                        >
                            <h2>რეგისტრაცია</h2>
                            <Form.Item
                                label="სახელი"
                                name="fullName"
                                rules={[{
                                    required: true,
                                    message: 'შეიყვანეთ მომხმარებლის სრული სახელი',
                                }]}
                                labelCol={{span: 24}}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="იმეილი"
                                name="email"
                                rules={[{
                                    required: true,
                                    message: 'შეიყვანეთ მომხმარებლის იმეილი',
                                }, {type: 'email'}]}
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


                            <Form.Item
                                name="confirm_password"
                                label="პაროლის გამეორება"
                                rules={[
                                    {required: true, message: 'გაიმეორეთ პაროლი'},
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('პაროლი არ ემთხვევა!'));
                                        },
                                    }),
                                ]}
                                labelCol={{span: 24}}
                            >
                                <Input.Password placeholder="პაროლის გამეორება"/>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    <SaveOutlined />რეგისტრაცია
                                </Button>
                            </Form.Item>

                            <span className='login-link' onClick={changeMode}>ავტორიზაცია</span>
                            <h3 style={{marginTop: 15}}>
                                <b>Task Managment</b>
                                {' '}
                                <i>&#169; 2022</i>
                            </h3>
                        </Form>
                        : <Form
                            form={loginForm}
                            onFinish={login}
                            autoComplete="off"
                            className='auth-form'
                            validateMessages={validateMessages}
                        >
                            <h2>ავტორიზაცია</h2>
                            <Form.Item
                                label="იმეილი"
                                name="email"
                                rules={[{
                                    required: true,
                                    message: 'შეიყვანეთ მომხმარებლის იმეილი',
                                }, {type: 'email'}]}
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
    
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    <LoginOutlined/>შესვლა
                                </Button>
                            </Form.Item>
                            
                            <span className='login-link' onClick={changeMode}>რეგისტრაცია</span>
                            <h3 style={{marginTop: 15}}>
                                <b>Task Managment</b>
                                {' '}
                                <i>&#169; 2022</i>
                            </h3>
                        </Form>
                    }
                </Spin>
            </Col>
        </Row>
    </>
};