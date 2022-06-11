import React, {useState, useEffect} from 'react';
import {Table, Popconfirm, Button, Modal, Skeleton, Card, Tooltip, Form,  Select, DatePicker} from 'antd';
import {LoadingOutlined, CalendarOutlined, DeleteOutlined, CiCircleFilled, EditOutlined, PlusOutlined} from "@ant-design/icons";
import Moment from "react-moment";
import moment from 'moment';
import { API } from '../../util/API';
import CreateTaskModal from './CreateTaskModal';
import ChangeStatusModal from './ChangeStatusModal';
import { statuses } from '../../util/constants';
import { TaskView } from '../../components/TaskView';

const {Column} = Table;
const {Option} = Select;

const FullList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [users, setUsers]: any = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [singleTask, setSingleTask]: any = useState(null);
  const [filterForm]= Form.useForm();
  const [filterData, setFilterData]: any = useState({});
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openStatusModal, setOpenStatusModal]: any = useState(null);

  const getData = (values: any) => {
    setLoadingTable(true);
    API.get('/task', {params: {...values}})
      .then(res => {
        setLoadingTable(false);
        setDataSource(res.data);
      })
  }

  useEffect(() => {
    API.get('/user')
      .then(res => {
        setUsers(res.data);
      })
  }, []);

  useEffect(() => {
    if(!openAddModal && !openStatusModal) {
      getData(filterData);
    }
  }, [openAddModal, openStatusModal])

  const deleteTask = (id: number) => {
    API.delete(`/task/${id}`)
      .then(res => {
        getData(filterData);
      })
  }

  return <>
    <TaskView
      users={users}
      modalLoading={modalLoading}
      singleTask={singleTask}
      setSingleTask={setSingleTask}
    />

    <ChangeStatusModal
      statuses={statuses}
      setOpenStatusModal={setOpenStatusModal}
      openStatusModal={openStatusModal}
    />
    
    <CreateTaskModal
      users={users} 
      openAddModal={openAddModal}
      setOpenAddModal={setOpenAddModal}
    />

    <h3 style={{marginLeft: 25}}><b>სრული სია</b> <i>(გაფილტვრა, შექმნა, სტატუსის შეცვლა, წაშლა)</i></h3>
    <section className="section-wrapper">
      <div className="filters-wrapper">
        <Form form={filterForm}>
          <div className="wrap">
            <Form.Item name='userId'>
              <Select
                placeholder="მომხმარებელი"
                onChange={v => {
                  getData({...filterData, userId: v});;
                  setFilterData({...filterData, userId: v});
                }}>
                {
                  users?.map((user: any) => <Option key={user?.id} value={user?.id}>{user?.fullName}</Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item name='status'>
              <Select
                placeholder="სტატუსი"
                onChange={v => {
                  getData({...filterData, status: v});
                  setFilterData({...filterData, status: v});
                }}>
                {
                  statuses?.map(status => <Option key={status.name} value={status.name}>{status.full}</Option>)
                }
              </Select>
            </Form.Item>
            <Form.Item name="dueDate">
              <DatePicker
                format={'YYYY-MM-DD'}
                placeholder="ვადა"
                suffixIcon={<CalendarOutlined />}
                onChange={v => {
                  getData({...filterData, dueDate: moment(v).format('YYYY-MM-DD')});
                  setFilterData({...filterData, dueDate: moment(v).format('YYYY-MM-DD')});
                }}
              />
            </Form.Item>
            <Button onClick={() => {
              getData({});
              setFilterData({});
            }}>
              გასუფთავება
            </Button>
          </div>
        </Form>
      </div>
      <Button onClick={() => setOpenAddModal(true)}>
        <PlusOutlined />
        შექმნა
      </Button>
    </section>
    <div className="table-wrapper">
      <Table
        size='small'
        dataSource={dataSource || []}
        pagination={{ defaultPageSize: 25, showSizeChanger: false, hideOnSinglePage: true}}
        loading={loadingTable ? {
          indicator: <LoadingOutlined style={{fontSize: 34}} spin/>
        } : false}
        rowKey="id"
        onRow={(rec, rowIndex) => ({
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
          } else if(value == 'DONE') {
            return <Tooltip title="გაკეთებული">
              <CiCircleFilled style={{color: 'green'}} />
            </Tooltip>
          }
        }}/>
        <Column
          title="მოქმედება"
          align="center"
          render={(_, r: any) => <div onClick={e => e.stopPropagation()}>
            <Tooltip title="სტატუსის შეცვლა">
              <Button 
                disabled={(() => {
                    let currentId = JSON.parse(localStorage.getItem('user') || '{}').id;
                    return !(currentId == r.createdBy || r.assignee.some((user: any) => user.id == currentId));
                  })()
                }
                onClick={(e) => {e.stopPropagation(); setOpenStatusModal(r)}}
              >
                <EditOutlined />
              </Button>
            </Tooltip> {'  '}
            <Popconfirm
              title="ნამდვილად გსურთ თასქის წაშლა?"
              onConfirm={() => deleteTask(r?.id)}
              okText="დიახ"
              cancelText="არა"
              placement="leftTop"
              disabled={JSON.parse(localStorage.getItem('user') || '{}').id != r.createdBy}
            >
              <Tooltip title="წაშლა">
                <Button disabled={JSON.parse(localStorage.getItem('user') || '{}').id != r.createdBy} onClick={e => {e.stopPropagation()}}>
                  <DeleteOutlined/>
                </Button>
              </Tooltip>
            </Popconfirm>
          </div>}
        />
      </Table>
    </div>
  </>
}

export default FullList
