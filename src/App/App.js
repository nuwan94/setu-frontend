import React, { Component, useState, useEffect } from "react";
import "./App.css";
import Auth from "../Auth/Auth";
import "antd/dist/antd.css";
import "./App.css";
import { Badge, Card, Table, Button, Layout } from "antd";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";

const { Header, Content, Footer } = Layout;
const auth = new Auth();

const BASE_URL = "https://setu-api.azurewebsites.net";

const USERS_API_URL = BASE_URL + "/students";
const FILE_UPLAOD_URL = BASE_URL + "/reports/upload";

const AppContent = () => {
  const [tableData, setTableData] = useState({ source: "Loading.." });
  // const [fileList, setFileList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      title: "Student No",
      dataIndex: "studentNo",
      key: "studentNo",
      width: 300,
      sorter: (a, b) => {
        return a.studentNo.localeCompare(b.studentNo);
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => {
        return a.company.localeCompare(b.company);
      },
    },
  ];

  const uploadOptions = {
    name: "report",
    action: FILE_UPLAOD_URL,
    headers: {},
    // fileList,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  useEffect(() => {
    Axios.get(USERS_API_URL).then((res) => {
      setTableData(res.data);
      setIsLoading(false);
    });
  });

  return (
    <Layout>
      <Header className="header">
        <img className="logo" src="./logo.png" alt="logo" />
        <div style={{ float: "right" }}>
          <Button onClick={() => auth.logout()} type="primary" danger>
            Logout
          </Button>
        </div>
      </Header>
      <Content style={{ padding: "25px" }}>
        <Layout className="site-layout-background" style={{ padding: "0" }}>
          <Content
            className="site-layout-background"
            style={{ padding: "24px", minHeight: 280 }}
          >
            <h2 className="app-title">Internship Management System</h2>
            <h4>
              {`Welcome, ${auth.currentUser().firstName} ${
                auth.currentUser().lastName
              }`}
            </h4>
            <Badge.Ribbon text={tableData.source.toUpperCase()}>
              <Card>
                <Table
                  rowKey="{record => record.id}"
                  loading={isLoading}
                  dataSource={tableData.data}
                  columns={columns}
                  pagination={{
                    pageSize: 5,
                  }}
                />
                <Upload {...uploadOptions}>
                  <Button>
                    <UploadOutlined /> Upload Report
                  </Button>
                </Upload>
              </Card>
            </Badge.Ribbon>
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        SETU© 2018 Created by Nuwan94
      </Footer>
    </Layout>
  );
};
class App extends Component {
  displayUserInformation() {
    if (auth.isLoggedIn()) {
      return <AppContent> </AppContent>;
    }
  }

  render() {
    return this.displayUserInformation();
  }
}

export default App;
