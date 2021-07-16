import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import * as $ from "jquery"
import male from "../../helpers/static/imgs/male.png"
import female from "../../helpers/static/imgs/female.png"
import useAuthRequest from "../../helpers/useAuthRequest"

function StudentNavbar() {
  const { student } = useSelector((state) => state.authentication.account)

  const [currentClasses, setCurrentClasses] = useState(null)

  const authRequest = useAuthRequest()

  const fetchCurrentClass = (studentId) =>
    authRequest.get(`/api/studentClass?studentId=${studentId}`)

  useEffect(async () => {
    try {
      const fetchedCurrentClass = await fetchCurrentClass(student.id)
      setCurrentClasses(fetchedCurrentClass.data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }, [])

  const onSidebarTopClick = () => {
    const bodyTag = document.querySelector("body")
    const sidebarClass = document.querySelector(".sidebar")

    bodyTag.classList.toggle("sidebar-toggled")
    sidebarClass.classList.toggle("toggled")

    if (sidebarClass.classList.contains("toggled")) {
      document.querySelector(".sidebar.collapse")
    }
    $(".sidebar .collapse").collapse("hide")
  }

  return (
    <>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/* Sidebar Toggle (Topbar) */}
        <button
          type="button"
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
          onClick={onSidebarTopClick}
        >
          <i className="fa fa-bars" />
        </button>

        {/* Topbar Navbar */}
        <ul className="navbar-nav ml-auto">
          {/* Nav Item - Search Dropdown (Visible Only XS) */}
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-search fa-fw" />
            </a>
            {/* Dropdown - Messages */}
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>

          {/* Nav Item - User Information */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 large">
                {student && (
                  <>
                    <b>Mã Sinh Viên:</b> {student.user.username}
                    &nbsp;-&nbsp;<b>Tên:</b>&nbsp;
                    {student.firstName}
                    &nbsp;
                    {student.lastName}
                    &nbsp;-&nbsp; <b>Khóa:</b>&nbsp;{student.session.name}
                    &nbsp;-&nbsp;<b>Lớp: </b>
                    {currentClasses &&
                      currentClasses.reduce(
                        (acc, crv, idx) =>
                          idx === 0
                            ? crv.classId.name
                            : `${acc}, ${crv.classId.name}`,
                        ""
                      )}
                  </>
                )}
              </span>

              <div className="topbar-divider d-none d-sm-block" />

              <img
                className="img-profile rounded-circle"
                style={{ height: "4rem", width: "4rem" }}
                src={student && student.gender ? female : male}
                alt="avatar"
              />
            </a>
            {/* Dropdown - User Information */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Đăng Xuất
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default StudentNavbar
