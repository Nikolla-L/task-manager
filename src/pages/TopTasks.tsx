import React, {useEffect, useState} from 'react';
import { Table, Tooltip } from 'antd';
import {LoadingOutlined, CiCircleFilled} from "@ant-design/icons";
import Moment from "react-moment";
import { API } from '../util/API';
import { TaskView } from '../components/TaskView';

const {Column} = Table;

const TopTasks = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [singleTask, setSingleTask]: any = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoadingTable(true);
    API.get('/task/top')
      .then(res => {
        setDataSource(res.data);
        setLoadingTable(false);
      })

    API.get('/user')
      .then(res => {
        setUsers(res.data);
      })
  }, [])

  return <>
    <TaskView
      modalLoading={modalLoading}
      singleTask={singleTask}
      setSingleTask={setSingleTask}
      users={users}
    />
    
    <div className="table-wrapper">
      <h3 style={{marginBottom: 25}}>ტოპ 10 ვადის ამოწურვასთან ახლოს მყოფი გაუკეთებელი თასქი</h3>
      <Table
        size='small'
        dataSource={dataSource || []}
        pagination={{ defaultPageSize: 25, showSizeChanger: false, hideOnSinglePage: true}}
        loading={loadingTable ? {
          indicator: <LoadingOutlined style={{fontSize: 34}} spin/>
        } : false}
        rowKey="id"
        onRow={rec => ({
          onClick(e) {
            setModalLoading(true);
            setSingleTask(rec);
            setTimeout(() => {
              setModalLoading(false);
            }, 1200);
          }
        })}
      >
        <Column title="დასახელება" dataIndex="title"/>
        <Column title="შექმნის დრო" dataIndex="createDate" render={text => {
          return <Moment format="YYYY-MM-DD">{text}</Moment>
        }}/>
        <Column title="ვადა" dataIndex="dueDate" render={text => {
          return <Moment format="YYYY-MM-DD">{text}</Moment>
        }}/>
        <Column align="center" title="სტატუსი" dataIndex="status" render={value => {
          if(value == 'TODO') {
            return  <Tooltip title="გასაკეთებელი">
              <CiCircleFilled style={{color: 'red'}} />
            </Tooltip>
          } else if(value == 'PROGRESS') {
            return <Tooltip title="პროგრესში">
              <CiCircleFilled style={{color: 'yellow'}} />
            </Tooltip>
          }
        }}/>
      </Table>
    </div>
  </>
}

export default TopTasks