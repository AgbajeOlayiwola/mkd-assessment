import React, { useContext } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../../authContext"
import UserSvg from "../SVGs/userSvg"
import "./styles.css"
const NavBar = () => {
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: { message: "Loged Out" },
    })
    navigate("/admin/login")
  }
  return (
    <div className="nav">
      <h1>APP</h1>
      <div className="logout" onClick={handleLogout}>
        <UserSvg />
        <p>Logout</p>
      </div>
    </div>
  )
}

export default NavBar
