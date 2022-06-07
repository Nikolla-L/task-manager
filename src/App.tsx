import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Layout, Spin } from "antd";
import { MainHeader } from "./components/Header";
import { Login } from "./pages/Login";
import { Navigation } from "./components/Navigation";
import { MainContent } from "./pages/MainContent";
import "antd/dist/antd.css";

function App() {
  const user = localStorage.getItem('user');
  const [pageLoading, setPageLoading] = useState(false);

  if (user) {
    return (
      <BrowserRouter>
        <Spin spinning={pageLoading}>
          <MainHeader user={user} setPageLoading={setPageLoading}/>
          <Layout>
            <Navigation/>
            <MainContent/>
          </Layout>
        </Spin>
      </BrowserRouter>
    );
  } else {
    return <Login/>
  }
}

export default App;
