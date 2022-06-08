import ReactDOM from 'react-dom/client';
import App from './App';
import { UserContextProvider } from './contexts/UserContext';
import { Layout } from 'antd';
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <UserContextProvider>
    <Layout style={{minHeight: '100vh', minWidth: '100vh'}}>
      <App />
    </Layout>
  </UserContextProvider>
);