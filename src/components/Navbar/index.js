import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "./../../reducers/users";
import { IoLogOutOutline } from "react-icons/io5";
import { MdSpaceDashboard } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import "./style.css";

const Navbar = ({ page }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      role: state.Users.role,
    };
  });

  const logout = () => {
    dispatch(userLogout({ role: "", token: "" }));
    navigate("/login");
  };

  return state.role ? (
    <div className="navbar">
      {page !== "Todos" && (
        <AiFillHome className="homeLogo" onClick={() => navigate("/")} />
      )}
      {page === "Todos" && state.role === "admin" && (
        <MdSpaceDashboard
          className="dashboardLogo"
          onClick={() => navigate("/dashboard")}
        />
      )}
      <IoLogOutOutline className="logoutLogo" onClick={logout} />
    </div>
  ) : (
    ""
  );
};

export default Navbar;
