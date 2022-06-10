import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Moment from "react-moment";


export const Task = (props: any) => {

    return (
        <Draggable
            draggableId={props.task?.id.toString()}
            index={props.index}
        >
            {(provided: any) => (
                <div
                    className="task-wrapper"
                    {...provided?.draggableProps}
                    {...provided?.dragHandleProps}
                    ref={provided?.innerRef}
                >
                    <p>
                        {props.task.title}
                    </p>
                    <span>
                        შექმნის თარიღი: <Moment format="YYYY-MM-DD">{props.task?.dueDate}</Moment>
                    </span><br/>
                    <span>
                        ვადა: <Moment format="YYYY-MM-DD">{props.task?.dueDate}</Moment>
                    </span>
                </div>
            )}
        </Draggable>
    )
}
