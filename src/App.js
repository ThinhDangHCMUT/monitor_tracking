import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { Profile } from "./pages/profile/profile";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./App.scss";
// import Sidebar from "./components/sidebar/Sidebar";
// import "./style/dark.scss";
// import { useContext } from "react";
// import { DarkModeContext } from "./context/darkModeContext";

import { selectUser } from "./storage/figures/user";
import { useSelector } from "react-redux";
import Logout from "./pages/logout/logout";
import Devices from "./pages/devices/devices";

export default function App() {
  const user = useSelector(selectUser);
  console.log("user: ", user);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route
                path="register"
                element={
                  user == undefined || user.login !== 1 ? (
                    <New inputs={userInputs} title="Add New User" />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="/nav2" element={<Home />} />
            <Route path="/device/*">
              <Route path="air-conditioner/*" element={<Devices type="AC" />} />
              <Route path="humidifier/*" element={<Devices type="HM" />} />
            </Route>
            <Route
              path="/logout"
              element={
                <Logout />
                //  : <Navigate to="/" />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
