import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import { Droppable } from 'react-beautiful-dnd';
import { Task } from './Task';
import { Empty } from 'antd';


const Column = ({id, tasks, title, loading}: any) => {
  return <div className="column-wrap">
        <Spin spinning={loading} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}>
            <h4>{title}</h4>
            <div className="column">
                <Droppable droppableId={id}>
                {(provided: any) => (
                    <div
                        ref={provided?.innerRef}
                        {...provided?.droppableProps}
                        {...provided.draggableProps}
                    >
                        {
                            tasks?.length == 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
                            tasks?.map(((task: any, index: number) => (
                                <Task key={task.id} task={task} index={index} />
                            )))
                        }
                        {provided.placeholder}
                    </div>
                )}
                </Droppable>
            </div>
        </Spin>
    </div>
}

export default Column