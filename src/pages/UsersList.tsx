import React, { useState, useEffect } from 'react';
import { Table, } from 'antd';
import { LoadingOutlined } from "@ant-design/icons";
import Moment from "react-moment";
import { API } from '../util/API';

const {Column} = Table;

const UsersList = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        setLoadingTable(true);
        API.get('/user')
          .then(res => {
            setDataSource(res.data);
            setLoadingTable(false);
        })
    }, [])

    return (
        <div className="table-wrapper">
            <h3 style={{marginBottom: 25}}>იუზერების სია</h3>
            <Table
                size='small'
                dataSource={dataSource || []}
                pagination={{ defaultPageSize: 25, showSizeChanger: false, hideOnSinglePage: true}}
                loading={loadingTable ? {
                indicator: <LoadingOutlined style={{fontSize: 34}} spin/>
                } : false}
                rowKey="id"
            >
                <Column title="ID" dataIndex="id"/>
                <Column title="სრული სახელი" dataIndex="fullName"/>
                <Column title="იმეილი" dataIndex="email"/>
                <Column title="რეგისტრაციის დრო" dataIndex="createDate" render={text => {
                    return <Moment format="YYYY-MM-DD">{text}</Moment>
                }}/>
            </Table>
        </div>
    )
}

export default UsersList