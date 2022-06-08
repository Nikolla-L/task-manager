import React , { useState } from 'react';
import {Modal, Form, Input, Select, DatePicker, Spin} from 'antd';
import {AppstoreAddOutlined, LoadingOutlined} from "@ant-design/icons";
import moment from 'moment';
import { API } from '../util/API';

const {Option} = Select;
const {TextArea} = Input;

const CreateTaskModal = ({
    openAddModal,
    setOpenAddModal,
    users
}: any) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const sendValues = (values: any) => {
        let formatedDate = moment(values.dueDate).format("yyyy-MM-DD");
        // console.log({...values, dueDate: formatedDate}, '-----------values')
        API.post('/task', {...values, dueDate: formatedDate})
            .then(res => {
                setOpenAddModal(false);
                setLoading(false);
            })
        setLoading(true)
    }

    const validateMessages = {
        required: '${label} აუცილებელია'
    }


    return <Modal
        visible={openAddModal}
        centered
        title={<span>
                <AppstoreAddOutlined />{' '}თასქის დამატებს
            </span>
        } okText='შენახვა'
        okButtonProps={{htmlType: 'submit', form: 'task-form'}}
        cancelText='გაუქმება'
        onCancel={() => setOpenAddModal(false)}
        maskClosable={false}
    >
        <Spin spinning={loading} indicator={<LoadingOutlined style={{fontSize: 34}} spin/>}>
            <Form
                id='task-form'
                form={form}
                onFinish={sendValues}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="დასახელება"
                    name="title"
                    rules={[{
                        required: true,
                        message: 'შეიყვანეთ დასახელება',
                    }]}
                    labelCol={{span: 24}}
                >
                    <Input/>
                </Form.Item>
        
                <Form.Item
                    label="აღწერა"
                    name="description"
                    rules={[{
                        required: true,
                        message: 'აღწერა აუცილებელია',
                    }]}
                    labelCol={{span: 24}}
                >
                    <TextArea rows={4}/>
                </Form.Item>

                <Form.Item
                    label="იუზერების არჩევა"
                    name="userIds"
                    labelCol={{span: 24}}
                >
                    <Select mode="multiple" allowClear style={{width: '100%'}}>
                        {
                            users?.map((user: any) => <Option value={user.id} key={user.id}>{user?.fullName}</Option>)
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="ვადა"
                    name="dueDate"
                    rules={[{
                        required: true,
                        message: 'ვადა აუცილებელია',
                    }]}
                    labelCol={{span: 24}}
                >
                    <DatePicker style={{width: '100%'}} placeholder={(new Date()).toString()}/>
                </Form.Item>
            </Form>
        </Spin>
    </Modal>
}

export default CreateTaskModal;