import React, { useState } from "react";
import { Route, Redirect, Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import HeadComponent from "../../components/HeadComponent";
import { Layout, Menu, Avatar } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
const { Header, Content, Sider } = Layout;

function PrivateLayout(props) {
  const [menus] = useState([
    {
      id: 1,
      link: "/",
      name: "Rooms",
      icon: <VideoCameraOutlined />
    },
    {
      id: 2,
      link: "/customers",
      name: "Customers",
      icon: <UserOutlined />
    }
  ]);
  const location = useLocation();
  return (
    <Layout style={{ height: "100vh" }}>
      <HeadComponent />
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onBreakpoint={broken => {
        //   console.log(broken);
        // }}
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div
          className="logo"
          style={{
            height: "32px",
            background: "rgba(255, 255, 255, 0.2)",
            margin: "16px"
          }}
        />
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
          {menus.map(menu => {
            return (
              <Menu.Item key={menu.link}>
                <Link to={menu.link}>
                  <div>
                    {menu.icon}
                    <span className="nav-text">{menu.name}</span>
                  </div>
                </Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        >
          <div style={{ float: "right", paddingRight: "15px" }}>
            <Avatar size={32} icon={<UserOutlined />} />
          </div>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
}
function PrivateRoute({
  component: Component,
  users: { isAuthenticated },
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <PrivateLayout>
            <Component {...props} />
          </PrivateLayout>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

PrivateRoute.propTypes = {
  users: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps)(PrivateRoute);
