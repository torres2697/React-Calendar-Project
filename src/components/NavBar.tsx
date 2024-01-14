import { Menu, MenuProps, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const NavBar = () => {
  const { logout } = useActions();
  const router = useNavigate();
  const { isAuth, user } = useTypedSelector((state) => state.auth);
  const privateItems: MenuProps["items"] = [
    {
      label: user.username,
      key: "1",
    },
    {
      label: "Log out",
      key: "2",
      onClick: logout,
    },
  ];
  const publicItems: MenuProps["items"] = [
    {
      label: "Login",
      key: "1",
      onClick: () => router(RouteNames.LOGIN),
    },
  ];
  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        items={isAuth ? privateItems : publicItems}
        style={{ display: "block", textAlign: "right" }}
      />
    </Header>
  );
};

export default NavBar;
