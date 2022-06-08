import React, {useEffect, useState} from 'react';
import { Table, Tooltip } from 'antd';
import {LoadingOutlined, CiCircleFilled} from "@ant-design/icons";
import Moment from "react-moment";
import { API } from '../util/API';

const {Column} = Table;

const MyCreatedList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    setLoadingTable(true);
    API.get('/task/my-created')
      .then(res => {
        setDataSource(res.data);
        setLoadingTable(false);
      })
  }, []);

  return (
    <div className="table-wrapper">
      <Table
        size='small'
        dataSource={dataSource || []}
        pagination={{ defaultPageSize: 25, showSizeChanger: false, hideOnSinglePage: true}}
        loading={loadingTable ? {
          indicator: <LoadingOutlined style={{fontSize: 34}} spin/>
        } : false}
        rowKey="id"
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
          } else if(value == 'DONE') {
            return <Tooltip title="გაკეთებული">
              <CiCircleFilled style={{color: 'green'}} />
            </Tooltip>
          }
        }}/>
      </Table>
    </div>
  )
}

export default MyCreatedList;