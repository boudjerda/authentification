import React,{Fragment,useState,useEffect} from "react";
import {toast} from "react-toastify";
import 'antd/dist/antd.css';
import '../../../src/components/css/Main.css';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const Main = ({setAuth}) =>{
          const [name,setName]=useState("");
        const [collapsed,setCollapsed]=useState(false)
          const toggle = () => {
              setCollapsed(!collapsed)
              
          };

          async function getName (){
            try {
                const response = await fetch("http://localhost:5000/dashboard/",{
                    method:"GET",
                    headers:{token:localStorage.token}
                })
                const parseRes = await response.json()
                console.log(parseRes)
            } catch (err) {
                console.error(err.message)
            }
        }
        const logout = e =>{
            e.preventDefault();
            localStorage.removeItem("token");
            setAuth(false)
            toast.success("logout")
        }
        useEffect(()=>{
            getName()
        },[])
    return (
      <Layout className="my-layout">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} 
            
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <button onClick={e => logout(e)}> logout</button>
          </Content>
        </Layout>
      </Layout>
    );
  }

export default Main;