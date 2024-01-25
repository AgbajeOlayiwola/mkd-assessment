import React from "react"
import { Route, Routes } from "react-router-dom"
import { AuthContext } from "./authContext"
import SnackBar from "./components/SnackBar"
import AdminDashboardPage from "./pages/AdminDashboardPage"
import AdminLoginPage from "./pages/AdminLoginPage"
import NotFoundPage from "./pages/NotFoundPage"

function renderRoutes(role) {
  switch (role) {
    case "admin":
      return (
        <Routes>
          <Route
            exact
            path="/admin/dashboard"
            element={<AdminDashboardPage />}
          ></Route>
        </Routes>
      )
    default:
      return (
        <Routes>
          <Route exact path="/admin/login" element={<AdminLoginPage />}></Route>
          <Route path="*" exact element={<NotFoundPage />}></Route>
        </Routes>
      )
  }
}

function Main() {
  const { state } = React.useContext(AuthContext)
  console.log(state)
  return (
    <div className="h-full">
      <div className="flex w-full">
        <div className="w-full">
          <div className="page-wrapper w-full">
            {!state.isAuthenticated
              ? renderRoutes("none")
              : renderRoutes(state?.role)}
          </div>
        </div>
      </div>
      <SnackBar />
    </div>
  )
}

export default Main
