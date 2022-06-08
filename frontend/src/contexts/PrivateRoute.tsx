import {useEffect, useContext} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {UserContext} from './UserContext';
import {Modal, Typography} from 'antd';
import {HourglassOutlined} from '@ant-design/icons';

const {Title} = Typography;
const {confirm} = Modal;

const PrivateRoute = ({children}: any) => {
    const context = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()
    const expirationMins = 30

    const showExpirationModal = () => {
        confirm({
            icon: <HourglassOutlined/>,
            content: <Title level={4}>
                თქვენი ავტორიზაციის დრო ამოიწურა!
            </Title>,
            onOk() {
                window.location.reload()
            },
            centered: true,
            okText: 'დახურვა',
            maskClosable: false,
            cancelButtonProps: { style: { display: 'none' } }
        })
    }

    const makeInterval = () => setInterval(() => {
        showExpirationModal()
    }, expirationMins*60000)

    makeInterval()

    useEffect(() => {
        if(context?.user) {
            if (context.user.expireMinutes <= (new Date()).getTime()) {
                context.resetUser()
            }
        }
    }, [location])

    return context.user ? children : (() => navigate('/login'))()
}

export default PrivateRoute