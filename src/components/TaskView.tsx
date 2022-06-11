import React from 'react';
import { Modal, Card, Skeleton } from 'antd';
import Moment from 'react-moment';
import { statuses, Status } from '../util/constants';

export const TaskView = ({singleTask, setSingleTask, modalLoading, users}: any) => {

  return (
    <Modal
        visible={singleTask != null}
        centered
        okText='დახურვა'
        cancelButtonProps={{style:{display: 'none'}}}
        onOk={() => setSingleTask(null)}
        onCancel={() => setSingleTask(null)}
        maskClosable={true}
        closable={false}
        className="custom-modal"
    >
        <Skeleton loading={modalLoading}>
            <Card size="small" title={<h3>{singleTask?.title}</h3>}>
                <p>
                    <span className="description-span">აღწერა:{' '}</span> 
                    {singleTask?.description}
                </p>
                <p>
                    <span className="description-span">შექმნის დრო:{' '}</span>
                    <Moment format="YYYY-MM-DD">{singleTask?.createdAt}</Moment>
                </p>
                <p>
                    <span className="description-span">ვადა:{' '}</span>
                    <Moment format="YYYY-MM-DD">{singleTask?.dueDate}</Moment>
                </p>
                <p>
                    <span className="description-span">შემქმნელი:{' '}</span> 
                    {users?.find((u: any) => u.id == singleTask?.createdBy)?.fullName}
                </p>
                <p>
                    <span className="description-span">სტატუსი:{' '}</span> 
                    {statuses?.find((s: Status) => s.name == singleTask?.status)?.full}
                </p>
                {
                    singleTask?.assignee &&
                    <p>
                        <span className="description-span">შემსრულებლები:{' '}</span> {
                        singleTask?.assignee?.length == 0 ? 'ცრიელია' :
                        singleTask?.assignee?.map((u: any, i: number) => `${u?.fullName}${i < singleTask?.assignee?.length - 1 ? ',' : ''} `)}
                    </p>
                }
            </Card>
        </Skeleton>
    </Modal>
  )
}