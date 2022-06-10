import React, { useState } from 'react';
import { Modal, Select, Form , Spin } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { API } from '../../util/API';

const {Option} = Select;

const ChangeStatusModal = ({
    statuses,
    openStatusModal,
    setOpenStatusModal
}: any) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const sendValues = (values: any) => {
        setLoading(true);
        setLoading(false);
        const link = statuses?.find((s: any) => s.name == values.status)?.link;
        if(link) {
            API.put(`${link}/${openStatusModal.id}`)
            .then(res => {
                setLoading(false);
                setOpenStatusModal(null);
            })
        }
    }

    return <Modal
        visible={openStatusModal != null}
        centered
        title={<span>
                <EditOutlined />{' '}სტატუსის შეცვლა
            </span>
        } okText='შენახვა'
        okButtonProps={{htmlType: 'submit', form: 'status-form'}}
        cancelText='გაუქმება'
        onCancel={() => setOpenStatusModal(null)}
        maskClosable={true}
    >
        <Spin spinning={loading}>
            <Form
                id='status-form'
                form={form}
                onFinish={sendValues}
                initialValues={{status: openStatusModal?.status}}
            >
                <Form.Item name='status'>
                    <Select placeholder="მომხმარებელი">
                        {
                            statuses?.map((status: any) => <Option key={status.name} value={status.name}>{status.full}</Option>)
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Spin>
    </Modal>
}

export default ChangeStatusModal