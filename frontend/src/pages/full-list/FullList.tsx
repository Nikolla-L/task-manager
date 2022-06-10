import React, {useState, useEffect} from 'react';
import {Table, Popconfirm, Button, Modal, Skeleton, Card, Tooltip, Form,  Select, DatePicker} from 'antd';
import {LoadingOutlined, CalendarOutlined, DeleteOutlined, CiCircleFilled, EditOutlined, PlusOutlined} from "@ant-design/icons";
import Moment from "react-moment";
import { API } from '../../util/API';
import CreateTaskModal from './CreateTaskModal';
import ChangeStatusModal from './ChangeStatusModal';
import moment from 'moment';

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
    <Modal
      visible={singleTask != null}
      centered
      okText='დახურვა'
      cancelButtonProps={{style:{display: 'none'}}}
      onOk={() => setSingleTask(null)}
      onCancel={() => setSingleTask(null)}
      maskClosable={true}
      closable={false}
    >
      <Skeleton loading={modalLoading}>
        <Card size="small" title={singleTask?.title}>
          <p><span className="description-span">აღწერა</span>: {singleTask?.description}</p>
          <p><span className="description-span">შექმნის დრო</span>: <Moment format="YYYY-MM-DD">{singleTask?.createdAt}</Moment></p>
          <p><span className="description-span">ვადა</span>: <Moment format="YYYY-MM-DD">{singleTask?.dueDate}</Moment></p>
          <p><span className="description-span">შემნქმნელი:</span> {users?.find((u: any) => u.id == singleTask?.createdBy)?.fullName}</p>
          <p><span className="description-span">სტატუსი:</span> {statuses?.find(s => s.name == singleTask?.status)?.full}</p>
          <p><span className="description-span">შემსრულებლები:</span> {
            singleTask?.assignee?.length == 0 ? 'ცრიელია' :
            singleTask?.assignee?.map((u: any) => `${u?.fullName}, `)
          }</p>
        </Card>
      </Skeleton>
    </Modal>

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

    <h3 style={{marginLeft: 25}}><b>სრული სია</b> <i>(გაფილტვრა, შექმნა, ინდივიდულაურის ნახვა, სტატუსის შეცვლა, წაშლა)</i></h3>
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
              <Button  disabled={JSON.parse(localStorage.getItem('user') || '{}').id != r.createdBy} onClick={(e) => {e.stopPropagation(); setOpenStatusModal(r)}}>
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
