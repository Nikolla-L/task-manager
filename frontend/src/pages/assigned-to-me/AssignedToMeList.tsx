import React, {useEffect, useState} from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd'
import { API } from '../../util/API';

const AssignedToMeList = () => {
  const [data, setData]:any = useState({});
  const [loading, setLoading]: any = useState(false);
  const statuses: Array<any> = [{
    name: 'TODO',
    full: 'გასაკეთებელი',
    link: 'task/make-todo'
  }, {
    name: 'PROGRESS',
    full: 'პროცესში',
    link: 'task/make-in-progress'
  }, {
    name: 'DONE',
    full: 'გაკეთებული',
    link: 'task/make-done'
  }];
  

  useEffect(() => {
    setLoading(true);
    API.get('/task/assigned-to-me')
      .then(res => {
        setLoading(false);
        let todo = res.data?.filter((task: any) => task.status == 'TODO')
        let progress = res.data?.filter((task: any) => task.status == 'PROGRESS')
        let done = res.data?.filter((task: any) => task.status == 'DONE')
        setData({columns: {todo: todo, progress: progress, done: done}})
      })
  }, [])

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    const status = result.destination.droppableId;
    const destinationIndex = result.destination.index;
    const sourceIndex = result.source.index;
    if(start === finish) {

      let dataArr = data;
      let sourceKey = result.source.droppableId.toLowerCase();
      let destinationKey = status.toLowerCase();
      let objData = dataArr.columns[sourceKey].find((t:any) => t.id == result.draggableId);
      if(objData) {
        dataArr.columns[sourceKey].splice(sourceIndex, 1);
        dataArr.columns[destinationKey].splice(destinationIndex, 0, objData);
        setData(dataArr);
      }

      if (status != result.source.droppableId) {
        const link = statuses?.find((s: any) => s.name == status)?.link;
        setLoading(status);
        if(link) {
          API.put(`${link}/${result.draggableId}`)
          .then(res => {
            setLoading(false)
          })
        }
      }
      return;
    }
  }

  return <>
    <h3 style={{marginBottom: 25}}>ჩემზე მომაგრებული თასქები</h3>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="columns-wrapper">
        <Column
          tasks={data?.columns?.todo}
          id={'TODO'}
          title='გასაკეთებელი'
          loading={loading == 'TODO' || loading == true}
        />
        <Column
          tasks={data?.columns?.progress}
          id={'PROGRESS'}
          title='პროგრესში'
          loading={loading == 'PROGRESS' || loading == true}
        />
        <Column
          tasks={data?.columns?.done}
          id={'DONE'}
          title='გაკეთებული'
          loading={loading == 'DONE' || loading == true}
        />
      </div>
    </DragDropContext>
  </>
}

export default AssignedToMeList;