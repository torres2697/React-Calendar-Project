import "antd/dist/reset.css";
import Layout, { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";

function App() {
  const { setAuth, setUser } = useActions();
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(true);
      setUser({ username: localStorage.getItem("username" || "") } as IUser);
    }
  }, []);
  return (
    <Layout>
      <NavBar />
      <Content>
        <AppRouter />
      </Content>
    </Layout>
  );
}

export default App;
