import React, { useState, useEffect, useContext } from 'react';
import { Card, Skeleton, Tooltip, Modal, Form, Input, Spin } from 'antd';
import { UserOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import Moment from 'react-moment';
import { API } from '../util/API';
import {UserContext} from "../contexts/UserContext";

const { Meta } = Card;
const { confirm } = Modal;

const Settings = ({setPageLoading}: any) => {
    const [loading, setLoading] = useState(true);
    const [myData, setMyData]: any = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const context = useContext(UserContext);
    const [form] = Form.useForm();

    useEffect(() => {
        setMyData(JSON.parse(localStorage.getItem('user') || '{}'))
        setTimeout(() => {
            setLoading(false)
        }, 1200);
    }, []);

    const deleteAccount = () => {
        setPageLoading(true);
        API.delete(`/user/${myData?.id}`)
            .then(res => {
                context.resetUser();
                window.location.reload();
            })
    }

    const showDeleteConfirm = () => {
        confirm({
            title: 'ექაუნთის წაშლა',
            icon: <ExclamationCircleOutlined />,
            content: 'დარწმუნებული ხართ რომ გსურთ საკუთარი ექაუნთის წაშლა?',
            okText: 'დიახ',
            okType: 'danger',
            cancelText: 'არა',
            onOk() {
             deleteAccount();
            }
        });
    };

    const sendEditedData = (values: any) => {
        setLoading(true);
        API.put(`/user/${myData?.id}`, values)
            .then(res => {
                if(res.status === 400) {
                    setLoading(false);
                    setShowEdit(false);
                } else {
                    let data = res.data;
                    delete data.password;
                    setMyData({...myData, ...data})
                    localStorage.setItem('user', JSON.stringify({...myData, ...data}));
                    setShowEdit(false);
                    setLoading(false);
                }
            })
    }

    const validateMessages = {
        required: '${label} აუცილებელია',
        types: {
            email: '${label}ს ფორმატი არასწორია!'
        }
    }

    return <>
            <Modal
                visible={showEdit}
                centered
                title={<span>
                        <EditOutlined />{' '}ინფორმაციის რედაქტირება
                    </span>
                } okText='შენახვა'
                okButtonProps={{htmlType: 'submit', form: 'form'}}
                cancelText='გაუქმება'
                onCancel={() => {
                    setShowEdit(false)
                    form.resetFields();
                }}
                maskClosable={false}
                className="custom-modal"
            >
                <Spin spinning={loading} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}>
                    <Form
                        id="form"
                        form={form}
                        onFinish={sendEditedData}
                        initialValues={myData}
                        validateMessages={validateMessages}
                    >
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
                    </Form>
                </Spin>
            </Modal>
            
            <Card style={{ width: 300, marginTop: 16 }}
                actions={[
                    <Tooltip title="ინფორმაციის რედაქტირება" placement='right'>
                        <EditOutlined onClick={() => setShowEdit(true)}/>
                    </Tooltip>,
                    <Tooltip title="ექაუნთის წაშლა" placement='right'>
                        <DeleteOutlined style={{color: 'red'}} onClick={showDeleteConfirm} />
                    </Tooltip>
                ]}
            >
                <Skeleton avatar loading={loading}>
                    <Meta
                        avatar={<UserOutlined style={{fontSize: 32}} />}
                        title={<h3>{myData?.fullName}</h3>}
                    />
                    <div style={{margin: '30px 0 0'}}>
                        <span>იმეილი:{' '}</span>
                        {myData?.email}
                    </div>
                    <div style={{margin: '30px 0 0'}}>
                        <span>რეგისტრაციის თარიღი:{' '}</span>
                        <Moment format="YYYY-MM-DD">{myData?.createdAt}</Moment>
                    </div>
                </Skeleton>
            </Card>
        </>
}

export default Settings