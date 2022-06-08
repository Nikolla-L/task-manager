import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { MainHeader } from "./components/Header";
import { Auth } from "./pages/Auth";
import { Navigation } from "./components/Navigation";
import { MainContent } from "./pages/MainContent";
import 'antd/dist/antd.min.css';

function App() {
  const user = localStorage.getItem('user');
  const [pageLoading, setPageLoading] = useState(false);

  if (user) {
    return (
      <BrowserRouter>
        <Spin spinning={pageLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <MainHeader user={user} setPageLoading={setPageLoading}/>
          <Layout>
            <Navigation/>
            <MainContent/>
          </Layout>
        </Spin>
      </BrowserRouter>
    );
  } else {
    return <Auth/>
  }
}

export default App;
