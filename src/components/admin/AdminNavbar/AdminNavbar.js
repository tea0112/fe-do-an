import * as $ from "jquery"
import adminUser from "../../../helpers/static/imgs/user-admin.svg"

function AdminNavbar() {
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

          <div className="topbar-divider d-none d-sm-block" />

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
              <span className="mr-2 d-none d-lg-inline text-gray-600 small" />
              <img
                className="img-profile rounded-circle"
                style={{ height: "4rem", width: "4rem" }}
                src={adminUser}
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

export default AdminNavbar
